import json
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from salon.models import DashboardContent

class Command(BaseCommand):
    help = 'Loads dashboard content from a JSON file into the DashboardContent model.'

    def handle(self, *args, **options):
        json_file_path = Path(__file__).resolve().parent / 'dashboard_data.json'

        if not json_file_path.exists():
            self.stdout.write(self.style.ERROR(f'File not found at {json_file_path}'))
            return

        with open(json_file_path, 'r') as f:
            data = json.load(f)

        for slug, content_data in data.items():
            obj, created = DashboardContent.objects.update_or_create(
                slug=slug,
                defaults={'data': content_data}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created DashboardContent for slug="{slug}"'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Successfully updated DashboardContent for slug="{slug}"'))
