import { getReviewsByProduct } from "@/lib/data/reviews";

export default async function ProductReviews({
  productId,
}: {
  productId: string;
}) {
  const reviews = await getReviewsByProduct(productId);

  return (
    <section className="section">
      <div className="container">
        <h3>Customer Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="card" style={{ marginBottom: "1rem" }}>
              <p>{review.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}