import './messages.css'

export default function AdminMessagesLoading() {
  return (
    <section className="admin-messages-page">
      <div className="admin-messages-container">
        <div className="admin-messages-header">
          <div className="admin-skeleton admin-skeleton-heading" />
          <div className="admin-skeleton admin-skeleton-subheading" />
        </div>

        <div className="admin-message-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <article
              key={index}
              className="admin-message-card admin-message-skeleton-card"
            >
              <div className="admin-message-top">
                <div className="admin-skeleton admin-skeleton-subject" />
                <div className="admin-skeleton admin-skeleton-date" />
              </div>

              <div className="admin-skeleton admin-skeleton-sender" />

              <div className="admin-message-preview">
                <div className="admin-skeleton admin-skeleton-line" />
                <div className="admin-skeleton admin-skeleton-line" />
                <div className="admin-skeleton admin-skeleton-line short" />
              </div>

              <div className="admin-message-actions">
                <div className="admin-skeleton admin-skeleton-button" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}