'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/db/supabase';
import type { AvatarOption } from '@/types/avatar';
import styles from './signup-form.module.css';

export default function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState<'buyer' | 'artisan' | null>(null);
  const [avatars, setAvatars] = useState<AvatarOption[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvatars = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('avatar_options').select('*');
      if (data) setAvatars(data);
    };
    fetchAvatars();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const first_name = (form.elements.namedItem('first_name') as HTMLInputElement).value;
    const last_name = (form.elements.namedItem('last_name') as HTMLInputElement).value;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const address = (form.elements.namedItem('address') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    const shop_name = role === 'artisan'
      ? (form.elements.namedItem('shop_name') as HTMLInputElement).value
      : null;

    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          username,
          address,
          description,
          avatar_url: selectedAvatar,
          role,
          shop_name,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push('/account');
  };

  return (
    <section className="section">
      <div className={`container ${styles['signup-wrapper']}`}>
        <div className={`card ${styles['signup-card']}`}>
          <h1>Create Account</h1>

          <p className={styles['signup-description']}>
            Choose how you want to experience Handcrafted Haven.
          </p>

          <div className={styles['signup-roles']}>
            <button
              type="button"
              className={`btn ${role === 'buyer' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setRole('buyer')}
            >
              Shop as Buyer
            </button>

            <button
              type="button"
              className={`btn ${role === 'artisan' ? 'btn-secondary' : 'btn-light'}`}
              onClick={() => setRole('artisan')}
            >
              Sell as Artisan
            </button>
          </div>

          <form className={styles['signup-form']} onSubmit={handleSubmit}>
            <input className={styles['signup-input']} name="first_name" placeholder="First Name" required />
            <input className={styles['signup-input']} name="last_name" placeholder="Last Name" required />
            <input className={styles['signup-input']} name="username" placeholder="Username" required />
            <input className={styles['signup-input']} name="email" type="email" placeholder="Email" required />
            <input className={styles['signup-input']} name="password" type="password" placeholder="Password" required />
            <input className={styles['signup-input']} name="address" placeholder="Address" />
            <textarea
              className={styles['signup-input']}
              name="description"
              placeholder="Short bio (optional)"
              rows={3}
            />

            {avatars.length > 0 && (
              <div className={styles['avatar-picker']}>
                <p>Choose an avatar</p>
                <div className={styles['avatar-grid']}>
                  {avatars.map((avatar) => (
                    <img
                      key={avatar.id}
                      src={avatar.url}
                      alt={avatar.label ?? 'Avatar'}
                      className={`${styles['avatar-option']} ${selectedAvatar === avatar.url ? styles['avatar-selected'] : ''}`}
                      onClick={() => setSelectedAvatar(avatar.url)}
                    />
                  ))}
                </div>
              </div>
            )}

            {role === 'artisan' && (
              <input className={styles['signup-input']} name="shop_name" placeholder="Shop Name" required />
            )}

            {error && <p className={styles['signup-error']}>{error}</p>}

            <button className="btn btn-primary" type="submit" disabled={!role || loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}