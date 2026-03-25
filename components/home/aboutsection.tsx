"use client";

import { useEffect, useRef, useState } from "react";
import "./aboutsection.css";

export default function AboutSection() {
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
    <section ref={sectionRef} className="section">
      <div className="about-container container">
        <div className={`about-content ${showContent ? "show" : ""}`}>
          <p className="section-tag">About Handcrafted Haven</p>
          <h2>Supporting Creativity, Craftsmanship, and Community</h2>
          <p className="about-text">
            Handcrafted Haven is a space where artisans can proudly share their
            work and where shoppers can discover meaningful handmade pieces.
            Our goal is to celebrate creativity while building connections
            between makers and customers who value originality and care.
          </p>
        </div>

        <div className={`about-highlight ${showContent ? "show" : ""}`}>
          <div className="highlight-box card">
            <h3>Why It Matters</h3>
            <p>
              Every handcrafted item tells a story, supports an artisan, and
              brings a personal touch that mass-produced goods cannot replace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}