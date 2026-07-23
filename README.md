# Site web · Kenza Sentissi

Landing page de présentation des services et produits IA (conseil, formation,
audit de maturité et accompagnement à la transformation), pour les entreprises.

Le design s'inspire de l'esprit du site des IApreneurs (fonds crème chaleureux,
accent violet, typographie éditoriale) avec une identité propre.

## Structure du dossier

| Élément | Rôle |
|---|---|
| `index.html` | La page principale du site (toutes les sections). |
| `css/style.css` | Le design system : couleurs, typographie, composants, responsive. |
| `js/main.js` | Les interactions : menu mobile, FAQ, révélations au défilement. |
| `assets/images/` | Les images du site (à ajouter plus tard). |
| `assets/icons/` | Les icônes (le favicon est pour l'instant intégré au HTML). |

## Sections de la page

1. En-tête (navigation fixe)
2. Hero (accroche principale)
3. Bandeau de valeurs
4. Services : les 4 offres (acculturation, diagnostic, formations sur-mesure, accompagnement)
5. Méthode (démarche en 4 étapes)
6. Pour qui ?
7. À propos
8. Témoignages
9. Questions fréquentes (FAQ)
10. Contact (appel à l'action)
11. Pied de page

## Voir le site

Option simple : ouvrir `index.html` dans un navigateur.

Option recommandée (rendu identique au réel), depuis ce dossier :

```
python -m http.server 8123
```

Puis ouvrir http://127.0.0.1:8123/ dans un navigateur.

## À personnaliser

Les textes, témoignages et coordonnées sont des exemples, à remplacer par les
vraies informations (nom de marque, photo, retours clients, adresse de contact).
