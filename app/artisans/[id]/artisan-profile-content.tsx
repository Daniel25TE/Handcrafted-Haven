import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { ROUTES } from '@/constants/routes';

type Props = {
  id: string;
};

export default async function ArtisanProfileContent({ id }: Props) {
  const supabase = await createServerSupabaseClient();

  const { data: artisan, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .eq('role', 'artisan')
    .single();

  if (error || !artisan) {
    notFound();
  }

  const { data: { user: currentUser } } = await supabase.auth.getUser();
  const isOwner = currentUser?.id === artisan.id;

  const fullName =
    [artisan.first_name, artisan.last_name].filter(Boolean).join(' ') ||
    artisan.username ||
    'Unnamed Artisan';

  return (
    <div className="artisan-profile-card">
      <div className="artisan-profile-details">
        <p className="artisan-profile-label">Artisan Profile</p>

        <h1 className="artisan-profile-name">{fullName}</h1>

        {artisan.shop_name && (
          <p className="artisan-profile-shop">{artisan.shop_name}</p>
        )}

        {artisan.description && (
          <div className="artisan-profile-section">
            <h2>About</h2>
            <p>{artisan.description}</p>
          </div>
        )}

        {artisan.address && (
          <div className="artisan-profile-section">
            <h2>Location</h2>
            <p>{artisan.address}</p>
          </div>
        )}

        {isOwner && (
          <div className="artisan-profile-section">
            <Link href={ROUTES.ARTISAN_MANAGE(id)} className="btn btn-primary">
              Edit My Frontstore
            </Link>
          </div>
        )}
      </div>

      <div className="artisan-profile-image-wrap">
        {artisan.avatar_url ? (
          <img
            src={artisan.avatar_url}
            alt={fullName}
            className="artisan-profile-image"
          />
        ) : (
          <div className="artisan-profile-no-image">No image</div>
        )}
      </div>
    </div>
  );
}