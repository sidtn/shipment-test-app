from api.shipments.models import Address, Sender, Shipment
from api.shipments.serializers import (
    AddressSerializer,
    SenderSerializer,
    ShipmentSerializer,
)
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get"]


class SenderViewSet(viewsets.ModelViewSet):
    queryset = Sender.objects.all()
    serializer_class = SenderSerializer
    permission_classes = [AllowAny]


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.select_related("sender", "address")
    serializer_class = ShipmentSerializer
    permission_classes = [AllowAny]

    @action(methods=["put"], detail=True)
    def update_status(self, request, pk):
        try:
            shipment = Shipment.objects.get(pk=pk)
            if shipment.status == Shipment.ShipmentStatus.DELIVERED:
                return Response(
                    {"detail": f"Shipment {pk} is already delivered"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            elif shipment.status == Shipment.ShipmentStatus.PREPARATION:
                shipment.send_shipment()
            else:
                shipment.confirm_delivery()
                shipment.delivered_at = timezone.now().date()
            shipment.save()
            return Response(
                self.get_serializer(shipment).data, status=status.HTTP_200_OK
            )
        except Shipment.DoesNotExist:
            return Response(
                {"detail": f"Shipment {pk} does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
