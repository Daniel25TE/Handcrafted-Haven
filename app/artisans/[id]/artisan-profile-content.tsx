import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import ProductCard from '@/components/shop/ProductCard';

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

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', id)
    .order('created_at', { ascending: false });

  if (productsError) {
    console.dir(productsError, { depth: null });
  }

  const normalizedProducts = (products ?? []).map((item: any) => ({
    id: item.id,
    seller_id: item.seller_id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    images: item.image_url ? [item.image_url] : [],
    rating: item.rating ? item.rating / 10 : 0,
  }));

  const fullName =
    [artisan.first_name, artisan.last_name].filter(Boolean).join(' ') ||
    artisan.username ||
    'Unnamed Artisan';

  return (
    <div className="artisan-profile-card">
      <div className="artisan-profile-top">
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

      <div className="artisan-profile-products">
        <h2>Products</h2>

        {!normalizedProducts || normalizedProducts.length === 0 ? (
          <p>This artisan has not listed any products yet.</p>
        ) : (
          <div className="artisan-products-grid">
            {normalizedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}