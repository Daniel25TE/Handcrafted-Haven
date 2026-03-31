import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type Artisan = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  address: string | null;
  description: string | null;
  avatar_url: string | null;
  role: 'buyer' | 'artisan';
  shop_name: string | null;
  created_at: string;
  updated_at: string;
};

function truncateText(text: string, maxLength = 140) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

export default async function ArtisansList({ query }: { query: string }) {
  const supabase = createSupabaseServerClient();

  let artisanQuery = supabase
    .from('profiles')
    .select('*')
    .eq('role', 'artisan')
    .order('created_at', { ascending: false });

  if (query) {
    artisanQuery = artisanQuery.or(
      [
        `first_name.ilike.%${query}%`,
        `last_name.ilike.%${query}%`,
        `username.ilike.%${query}%`,
        `shop_name.ilike.%${query}%`,
        `address.ilike.%${query}%`,
      ].join(',')
    );
  }

  const { data: artisans, error } = await artisanQuery;

  if (error) {
    console.dir(error, { depth: null });

    return (
      <section className="artisans-section section">
        <div className="container artisans-empty-state">
          <h2>We couldn’t load the artisan list right now.</h2>
          <p>Please refresh the page or try again in a few moments.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="artisans-section section">
      <div className="container artisans-container">
        {!artisans || artisans.length === 0 ? (
          <p>{query ? `No artisans found for "${query}".` : 'No artisans found.'}</p>
        ) : (
          <div className="artisans-list">
            {artisans.map((artisan: Artisan) => {
              const fullName =
                [artisan.first_name, artisan.last_name].filter(Boolean).join(' ') ||
                artisan.username ||
                'Unnamed Artisan';

              return (
                <Link
                  key={artisan.id}
                  href={`/artisans/${artisan.id}`}
                  className="artisan-list-card"
                >
                  <div className="artisan-list-image-wrap">
                    {artisan.avatar_url ? (
                      <img
                        src={artisan.avatar_url}
                        alt={fullName}
                        className="artisan-list-image"
                      />
                    ) : (
                      <div className="artisan-list-no-image">No image</div>
                    )}
                  </div>

                  <div className="artisan-list-details">
                    <h2 className="artisan-list-name">{fullName}</h2>

                    {artisan.shop_name && (
                      <p className="artisan-list-shop">{artisan.shop_name}</p>
                    )}

                    {artisan.description && (
                      <p className="artisan-list-description">
                        {truncateText(artisan.description, 150)}
                      </p>
                    )}

                    {artisan.address && (
                      <p className="artisan-list-address">{artisan.address}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}