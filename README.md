# LuxeCoffee — E-commerce

Site vitrine et e-commerce statique pour **LuxeCoffee**, maison de café de spécialité au Maroc. Design sombre et doré, catalogue filtrable, personnalisation des produits, panier persistant et tunnel de commande hybride site + WhatsApp.

## Stack

- HTML5 sémantique
- Tailwind CSS via CDN (palette personnalisée LuxeCoffee)
- Lucide Icons via CDN
- JavaScript Vanilla, sans build
- `localStorage` pour la persistance du panier

Aucun serveur ni framework n'est nécessaire : le site fonctionne sur GitHub Pages, Netlify, Vercel ou tout hébergement statique.

## Structure

```
index.html      Structure, contenu, modales et panier
styles.css      Design system, animations et responsive
app.js          Catalogue, panier, checkout, WhatsApp
favicon.svg     Monogramme de la maison
.nojekyll       Désactive le traitement Jekyll sur GitHub Pages
```

## Lancer en local

Ouvrir `index.html` directement dans un navigateur, ou servir le dossier :

```bash
python -m http.server 4173
```

Puis ouvrir <http://localhost:4173>.

## Personnalisation

### Numéro WhatsApp

En haut de `app.js` :

```js
const WHATSAPP_NUMBER = '212600000000';
```

Format international, sans `+` ni espaces. Le numéro affiché est `WHATSAPP_DISPLAY`, juste en dessous.

### Frais de livraison

```js
const SHIPPING_FEE = 30;
const FREE_SHIPPING_THRESHOLD = 300;
```

### Produits

Le catalogue se trouve dans `PRODUCTS` (`app.js`). Chaque produit contient son origine, ses notes, son intensité, ses prix par poids (250 g, 500 g, 1 kg) ou par boîte de capsules (10, 30, 50). Les cafés moulus proposent en plus les moutures Expresso, Filtre, Presse Française et Cafetière Italienne.

## Fonctionnalités

- Filtres instantanés par catégorie et tri par prix/intensité
- Fiche produit avec sélection du poids, de la mouture ou du format capsules
- Panier latéral persistant avec quantités, suppression et options choisies
- Livraison à 30 MAD, offerte dès 300 MAD, avec barre de progression
- Checkout avec validation, paiement à la livraison ou carte simulée
- Confirmation de commande avec numéro de suivi unique
- Commande en un clic via WhatsApp avec message formaté
- Responsive mobile, tablette et desktop
- Accessibilité : navigation clavier, focus, labels, `aria-*`, réduction des animations

## Déploiement GitHub Pages

```bash
git init
git branch -M main
git add .
git commit -m "Initial release: LuxeCoffee E-commerce"
gh repo create luxecoffee --public --source=. --remote=origin --push
gh api repos/{owner}/luxecoffee/pages -X POST \
  -F build_type=legacy \
  -F source[branch]=main \
  -F source[path]=/
```

Le site sera disponible à l'adresse `https://{owner}.github.io/luxecoffee/`.

## Tests

La logique métier de `app.js` est exportée pour être testée sous Node :

```bash
node --check app.js
```

Les tests couvrent les prix par poids/format, les règles de livraison, l'absence de `NaN`, la normalisation du panier, la validation du checkout et l'encodage des liens WhatsApp.
