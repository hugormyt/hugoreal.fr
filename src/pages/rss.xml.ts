import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes } from '../lib/notes';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const notes = await getNotes();
  return rss({
    title: `${site.name} — notes`,
    description: site.description,
    site: context.site!,
    items: notes.map((n) => ({
      title: n.data.title,
      description: n.data.description,
      pubDate: n.data.date,
      link: `/notes/${n.id}/`,
    })),
  });
}
