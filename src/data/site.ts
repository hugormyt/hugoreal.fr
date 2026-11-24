// Toutes les infos perso au même endroit : c'est ici qu'on édite le contenu.

export const site = {
  name: 'Hugo Real',
  url: 'https://hugoreal.fr',
  title: 'Hugo Real — entrepreneur & creative data hacker',
  description:
    'Hugo Real — French tech entrepreneur, co-founder of MyTracks. Operational research, data and creative problem-solving.',
  // TODO : rapatrier la photo dans public/ (elle est encore hébergée chez v0/Vercel)
  photo:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pdp_hugo_linkedin-I7NT9BMyi8CRJGyADLGyXPI6optCUV.jpeg',
  links: {
    linkedin: 'https://linkedin.com/in/hugo-real-053090225',
    mytracks: 'https://mytracks.fr',
  },
};

// Fiche « coordonnées » affichée sous le hero
export const facts: { label: string; value: string }[] = [
  { label: 'Born', value: 'Toulouse, 1998' },
  { label: 'Trained in', value: 'Operational Research & Decision Support' },
  { label: 'Building', value: 'MyTracks — co-founder' },
  { label: 'Mindset', value: 'Creative data hacker' },
];

export const fields: { title: string; text: string }[] = [
  {
    title: 'Entrepreneurship',
    text: 'Turning ideas into companies — MyTracks is the current one.',
  },
  {
    title: 'Creative problem-solving',
    text: 'A hacker mindset: find the unconventional path when the obvious one is blocked.',
  },
  {
    title: 'Data-driven decisions',
    text: 'Raw data in, decisions out. That is what operational research is for.',
  },
  {
    title: 'Artificial intelligence',
    text: 'Using machine learning where it actually simplifies a complex decision.',
  },
  {
    title: 'SEO & growth',
    text: 'Getting found: traffic, visibility and distribution for tech products.',
  },
  {
    title: 'Team building',
    text: 'Attracting and keeping people who are better than you at their thing.',
  },
];
