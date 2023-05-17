from api.shipments.models import Address, Sender, Shipment
from rest_framework import serializers


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "state", "city", "street", "zip", "full_address"]


class SenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sender
        fields = ["id", "name", "phone"]

    def validate_phone(self, value):
        if not value.isnumeric():
            raise serializers.ValidationError(
                "Phone number must contains only numeric symbols"
            )
        return value


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = [
            "id",
            "sender",
            "address",
            "status",
            "address",
            "created_at",
            "delivered_at",
        ]

        extra_kwargs = {
            "status": {"read_only": True},
            "delivered_at": {"read_only": True},
        }

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["sender"] = SenderSerializer(instance.sender).data
        ret["address"] = AddressSerializer(instance.address).data
        return ret
