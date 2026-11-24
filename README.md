# hugoreal.fr

Site perso statique, fait avec [Astro](https://astro.build) et hébergé gratuitement sur **GitHub Pages**
(domaine `hugoreal.fr`).

## Travailler en local

```bash
npm install      # une seule fois
npm run dev      # http://localhost:4321 — recharge à chaque modification
npm run build    # génère le site final dans dist/
npm run preview  # sert dist/ pour vérifier le build
```

## Publier une nouvelle version

**Il suffit de pousser sur `main`.** La GitHub Action `.github/workflows/deploy.yml` build le site et le met
en ligne en 1 à 2 minutes (suivi dans l'onglet *Actions* du repo). On peut aussi la relancer à la main
avec le bouton *Run workflow*.

## Où modifier quoi

| Je veux…                         | Fichier                                   |
| -------------------------------- | ----------------------------------------- |
| changer un texte, un lien, la photo | `src/data/site.ts`                     |
| modifier la page d'accueil       | `src/pages/index.astro`                   |
| écrire une note                  | `src/content/notes/<slug>.md`             |
| changer couleurs / polices       | `src/styles/global.css` (variables `:root`) |
| l'animation du hero              | `src/scripts/tour.ts`                     |
| `<head>`, SEO, en-tête, pied de page | `src/layouts/Base.astro`, `src/components/` |
| images, favicon, fichiers bruts  | `public/` (copié tel quel)                |

### Écrire une note

Copier `src/content/notes/exemple-de-note.md`, le renommer (le nom du fichier devient l'URL
`/notes/<nom>/`), remplir le front-matter et passer `draft: false`. Les brouillons (`draft: true`)
sont visibles avec `npm run dev` mais jamais publiés. Les notes alimentent aussi `/rss.xml` et le sitemap.

## Arborescence

```
src/
  data/site.ts          contenu perso (textes, liens)
  layouts/Base.astro    squelette HTML commun
  components/           Header, Footer, Hero, NoteList
  pages/                une page = un fichier (index, notes/, 404, rss.xml)
  content/notes/        notes en Markdown
  content.config.ts     schéma des notes
  scripts/              petit JS côté navigateur (animation, apparitions)
  styles/global.css     thème et styles globaux
public/                 favicon, CNAME, robots.txt…
```

## Contraintes de GitHub Pages (gratuit)

- **Statique uniquement** : pas de serveur, pas de base de données, pas de formulaire traité côté serveur.
  Tout ce qui est dynamique se fait en JS dans le navigateur ou via un service tiers.
- Site publié ≤ **1 Go**, bande passante ~**100 Go/mois**, ~**10 déploiements/heure** (limites souples).
- Pas d'en-têtes HTTP ni de redirections configurables ; la page `404.html` est servie automatiquement.
- Le repo doit rester **public** (sur un compte gratuit).
- Le domaine perso se règle dans *Settings → Pages* ; `public/CNAME` le rappelle.
