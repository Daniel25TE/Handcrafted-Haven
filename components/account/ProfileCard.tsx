import Link from 'next/link'
import Image from 'next/image'
import { User } from '@/types/user'
import { ROUTES } from '@/constants/routes'
import styles from './ProfileCard.module.css'

export default function ProfileCard({ user }: { user: User }) {
  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.title}>My Account</h1>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.avatar}>
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.name}
                  width={96}
                  height={96}
                  className={styles.avatarImg}
                />
              ) : (
                <div className={styles.avatarFallback}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className={styles.info}>
              <h2 className={styles.name}>{user.name}</h2>
              <p className={styles.email}>{user.email}</p>
              <span className={`${styles.badge} ${styles[user.role]}`}>
                {user.role === 'artisan' ? 'Artisan' : 'Buyer'}
              </span>
            </div>

            <div className={styles.actions}>
              <Link href={ROUTES.ACCOUNT_EDIT} className="btn btn-primary">
                Edit Profile
              </Link>

              {user.role === 'artisan' && (
                <Link href={ROUTES.ARTISAN_PROFILE(user.id)} className="btn btn-secondary">
                  View My Storefront
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}