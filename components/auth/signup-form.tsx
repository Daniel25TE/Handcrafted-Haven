'use client';

import { useState } from 'react';
import './signup-form.css';

export default function SignupForm() {
  const [role, setRole] = useState<'buyer' | 'artisan' | null>(null);

  return (
    <section className="section">
      <div className="container signup-wrapper">
        
        <div className="card signup-card">
          <h1>Create Account</h1>

          <p className="signup-description">
            Choose how you want to experience Handcrafted Haven.
          </p>

 
          <div className="signup-roles">
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

          {/* FORM */}
          <form className="signup-form">
            <input className="signup-input" placeholder="Full Name" />
            <input className="signup-input" placeholder="Email" />
            <input className="signup-input" type="password" placeholder="Password" />

            {role === 'artisan' && (
              <input className="signup-input" placeholder="Shop Name" />
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