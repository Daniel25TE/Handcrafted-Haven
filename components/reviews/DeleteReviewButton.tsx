'use client';

import { useState } from 'react';
import { deleteReview } from '@/lib/actions/reviews';

type Props = {
  reviewId: string;
  productId: string;
};

export default function DeleteReviewButton({ reviewId, productId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteReview(reviewId, productId);
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-[#C76B4F] hover:underline disabled:opacity-50 cursor-pointer"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}