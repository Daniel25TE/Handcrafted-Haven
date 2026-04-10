'use client';

import { useState, useRef } from 'react';
import { createReview } from '@/lib/actions/reviews';
import { useNavbarAuth } from '@/lib/navbar/use-navbar-auth';

type Props = {
  productId: string;
};

export default function ReviewForm({ productId }: Props) {
  const { profile, loadingUser } = useNavbarAuth();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Do not render anything until auth is fully loaded
  if (loadingUser) {
    return null;
  }

  // Hide for admin
  if (profile?.role === 'admin') {
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!rating) {
      setError('Pick a rating first.');
      return;
    }

    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set('rating', String(rating));

    try {
      await createReview(productId, formData);
      formRef.current?.reset();
      setRating(0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold text-[#3D4127]">Leave a Review</h3>

      <div className="flex items-center gap-1 pb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-2xl leading-none cursor-pointer transition-transform hover:scale-110"
          >
            <span className={(hovered || rating) >= star ? 'text-[#C76B4F]' : 'text-[#E5DEC9]'}>
              ★
            </span>
          </button>
        ))}
      </div>

      <textarea
        name="content"
        required
        minLength={10}
        maxLength={1000}
        placeholder="Write your review..."
        rows={4}
        className="w-full border border-[#E5DEC9] rounded-xl px-4 py-3 text-sm text-[#3D4127] bg-white placeholder-[#6A4E42]/40 resize-none focus:outline-none focus:ring-2 focus:ring-[#C76B4F]/30"
      />

      {error && <p className="text-sm text-[#C76B4F]">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary product-button disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
