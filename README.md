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
| changer un texte, un lien, les lectures H/R, les arguments MyTracks | `src/data/site.ts` |
| la photo / le logo | `public/hugo-real.jpg`, `src/components/Logo.astro`, `public/favicon.svg` |
| modifier la page d'accueil       | `src/pages/index.astro`                   |
| changer couleurs / polices       | `src/styles/global.css` (variables `:root`) |
| l'animation du hero              | `src/scripts/tour.ts`                     |
| `<head>`, SEO, en-tête, pied de page | `src/layouts/Base.astro`, `src/components/` |
| images, favicon, fichiers bruts  | `public/` (copié tel quel)                |

## Arborescence

```
src/
  data/site.ts          contenu perso (textes, liens)
  layouts/Base.astro    squelette HTML commun
  components/           Header, Footer, Hero, HR, Logo
  pages/                une page = un fichier (index, 404)
  scripts/              petit JS côté navigateur (animations, apparitions)
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
