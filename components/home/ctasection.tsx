"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./ctasection.css";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContent(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="cta-section section">
      <div className={`cta-container container ${showContent ? "show" : ""}`}>
        <p className="cta-tag section-tag">Join the Community</p>
        <h2>Support Handmade. Share Creativity. Shop with Purpose.</h2>
        <p className="cta-text">
          Whether you are looking for one-of-a-kind handcrafted goods or want
          to showcase your own creations, Handcrafted Haven is the place to
          connect, discover, and grow.
        </p>

        <div className="cta-buttons">
          <Link href="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
          <Link href="/register" className="btn btn-light">
            Become a Seller
          </Link>
        </div>
      </div>
    </section>
  );
}