# Thème DakarTech Jobs

Thème **HTML / CSS / JS pur** (aucune dépendance, aucun framework) pour le projet Django
« DakarTech Jobs ». Il est livré comme un site statique : ouvrez `index.html` dans un
navigateur, puis découpez-le pour l'intégrer dans vos templates Django.

```
theme/
├── index.html          Accueil                    → vue page_accueil
├── offres.html         Liste des offres + filtres → vue liste_offres / offres_par_ville
├── offre.html          Détail d'une offre         → vue detail_offre
├── postuler.html       Formulaire de candidature  → vue postuler (forms.py)
├── entreprises.html    Liste des entreprises      → vue liste_entreprises
├── entreprise.html     Page d'une entreprise      → vue detail_entreprise
├── candidatures.html   Tableau « Mes candidatures » (utilisateur connecté)
├── connexion.html      Connexion                  → django.contrib.auth LoginView
├── inscription.html    Inscription                → UserCreationForm
├── contact.html        Contact                    → vue page_contact
├── 404.html            Page introuvable           → templates/404.html
├── styleguide.html     Catalogue de tous les composants (référence)
├── css/theme.css       LA feuille de style (tokens + composants + responsive)
├── js/theme.js         Interactions (menu mobile, dropdown, onglets, alertes…)
└── assets/logo.svg     Logo (utilisé aussi comme favicon)
```

Pour tester en local avec un vrai serveur (recommandé) :

```bash
cd theme
python3 -m http.server 8000
# → http://localhost:8000
```

---

## 1. Le système de design

### Police

**Manrope** (Google Fonts), graisses 400 → 800. Chargée dans le `<head>` :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Sans connexion, le navigateur retombe sur la police système (`system-ui`) : rien ne casse.

### Couleurs

Toutes les couleurs sont des variables CSS déclarées dans `:root` (section 01 de `theme.css`).

| Rôle | Variable | Valeur | Usage |
|---|---|---|---|
| Principale | `--primary` | `#004955` | boutons, liens, marque |
| Secondaire | `--secondary` | `#8FD0E4` | accroches sur fond sombre, bouton secondaire |
| Accent vert | `--green` | `#6B9757` | badge CDI, statut « acceptée » |
| Accent bleu | `--blue` | `#50A2CC` | badge CDD, statut « en cours », info |
| Accent ambre | `--amber` | `#E9B45C` | badge Stage, statut « entretien », avertissement |
| Accent rose | `--pink` | `#D66D9F` | badge Freelance, statut « refusée », erreur |
| Accent ciel | `--sky` | `#8FD0E4` | badge Alternance, statut « envoyée » |

Chaque accent existe en trois tons : `--green` (la couleur), `--green-dark` (version lisible
pour du **texte** sur fond blanc) et `--green-soft` (fond pastel). Les composants colorés
(`.badge--green`, `.avatar--green`, `.icon-box--green`, `.stat--green`, `.alert--success`…)
combinent toujours *fond soft + texte dark* : le contraste est garanti.

**Règle d'équilibre :** les cinq accents doivent apparaître à parts égales. Faites-les tourner
(avatars, tuiles, étapes) plutôt que d'en répéter un seul.

Neutres : `--ink` (titres), `--text` (texte), `--muted` (secondaire), `--faint` (dates,
placeholders), `--line` (trait fin), `--surface` (blanc), `--surface-2` (section teintée).

### Dégradés

| Variable | Description | Où |
|---|---|---|
| `--gradient-brand` | teal profond → bleu/vert, avec halos | hero, bandeau CTA, panneau auth, `.card--dark` |
| `--gradient-spectrum` | ambre → rose → bleu → vert → ciel (vertical) | barre gauche du hero, logo |
| `--gradient-spectrum-x` | idem, horizontal | liseré du footer, chiffres 404 |
| `--gradient-teal` | `#004955` → `#1F7590` | `.text-gradient`, `.avatar--gradient` |
| `--gradient-sky`, `--gradient-mint`, `--gradient-sunset` | déclinaisons décoratives | libres |

### Les 4 règles à respecter

1. **Aucune ombre** (`box-shadow` est absent du thème). La hiérarchie vient du contraste
   des fonds : blanc sur `--surface-2`, ou `--surface-2` sur blanc.
2. **Cartes : tout ou rien.** Soit aucun trait (`.card`, `.card--tinted`), soit un trait fin
   sur les 4 côtés (`.card--outlined`). Jamais de bordure sur un seul côté.
3. **Fond blanc.** Les seuls fonds sombres sont les blocs à dégradé « marque »
   (toujours accompagnés de la classe `.on-dark` qui adapte titres, textes et boutons).
4. **Manrope partout**, y compris dans les champs de formulaire (`font: inherit`).

### Échelles

- Espacements : `--space-1` (4px) … `--space-24` (96px), base 4px.
- Rayons : `--radius-sm` 8px · `--radius` 12px · `--radius-lg` 18px (cartes) · `--radius-pill` (boutons, badges).
- Conteneur : `--container` 1180px, gouttière 24px (16px sur mobile).
- Points de rupture : 1024px, 900px (menu mobile), 640px.
- Les cibles d'ancres (`[id]`) ont un `scroll-margin-top` : elles ne passent pas sous le header collant.

---

## 2. Les composants (voir `styleguide.html`)

| Composant | Classes | Notes |
|---|---|---|
| Bouton | `.btn` + `--primary` `--secondary` `--soft` `--outline` `--ghost` `--danger`, tailles `--sm` `--lg`, `--block` | `<a>` ou `<button>` |
| Badge | `.badge` + `--green` `--blue` `--amber` `--pink` `--sky` `--primary` `--dark` `--outline` `--dot` | type de contrat, statut |
| Chip | `.chip`, `.is-active` / `aria-pressed="true"` | filtre rapide |
| Avatar | `.avatar` + couleur, tailles `--sm` `--lg` `--xl`, `--round` | initiales d'une entreprise |
| Icon-box | `.icon-box` + couleur, `--sm` `--lg` | icône ou numéro d'étape |
| Carte | `.card` + `--outlined` `--tinted` `--dark` `--interactive` `--compact` | `.stretched-link` rend la carte cliquable |
| Carte offre | `.offre-card` (ligne) / `.offre-card--grid` (vignette) + éléments `__title` `__meta` `__tags` `__aside` `__salary` `__date` | se combine avec `.card` |
| Carte entreprise | `.entreprise-card` + `__head` `__name` `__sector` `__desc` `__foot` `__count` | |
| Tuile stat | `.stat` + couleur, `__value` `__label` | |
| Carte ville | `.ville-card`, `--white` sur section teintée | |
| Formulaire | `.form` `.form-row` `.form-group` `.form-label` `.required` `.form-control` `.form-help` `.form-error` `.form-check` `.form-file` `.form-actions` | `.is-invalid` pour l'état erreur |
| Barre de recherche | `.search-bar` (+ `--outlined` sur fond blanc), `__field`, `__field--select` | |
| Alerte | `.alert` + `--success` `--info` `--warning` `--error` `--debug`, `__body` `__title` `__close` | mêmes noms que les tags de `django.contrib.messages` |
| Tableau | `.table-wrap > .table`, cellules `.cell-muted` `.cell-num` `.cell-actions` `.cell-primary` | |
| Breadcrumb | `.breadcrumb` (`<ol>`), `aria-current="page"` sur le dernier | |
| Pagination | `.pagination` (`<ul>`), `aria-current="page"`, `.is-disabled` | |
| Onglets | `.tabs` + `.tabs__tab`, panneaux `[data-tab-panel]` | JS |
| Dropdown | `.dropdown` `[data-dropdown]`, `__menu` `__item` `__sep` `__head` | JS |
| Hero | `.hero.on-dark`, `__title` (avec `<em>` coloré) `__lead` `__chips` `__stats` | |
| En-tête de page | `.page-head` (clair) / `.page-head--dark.on-dark` | |
| Bandeau CTA | `.cta-band.on-dark`, `__actions` | |
| Layout | `.layout-sidebar` (filtres à gauche) / `.layout-sidebar--right`, `.sidebar` | |
| Auth | `.auth > .auth__panel.on-dark + .auth__form > .auth__card` | |
| État vide | `.empty` | pour `{% empty %}` |
| Page d'erreur | `.error-page`, `__code` | 404 / 500 |
| Utilitaires | `.kicker` `.lead` `.muted` `.small` `.text-center` `.mt-*` `.mb-*` `.grid.grid--2/3/4` `.stack` `.cluster` (`--center`) `.split` `.divider` `.h1` `.h2` | les marges `.mt-*`/`.mb-*` gagnent toujours (`!important`) |
| Styleguide | `.swatch` (`--outlined`), `.grid--swatches`, `.toc` | nuancier et sommaire de `styleguide.html` |

---

## 3. JavaScript (`js/theme.js`)

Tout est piloté par des attributs `data-*`. Aucune initialisation à écrire : incluez le
script en fin de `<body>` et ajoutez les attributs sur vos éléments.

| Fonction | Balisage |
|---|---|
| Menu mobile | `<button data-toggle="nav" aria-controls="site-nav" aria-expanded="false">` |
| Filtres mobiles | `<button data-toggle="filters" aria-controls="filters-panel">` + `<div id="filters-panel" class="filters-panel">` |
| Dropdown | `<div class="dropdown" data-dropdown><button data-dropdown-toggle>…</button><div class="dropdown__menu">…</div></div>` |
| Fermer une alerte | `<button data-dismiss="alert">` dans une `.alert` |
| Onglets | `<div data-tabs>` contenant des `<button data-tab="x">`, panneaux `<div data-tab-panel="x">` |
| Chip à bascule | `<button class="chip" aria-pressed="false">` |
| Champ fichier | `<label class="form-file"><input type="file"><span class="btn btn--outline btn--sm">Choisir</span><span class="form-file__name">Aucun fichier</span></label>` |
| Curseur avec valeur | `<input type="range" data-range-output="id-du-output">` + `<output id="id-du-output">` |
| Validation légère | `<form data-validate>` : les champs `required` invalides reçoivent `.is-invalid` et un message |
| Soumission auto | `<select name="tri" data-autosubmit>` dans un `<form method="get">` : soumet au changement (tri d'une liste) |

---

## 4. Découper le thème pour Django (pistes)

Chaque page HTML contient trois zones délimitées par des commentaires :

```
<!-- HEADER — commun à toutes les pages (→ templates/base.html) -->
<!-- CONTENU DE LA PAGE (→ {% block content %}) -->
<!-- FOOTER — commun à toutes les pages (→ templates/base.html) -->
```

Le header et le footer sont **strictement identiques** d'une page à l'autre (seule la classe
`is-active` du lien courant change). Ils ont vocation à aller dans `base.html` ; le contenu
de chaque page dans un `{% block content %}`.

Quelques correspondances utiles :

- `css/theme.css`, `js/theme.js`, `assets/logo.svg` → dossier `static/`, chargés avec `{% static %}`.
- Les liens `offres.html`, `offre.html`… → `{% url 'liste_offres' %}`, `{% url 'detail_offre' offre.id %}`.
- Chaque `<article class="card … offre-card">` de la liste → une itération de `{% for offre in offres %}`.
  Le bloc `.empty` correspond à `{% empty %}`.
- La couleur d'avatar peut tourner avec `{% cycle 'green' 'blue' 'amber' 'pink' 'sky' %}`.
- Les salaires : `{{ offre.salaire|intcomma }}` (activer `django.contrib.humanize`) ou un filtre maison.
- Les messages : `{% for message in messages %}<div class="alert alert--{{ message.tags }}">…`
  (les classes `success`, `info`, `warning`, `error` existent déjà).
- Les formulaires : le thème stylise aussi `.errorlist` et `.helptext`, les classes générées
  par `{{ form.as_p }}` ; pour un rendu champ par champ, utilisez `.form-group` + `.form-control`.
- La pagination : les liens `?page=N` correspondent à `page_obj.previous_page_number`, etc.
