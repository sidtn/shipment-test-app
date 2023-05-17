from api.shipments.views import AddressViewSet, SenderViewSet, ShipmentViewSet
from rest_framework import routers

router = routers.SimpleRouter()

router.register(r"senders", SenderViewSet, basename="senders")
router.register(r"shipments", ShipmentViewSet, basename="shipments")
router.register(r"addresses", AddressViewSet, basename="addresses")

urlpatterns = router.urls
