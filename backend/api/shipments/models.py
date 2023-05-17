import uuid

from django.db import models
from django_fsm import FSMField, transition


class BaseModel(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )

    class Meta:
        abstract = True


class Address(BaseModel):
    state = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    zip = models.CharField(max_length=255)

    class Meta:
        unique_together = ["state", "city", "street", "zip"]

    @property
    def full_address(self):
        return f"{self.state}, {self.city}, {self.street}, {self.zip}"

    def __str__(self):
        return f"{self.state} {self.city} {self.street} {self.zip}"


class Sender(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    phone = models.CharField(max_length=12)

    def __str__(self):
        return self.name


class Shipment(BaseModel):
    class ShipmentStatus(models.TextChoices):
        PREPARATION = "PREPARATION"
        IN_TRANSIT = "IN TRANSIT"
        DELIVERED = "DELIVERED"

    sender = models.ForeignKey(
        Sender, on_delete=models.PROTECT, related_name="shipments"
    )
    status = FSMField(default=ShipmentStatus.PREPARATION.value, protected=True)
    address = models.ForeignKey(
        Address, on_delete=models.PROTECT, related_name="shipments"
    )
    created_at = models.DateField(auto_now_add=True)
    delivered_at = models.DateField(null=True, blank=True)

    @transition(
        field=status,
        source=ShipmentStatus.PREPARATION.value,
        target=ShipmentStatus.IN_TRANSIT.value,
    )
    def send_shipment(self):
        pass

    @transition(
        field=status,
        source=ShipmentStatus.IN_TRANSIT.value,
        target=ShipmentStatus.DELIVERED.value,
    )
    def confirm_delivery(self):
        pass
