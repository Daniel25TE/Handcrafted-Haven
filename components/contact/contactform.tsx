"use client";

import { useEffect, useState } from "react";

export default function ContactForm() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateCaptcha = () => {
    const first = Math.floor(Math.random() * 10) + 1;
    const second = Math.floor(Math.random() * 10) + 1;
    setNum1(first);
    setNum2(second);
    setCaptchaAnswer("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const expected = num1 + num2;

    if (Number(captchaAnswer) !== expected) {
      setError("Incorrect captcha answer. Please try again.");
      setSuccess("");
      generateCaptcha();
      return;
    }

    setError("");
    setSuccess("Message submitted successfully.");
    generateCaptcha();

    e.currentTarget.reset();
    setCaptchaAnswer("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="How can we help?"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Write your message here..."
          required
        ></textarea>
      </div>

      <div className="form-group captcha-group">
        <label htmlFor="captcha">
          Solve this: {num1} + {num2} = ?
        </label>
        <input
          type="number"
          id="captcha"
          name="captcha"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          placeholder="Enter your answer"
          required
        />
      </div>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
    </form>
  );
}