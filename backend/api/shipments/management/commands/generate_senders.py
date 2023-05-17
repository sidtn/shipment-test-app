import random

from api.shipments.models import Sender
from django.core.management.base import BaseCommand
from faker import Faker


class Command(BaseCommand):
    help = "Generates senders"

    def add_arguments(self, parser):
        parser.add_argument("-c", "--count", type=int)

    def handle(self, *args, **options):
        fake = Faker()

        count = options.get("count") or 20

        senders = [
            Sender(
                name=fake.name(),
                phone=random.randint(1000000, 9999999),
            )
            for _ in range(count)
        ]

        Sender.objects.bulk_create(senders)

        self.stdout.write(self.style.SUCCESS(f"Successfully created {count} senders"))
