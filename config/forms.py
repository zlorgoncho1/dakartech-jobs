from cProfile import label
from django import forms
from unfold import widgets

class ContactForm(forms.Form):
    SUJET_CANDIDAT = "CANDIDAT"
    SUJET_RECRUTEUR = "RECRUTEUR"
    SUJET_PARTENARIAT = "PARTENARIAT"
    SUJET_AUTRE = "AUTRE"
    SUJET_CHOIX = [
        (SUJET_CANDIDAT, "Je suis candidat"),
        (SUJET_RECRUTEUR, "Je suis recruteur"),
        (SUJET_PARTENARIAT, "Partenariat"),
        (SUJET_AUTRE, "Autre"),
    ]

    fullname = forms.CharField(
        max_length=80,
        label = "Nom complet",
        error_messages={
            "required": "Indiquez votre nom complet.",
            "max_length": "Votre nom ne peut pas depasser 80 caractères"
        },
        widget = forms.TextInput(
            attrs={
                "class":"form-control",
                "placeholder":"Awa Ndiaye",
                "autocomplete":"name",
            }
        )
    )
    email = forms.EmailField(
        label="E-mail",
        error_messages={
            "required": "Indiquez votre adresse email.",
            "invalid": "Indiquez une adresse e-mail valide."
        },
        widget = forms.TextInput(
            attrs={
                "class":"form-control",
                "placeholder":"awa.example.sn",
                "autocomplete":"email",
            }
        )
    )
    sujet = forms.ChoiceField(choices=SUJET_CHOIX)
    message = forms.CharField(widget=forms.Textarea)
    accept_newsletter = forms.BooleanField(required=False)
    