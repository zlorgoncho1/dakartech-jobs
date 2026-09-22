from django.contrib import admin
from unfold.admin import ModelAdmin

# Register your models here.
from .models import Entreprise, Offre


@admin.register(Offre)
class OffreAdmin(ModelAdmin):
    list_display = ["titre", "entreprise", "contrat", "salaire", "active"]
    list_filter = ["active", "contrat", "entreprise"]
    search_fields = ["tire", "description"]

@admin.register(Entreprise)
class Entreprise(ModelAdmin):
    pass