from django.http import HttpResponse
from django.shortcuts import render
from .donnees import offres_actives, offre_par_slug

# Create your views here.
def nouvelles(request):
    list_offres_actives = offres_actives()
    return render(request, 'offres/liste_offres.html', {
        "offres": list_offres_actives,
        "total": len(list_offres_actives)
    })

def detail_offre(request, slug):
    return HttpResponse("Page detaillee d'une offre")

def offres_par_villes(request, ville):
    return HttpResponse("Liste des offres par villes")
