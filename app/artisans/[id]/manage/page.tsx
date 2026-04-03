import { notFound, redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { getProductsBySeller } from '@/lib/data/products';
import { ROUTES } from '@/constants/routes';
import ManageFrontstore from '@/components/artisans/ManageFrontstore';
import './manage.css';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ManageFrontstorePage({ params }: Props) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  if (user.id !== id) {
    notFound();
  }

  const products = await getProductsBySeller(id);

  return (
    <main className="manage-page">
      <div className="manage-container">
        <ManageFrontstore artisanId={id} products={products} />
      </div>
    </main>
  );
}
