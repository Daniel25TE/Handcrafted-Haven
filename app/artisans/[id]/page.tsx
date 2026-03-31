import { Suspense } from 'react';
import ArtisanProfileContent from './artisan-profile-content';
import ArtisanProfileSkeleton from './artisan-profile-skeleton';
import './artisan-profile.css';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArtisanProfilePage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="artisan-profile-page">
      <div className="artisan-profile-container">
        <Suspense key={id} fallback={<ArtisanProfileSkeleton />}>
          <ArtisanProfileContent id={id} />
        </Suspense>
      </div>
    </main>
  );
}