from api.shipments.urls import urlpatterns as shipment_urls
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("rest_framework.urls")),
    path("api/v1/", include(shipment_urls)),
]
