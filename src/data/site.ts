// Toutes les infos perso au même endroit : c'est ici qu'on édite le contenu.

export const site = {
  name: 'Hugo Real',
  url: 'https://hugoreal.fr',
  title: 'Hugo Real — entrepreneur & creative data hacker',
  description:
    'Hugo Real — French tech entrepreneur, co-founder of MyTracks. Operational research, data and creative problem-solving.',
  photo: '/hugo-real.jpg', // fichier dans public/
  links: {
    linkedin: 'https://linkedin.com/in/hugo-real-053090225',
    mytracks: 'https://mytracks.fr',
  },
};

// Fiche « coordonnées » affichée sous le hero
export const facts: { label: string; value: string }[] = [
  { label: 'Born', value: 'Toulouse, 1998' },
  { label: 'Trained in', value: 'Operational Research & Decision Support' },
  { label: 'Building', value: 'MyTracks — The Valuation Company' },
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

// Section « H/R » : mêmes initiales, plusieurs lectures. Ajouter une entrée = une lecture de plus.
export const hr: { h: string; r: string; tag: string; text: string }[] = [
  {
    h: 'Hugo',
    r: 'Real',
    tag: 'The person',
    text: 'Born in Toulouse in 1998, trained in operational research, co-founder of MyTracks. Two letters, one job title: making hard decisions simple.',
  },
  {
    h: 'Human',
    r: 'Resources',
    tag: 'The real job',
    text: 'The most important decision a founder makes is who to make the others with. I spend a lot of my time finding people better than me at their thing — and making them want to stay.',
  },
  {
    h: 'High',
    r: 'Resolution',
    tag: 'The method',
    text: 'Zoom in until the data stops lying. A price is only fair when you see the details behind it — the finer the resolution, the fairer the valuation. That is exactly what MyTracks does.',
  },
];

// MyTracks : pourquoi une valorisation fiable est utile à l'économie
export const why: { title: string; text: string }[] = [
  {
    title: 'Trust unlocks trade',
    text: 'In 1970, George Akerlof used the used-car market to show how markets break when buyers can’t tell what things are worth: good sellers leave, prices sink, trade dries up. It earned him a Nobel prize. An independent, data-driven valuation closes that information gap.',
  },
  {
    title: 'Fair prices move faster',
    text: 'When buyer, seller, lender and insurer agree on a number, deals close quicker, credit and insurance get cheaper, and capital stops being stuck in mispriced assets.',
  },
  {
    title: 'Value that lasts',
    text: 'Knowing what a second-hand good is really worth makes resale, repair and reuse the rational choice. A reliable price is the infrastructure of the circular economy.',
  },
];
