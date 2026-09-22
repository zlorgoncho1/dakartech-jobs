from django.contrib import messages
from django.shortcuts import redirect, render
from .forms import ContactForm

def page_accueil(request):
    return render(request, "index.html")

def page_contact(request):
    if request.method == 'POST':
        form_data = request.POST
        print(form_data)
        contact_form = ContactForm(form_data)
        if contact_form.is_valid():
            messages.success(request, "Nous avons bien reçu votre demande, nos allons bientot vous contacter")
            return redirect("accueil")
    else:
        contact_form = ContactForm()
    return render(request, "contact.html", { "contact_form": contact_form})
