'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types/user'
import { ROUTES } from '@/constants/routes'
import { updateProfile } from '@/lib/actions/users'
import styles from './EditProfileForm.module.css'

export default function EditProfileForm({ user }: { user: User }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        await updateProfile(formData)
        setSuccess('Profile updated successfully.')
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      }
    })
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.title}>Edit Profile</h1>
        <div className={styles.wrapper}>
          <div className={`card ${styles.card}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="avatar_url" className={styles.label}>Avatar URL</label>
                <input
                  id="avatar_url"
                  name="avatar_url"
                  type="url"
                  defaultValue={user.avatar_url ?? ''}
                  placeholder="https://example.com/avatar.jpg"
                  className={styles.input}
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}
              {success && <p className={styles.success}>{success}</p>}

              <div className={styles.actions}>
                <button type="submit" className="btn btn-primary" disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => router.push(ROUTES.ACCOUNT)}
                  disabled={isPending}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
