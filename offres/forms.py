from django.forms import forms, widgets
from .models import Offre

class OffreForm(forms.ModelForm):
    
    class Meta:
        model = Offre
        fields = ("titre", "salaire", "entreprise", "description", "contrat", "teletravail")
        labels = {
            "titre": "Intitule du poste",
            "salaire": "Salaire mensuel brut (en FCFA)"
        }

        widgets = {
            "titre": forms.TextInput(
                attrs={
                    "placeholder": "Developpeur",
                }
            )
        }