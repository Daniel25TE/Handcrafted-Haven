'use client';

import { useState } from 'react';
import styles from './signup-form.module.css';

export default function SignupForm() {
  const [role, setRole] = useState<'buyer' | 'artisan' | null>(null);

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
              className={`btn ${role === 'buyer' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setRole('buyer')}
            >
              Shop as Buyer
            </button>

            <button
              className={`btn ${role === 'artisan' ? 'btn-secondary' : 'btn-light'}`}
              onClick={() => setRole('artisan')}
            >
              Sell as Artisan
            </button>
          </div>

          <form className={styles['signup-form']}>
            <input className={styles['signup-input']} placeholder="Full Name" />
            <input className={styles['signup-input']} placeholder="Email" />
            <input className={styles['signup-input']} type="password" placeholder="Password" />

            {role === 'artisan' && (
              <input className={styles['signup-input']} placeholder="Shop Name" />
            )}

            <button className="btn btn-primary" disabled={!role}>
              Create Account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}