import json
from django.core.management.base import BaseCommand
from portfolio.models import Loan

class Command(BaseCommand):
    help = 'Load loans from loans.json into the database'

    def handle(self, *args, **kwargs):
        with open('loans.json', 'r') as file:
            loans = json.load(file)

        for loan in loans:
            loan['amount'] = float(str(loan['amount']).replace("₹", "").replace(",", "").strip())
            Loan.objects.update_or_create(id=loan['id'], defaults=loan)

        self.stdout.write(self.style.SUCCESS(f"Loaded {len(loans)} loans successfully!"))
