import { getReviewsByProduct } from '@/lib/data/reviews';
import { getCurrentUser } from '@/lib/data/users';
import ReviewForm from './ReviewForm';
import DeleteReviewButton from './DeleteReviewButton';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  productId: string;
};

function StarDisplay({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'text-[#C76B4F]' : 'text-[#E5DEC9]'}>
          ★
        </span>
      ))}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function ReviewSection({ productId }: Props) {
  const [reviews, currentUser] = await Promise.all([
    getReviewsByProduct(productId),
    getCurrentUser(),
  ]);

  return (
    <section className="mt-16 max-w-3xl mx-auto">
      <div className="border-t border-[#E5DEC9] pt-10">
        <h2 className="text-2xl font-bold text-[#3D4127] font-[var(--font-dancing-script)] mb-6">
          Customer Reviews{' '}
          <span className="text-base font-normal text-[#6A4E42]/60">({reviews.length})</span>
        </h2>

        {reviews.length === 0 ? (
          <p className="text-[#6A4E42]/60 text-sm mb-8">
            No reviews yet.
          </p>
        ) : (
          <ul className="space-y-5 mb-8">
            {reviews.map((review) => {
              const profile = review.profiles;
              const displayName =
                profile?.username ||
                (profile?.first_name
                  ? `${profile.first_name}${profile.last_name ? ' ' + profile.last_name : ''}`
                  : 'Anonymous');
              const initials = displayName.slice(0, 2).toUpperCase();
              const isOwner = currentUser?.id === review.user_id;

              return (
                <li
                  key={review.id}
                  className="bg-white border border-[#E5DEC9] rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {profile?.avatar_url ? (
                        <Image
                          src={profile.avatar_url}
                          alt={displayName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover w-10 h-10"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#3D4127]/10 flex items-center justify-center text-sm font-semibold text-[#3D4127]">
                          {initials}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#3D4127] text-sm">{displayName}</span>
                          {review.rating && <StarDisplay rating={review.rating} />}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#6A4E42]/50">{formatDate(review.created_at)}</span>
                          {isOwner && (
                            <DeleteReviewButton reviewId={review.id} productId={productId} />
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-[#4b4038] leading-relaxed">{review.content}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {currentUser ? (
          <ReviewForm productId={productId} />
        ) : (
          <div className="bg-[#FFFAF5] border border-[#E5DEC9] rounded-2xl p-5 text-center">
            <p className="text-sm text-[#6A4E42]">
              <Link href="/login" className="text-[#C76B4F] font-medium hover:underline">
                Log in
              </Link>{' '}
              to leave a review.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}