"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContactMessage } from "@/lib/actions/messages";
import { initialContactMessageActionState } from "@/lib/data/messages";

type ContactFormProps = {
  profileId: string | null;
  initialFullName: string;
  initialEmail: string;
};

export default function ContactForm({
  profileId,
  initialFullName,
  initialEmail,
}: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialContactMessageActionState
  );

  const formRef = useRef<HTMLFormElement>(null);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");

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

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();

      const fullNameInput = formRef.current?.elements.namedItem(
        "fullName"
      ) as HTMLInputElement | null;
      const emailInput = formRef.current?.elements.namedItem(
        "email"
      ) as HTMLInputElement | null;

      if (fullNameInput) {
        fullNameInput.value = profileId ? initialFullName : "";
      }

      if (emailInput) {
        emailInput.value = profileId ? initialEmail : "";
      }

      setCaptchaError("");
      generateCaptcha();
    }
  }, [state.success, profileId, initialFullName, initialEmail]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const expected = num1 + num2;

    if (Number(captchaAnswer) !== expected) {
      e.preventDefault();
      setCaptchaError("Incorrect captcha answer. Please try again.");
      generateCaptcha();
      return;
    }

    setCaptchaError("");
  };

  return (
    <form
      ref={formRef}
      className="contact-form"
      action={formAction}
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="profileId" value={profileId ?? ""} />

      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Your full name"
          defaultValue={initialFullName}
          required
        />
        {state.fieldErrors?.fullName ? (
          <p className="form-error">{state.fieldErrors.fullName}</p>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          defaultValue={initialEmail}
          required
        />
        {state.fieldErrors?.email ? (
          <p className="form-error">{state.fieldErrors.email}</p>
        ) : null}
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
        {state.fieldErrors?.subject ? (
          <p className="form-error">{state.fieldErrors.subject}</p>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Write your message here..."
          required
        />
        {state.fieldErrors?.message ? (
          <p className="form-error">{state.fieldErrors.message}</p>
        ) : null}
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

      {captchaError ? <p className="form-error">{captchaError}</p> : null}

      {state.message ? (
        <p className={state.success ? "form-success" : "form-error"}>
          {state.message}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}