from email.policy import default
from random import choices
from django.db import models

class Entreprise(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=50, default="default")
    ville = models.CharField(max_length=50, default="Dakar")
    site = models.URLField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} à {self.ville} - {self.site}"

class Offre(models.Model):
    CONTRAT_CDI = "CDI"
    CONTRAT_CDD = "CDD"
    CONTRAT_PRESTATION = "PRESTATION"
    CONTRAT_STAGE = "STAGE"
    CONTRAT_CHOIX = [
        (CONTRAT_CDI, "Contrat à durée indeterminée"),
        (CONTRAT_CDI, "Contrat à durée eterminée"),
        (CONTRAT_STAGE, "Contrat de stage"),
        (CONTRAT_PRESTATION, "Contrat de prestation"),
    ]

    slug = models.SlugField(max_length=250, unique=True)
    titre = models.CharField(max_length=200)
    salaire = models.PositiveIntegerField()
    entreprise = models.ForeignKey(
        Entreprise,
        on_delete=models.CASCADE,
        related_name="offres"
    )
    description = models.TextField(blank=True, null=True)
    contrat = models.CharField(max_length=15, choices=CONTRAT_CHOIX, default=CONTRAT_PRESTATION)
    teletravail = models.BooleanField(default=False)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.titre} à {self.entreprise.name} - {self.contrat} à {self.salaire} FCFA par mois"

