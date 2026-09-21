from django.http import HttpResponse
from django.shortcuts import render

def page_accueil(request):
    return render(request, "index.html")

def page_contact(request):
    return render(request, "contact.html")
