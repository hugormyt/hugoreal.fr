import { getCollection } from 'astro:content';

// Notes publiées, de la plus récente à la plus ancienne.
// Les brouillons (draft: true) n'apparaissent qu'en local.
export async function getNotes() {
  const notes = await getCollection('notes', ({ data }) => import.meta.env.DEV || !data.draft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
