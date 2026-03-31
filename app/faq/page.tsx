'use client';

import { useState } from 'react';
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import './faq.css';

const faqs = [
  {
    question: "How do I create an account?",    
    answer: "Click on the 'Sign Up' button in the top right corner and fill out the registration form."
  },
  { 
    question: "How do I reset my password?",
    answer: "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach out to our customer support team via the 'Contact' page. we will be more than happy to assist you with any questions or issues you may have."
  },
    {
    question: "What is an artisan?",
    answer:
      "An artisan is a user who can sell handmade products on the platform. They dedicate their time and skills to create unique items for buyers to purchase.  If you have a passion for crafting and want to share your creations with others, consider signing up as an artisan and start selling your products today!   ",
  },
  {
    question: "How do I buy products?",
    answer:
      "Browse the marketplace, choose a product, and complete checkout.",
  },
];

export default function FAQPage() {
    const[openIndex, setOpenIndex] = useState<number | null>(null);

      return (
    <div className="faq-container section">
      <h1 className="faq-title">Frequently Asked Questions</h1>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${
              openIndex === index ? "open" : ""
            }`}
          >
            <button
              className="faq-question"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              {faq.question}
              <span className="faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
