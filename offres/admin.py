from django.contrib import admin

# Register your models here.
from .models import Entreprise, Offre

admin.site.register(Entreprise)

@admin.register(Offre)
class OffreAdmin(admin.ModelAdmin):
    list_display = ["titre", "entreprise", "contrat", "salaire", "active"]
    list_filter = ["active", "contrat", "entreprise"]
    search_fields = ["tire", "description"]