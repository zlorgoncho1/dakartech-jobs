OFFRES = [
    {
        "slug": "developpeur-django-baamtu",
        "titre": "Developpeur Django",
        "entreprise": "Baamtu",
        "ville": "Dakar",
        "salaire": 750000,
        "active": True
    },
    {
        "slug": "developpeur-laravel-sonatel",
        "titre": "Developpeur Laravel",
        "entreprise": "Sonatel",
        "ville": "Dakar",
        "salaire": 1200000,
        "active": True
    },
    {
        "slug": "developpeur-nestjs-eyone",
        "titre": "Developpeur NestJS",
        "entreprise": "Eyone",
        "ville": "Dakar",
        "salaire": 1200000,
        "active": True
    },
    {
        "slug": "developpeur-angular-yas",
        "titre": "Developpeur Angular",
        "entreprise": "Eyone",
        "ville": "Dakar",
        "salaire": 850000,
        "active": True
    }
]

def offres_actives():
    return [offre for offre in OFFRES if offre["active"]]

def offre_par_slug(slug):
    for offre in OFFRES:
        if offre["slug"] == slug:
            return offre
    return None