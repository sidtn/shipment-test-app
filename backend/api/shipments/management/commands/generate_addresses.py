from api.shipments.models import Address
from django.core.management.base import BaseCommand
from faker import Faker


class Command(BaseCommand):
    help = "Generates random addresses"

    def add_arguments(self, parser):
        parser.add_argument("-c", "--count", type=int)

    def handle(self, *args, **options):
        fake = Faker()

        count = options.get("count") or 100

        addresses = [
            Address(
                state=fake.state(),
                city=fake.city(),
                street=fake.street_address(),
                zip=fake.postcode(),
            )
            for _ in range(count)
        ]

        Address.objects.bulk_create(addresses)

        self.stdout.write(self.style.SUCCESS(f"Successfully created {count} addresses"))
