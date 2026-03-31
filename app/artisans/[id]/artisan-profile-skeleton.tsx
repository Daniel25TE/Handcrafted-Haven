export default function ArtisanProfileSkeleton() {
  return (
    <div className="artisan-profile-card artisan-profile-skeleton-card">
      <div className="artisan-profile-details">
        <div className="artisan-profile-skeleton-label artisan-profile-skeleton-line" />
        <div className="artisan-profile-skeleton-name artisan-profile-skeleton-line" />
        <div className="artisan-profile-skeleton-shop artisan-profile-skeleton-line" />

        <div className="artisan-profile-section">
          <div className="artisan-profile-skeleton-heading artisan-profile-skeleton-line" />
          <div className="artisan-profile-skeleton-line" />
          <div className="artisan-profile-skeleton-line" />
          <div className="artisan-profile-skeleton-line artisan-profile-skeleton-short" />
        </div>

        <div className="artisan-profile-section">
          <div className="artisan-profile-skeleton-heading artisan-profile-skeleton-line" />
          <div className="artisan-profile-skeleton-line artisan-profile-skeleton-medium" />
        </div>
      </div>

      <div className="artisan-profile-image-wrap">
        <div className="artisan-profile-image artisan-profile-skeleton-block" />
      </div>
    </div>
  );
}