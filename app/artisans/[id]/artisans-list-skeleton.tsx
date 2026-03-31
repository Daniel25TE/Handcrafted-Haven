export default function ArtisansListSkeleton() {
  return (
    <section className="artisans-section section">
      <div className="container artisans-container">
        <div className="artisans-list">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="artisan-list-card artisan-list-skeleton-card">
              <div className="artisan-list-image-wrap artisan-skeleton-block" />
              <div className="artisan-list-details">
                <div className="artisan-skeleton-line artisan-skeleton-title" />
                <div className="artisan-skeleton-line artisan-skeleton-subtitle" />
                <div className="artisan-skeleton-line" />
                <div className="artisan-skeleton-line" />
                <div className="artisan-skeleton-line artisan-skeleton-short" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}