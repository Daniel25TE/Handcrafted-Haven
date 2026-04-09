import { notFound, redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { getMessageById } from '@/lib/data/messages.server'
import './message-detail.css'

type Props = {
  params: Promise<{ id: string }>
}

export default async function AdminMessageDetailPage({ params }: Props) {
  const { id } = await params

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

  const message = await getMessageById(id)

  if (!message) {
    notFound()
  }

  return (
    <section className="admin-message-detail-page">
      <div className="admin-message-detail-container">
        <div className="admin-message-detail-card">
          <h1>{message.subject}</h1>

          <p className="admin-message-detail-meta">
            <strong>From:</strong> {message.full_name} ({message.email})
          </p>

          <p className="admin-message-detail-meta">
            <strong>Received:</strong>{' '}
            {new Date(message.created_at).toLocaleString()}
          </p>

          <div className="admin-message-detail-body">
            <p>{message.message}</p>
          </div>
        </div>

        <div className="admin-message-reply-card">
          <h2>Send Response</h2>

          <form className="admin-reply-form">
            <div className="form-group">
              <label htmlFor="to">To</label>
              <input id="to" name="to" type="email" defaultValue={message.email} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                defaultValue={`Re: ${message.subject}`}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reply">Message</label>
              <textarea
                id="reply"
                name="reply"
                rows={8}
                placeholder="Write your response here..."
              />
            </div>

            <button type="submit" className="admin-reply-button">
              Send Reply
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}