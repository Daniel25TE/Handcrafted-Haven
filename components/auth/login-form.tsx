'use client';

import { useEffect, useState, type SubmitEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/db/supabase';
import { ROUTES } from '@/constants/routes';
import styles from './login-form.module.css';

export default function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function redirectByRole(userId: string) {
    const supabase = createClient();

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.error('Error loading profile role:', profileError);
      router.replace(ROUTES.ACCOUNT);
      return;
    }

    if (profile.role === 'admin') {
      router.replace('/admin');
      return;
    }

    router.replace(ROUTES.ACCOUNT);
  }

  useEffect(() => {
    async function checkExistingSession() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log('Login page user:', user);

      if (user) {
        await redirectByRole(user.id);
      }
    }

    checkExistingSession();
  }, [router]);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();

    let emailToUse = identifier.trim();

    const isEmail = emailToUse.includes('@');

    if (!isEmail) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .ilike('username', emailToUse)
        .single();

      if (profileError || !profile?.email) {
        setError('Invalid username or password.');
        setLoading(false);
        return;
      }

      emailToUse = profile.email;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password,
    });

    if (signInError || !data.user) {
      setError('Invalid email/username or password.');
      setLoading(false);
      return;
    }

    await redirectByRole(data.user.id);
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.wrapper}>
          <div className={`card ${styles.card}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="Email or username"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
              />

              <div className={styles.passwordWrapper}>
                <input
                  className={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className={styles.showButton}
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className={styles.footer}>
              Don&apos;t have an account?{' '}
              <a href={ROUTES.REGISTER}>Create one</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}