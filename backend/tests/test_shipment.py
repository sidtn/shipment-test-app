from api.shipments.models import Address, Sender, Shipment
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase


class ShipmentTest(APITestCase):
    fixtures = ["tests/fixtures/addresses.json"]

    def setUp(self):
        self.user = User.objects.create(
            username="test_user", email="test@email.com", password="password"
        )
        self.client.force_login(self.user)
        self.sender = Sender.objects.create(name="test_sender")

        self.addresses = Address.objects.all()

        self.shipment = Shipment.objects.create(
            sender=self.sender, address=self.addresses[0]
        )

    def test_create_shipment(self):
        url = reverse("shipments-list")
        data = {"sender": self.sender.id, "address": self.addresses[0].pk}

        response = self.client.post(url, data=data, format="json")
        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.json().get("status"), "PREPARATION")
        self.assertEquals(Shipment.objects.all().count(), 2)

    def test_update_shipment(self):
        url = reverse("shipments-detail", kwargs={"pk": self.shipment.id})
        data = {"sender": self.shipment.sender.id, "address": self.addresses[1].pk}

        response = self.client.put(url, data=data, format="json")
        self.assertEquals(response.status_code, 200)
        self.assertEquals(
            response.json().get("address").get("id"), str(self.addresses[1].pk)
        )

    def test_update_shipment_status(self):
        url = reverse("shipments-update-status", kwargs={"pk": self.shipment.id})

        response = self.client.put(url)
        self.assertEquals(response.status_code, 200)
        self.assertEqual(response.json().get("status"), "IN TRANSIT")
        self.assertIsNone(response.json().get("delivered_at"))

        response = self.client.put(url)
        self.assertEquals(response.status_code, 200)
        self.assertEqual(response.json().get("status"), "DELIVERED")
        self.assertEquals(
            response.json().get("delivered_at"),
            timezone.now().date().strftime("%Y-%m-%d"),
        )
