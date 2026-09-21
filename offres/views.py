from django.http import HttpResponse
from django.shortcuts import render
from .models import Offre

# Create your views here.
def nouvelles(request):
    list_offres_actives = Offre.objects.filter(active=True)
    return render(request, 'offres/liste_offres.html', {
        "offres": list_offres_actives,
        "total": len(list_offres_actives)
    })

def detail_offre(request, slug):
    return HttpResponse("Page detaillee d'une offre")

def offres_par_villes(request, ville):
    return HttpResponse("Liste des offres par villes")
