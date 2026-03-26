'use client';

import { useState, type SubmitEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/db/supabase';
import { ROUTES } from '@/constants/routes';
import styles from './login-form.module.css';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(ROUTES.ACCOUNT);
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

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