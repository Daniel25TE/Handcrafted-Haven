import { Suspense } from 'react';
import Search from '@/components/ui/search';
import ArtisansList from './artisans-list';
import ArtisansListSkeleton from './artisans-list-skeleton';
import './artisans.css';

export default async function ArtisansPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query?.trim() || '';

  return (
    <main className="artisans-page">
      <section className="artisans-hero section">
        <div className="container artisans-hero-content">
          <p className="section-tag">Meet the Makers</p>
          <h1>Artisans</h1>
          <p className="artisans-intro">
            Get to know the creators behind our handcrafted collection. Each artisan
            brings their own story, style, and passion to every piece they make.
          </p>
        </div>
      </section>

      <section className="artisans-search-section">
        <div className="container artisans-search-container">
          <Search placeholder="Search artisans, shops, or locations..." />
        </div>
      </section>

      <Suspense key={query} fallback={<ArtisansListSkeleton />}>
        <ArtisansList query={query} />
      </Suspense>
    </main>
  );
}