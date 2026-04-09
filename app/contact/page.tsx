import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/db/supabase-server";
import ContactForm from "@/components/contact/contactform";
import "./contact.css";

export const metadata: Metadata = {
  title: "Handcrafted Haven | Contact",
  description:
    "Get in touch with Handcrafted Haven for questions, artisan inquiries, and support.",
};

export default async function ContactPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profileId: string | null = null;
  let initialFullName = "";
  let initialEmail = user?.email ?? "";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email")
      .eq("id", user.id)
      .single();

    if (profile) {
      profileId = profile.id;
      initialFullName = [profile.first_name, profile.last_name]
        .filter(Boolean)
        .join(" ")
        .trim();

      initialEmail = profile.email || user.email || "";
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-hero section">
        <div className="container contact-hero-content">
          <p className="section-tag">Get in Touch</p>
          <h1>Contact Us</h1>
          <p className="contact-intro">
            We would love to hear from you. Whether you have questions about
            our handmade products, artisan partnerships, or your order, feel
            free to reach out.
          </p>
        </div>
      </section>

      <section className="contact-section section">
        <div className="container contact-grid">
          <div className="contact-card card">
            <h2>Send a Message</h2>
            <ContactForm
              profileId={profileId}
              initialFullName={initialFullName}
              initialEmail={initialEmail}
            />
          </div>

          <aside className="contact-info card">
            <h2>Contact Information</h2>
            <p>
              Reach out to us for support, collaboration, or general inquiries.
            </p>

            <div className="contact-details">
              <div>
                <h3>Email</h3>
                <p>admin@handcraftedhaven.com</p>
              </div>

              <div>
                <h3>Phone</h3>
                <p>+63 900 123 4567</p>
              </div>

              <div>
                <h3>Location</h3>
                <p>2487 Willow Creek Lane, Salt Lake City, UT 84108</p>
              </div>

              <div>
                <h3>Hours</h3>
                <p>Monday - Friday, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}