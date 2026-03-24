type Props = { params: Promise<{ id: string }> };

rexport default async function ArtisanProfilePage({ params }: Props) {
  const { id } = await params;
  return <main></main>;
}
