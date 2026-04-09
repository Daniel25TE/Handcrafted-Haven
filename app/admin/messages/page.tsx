import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { getAllMessages } from '@/lib/data/messages.server'
import './messages.css'

export default async function AdminMessagesPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    redirect('/login')
  }

  if (profile.role !== 'admin') {
    redirect('/account')
  }

  const messages = await getAllMessages()

  return (
    <section className="admin-messages-page">
      <div className="admin-messages-container">
        <div className="admin-messages-header">
          <h1>Messages</h1>
          <p>Review and respond to contact inquiries.</p>
        </div>

        {messages.length === 0 ? (
          <div className="admin-message-empty">
            <p>No messages yet.</p>
          </div>
        ) : (
          <div className="admin-message-list">
            {messages.map((message) => (
              <article key={message.id} className="admin-message-card">
                <div className="admin-message-top">
                  <Link
                    href={`/admin/messages/${message.id}`}
                    className="admin-message-subject"
                  >
                    {message.subject}
                  </Link>

                  <span className="admin-message-date">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>

                <p className="admin-message-sender">
                  <strong>{message.full_name}</strong>
                  <span> — {message.email}</span>
                </p>

                <p className="admin-message-preview">
                  {message.message.length > 140
                    ? `${message.message.slice(0, 140)}...`
                    : message.message}
                </p>

                <div className="admin-message-actions">
                  <Link
                    href={`/admin/messages/${message.id}`}
                    className="admin-message-link"
                  >
                    Open Message
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}