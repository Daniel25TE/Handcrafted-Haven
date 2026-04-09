import Link from 'next/link'
import Image from 'next/image'
import { User } from '@/types/user'
import { ROUTES } from '@/constants/routes'
import styles from './ProfileCard.module.css'

export default function ProfileCard({ user }: { user: User }) {
  const fullName =
    [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Account'

  const roleLabel =
    user.role === 'artisan'
      ? 'Artisan'
      : user.role === 'admin'
        ? 'Admin'
        : 'Buyer'

  const fallbackInitial =
    user.first_name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    '?'

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
                  alt={fullName}
                  width={96}
                  height={96}
                  className={styles.avatarImg}
                />
              ) : (
                <div className={styles.avatarFallback}>{fallbackInitial}</div>
              )}
            </div>

            <div className={styles.info}>
              <h2 className={styles.name}>{fullName}</h2>
              <p className={styles.email}>{user.email}</p>
              <span className={`${styles.badge} ${styles[user.role]}`}>
                {roleLabel}
              </span>
            </div>

            <div className={styles.actions}>
              <Link href={ROUTES.ACCOUNT_EDIT} className="btn btn-primary">
                Edit Profile
              </Link>

              {user.role === 'artisan' && (
                <>
                  <Link
                    href={ROUTES.ARTISAN_PROFILE(user.id)}
                    className="btn btn-secondary"
                  >
                    View My Storefront
                  </Link>

                  <Link
                    href={ROUTES.ARTISAN_MANAGE(user.id)}
                    className={`btn ${styles.storeEdit}`}
                  >
                    Edit Storefront
                  </Link>
                </>
              )}


            </div>
          </div>
        </div>
      </div>
    </section>
  )
}