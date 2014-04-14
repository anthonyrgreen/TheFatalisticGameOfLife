from django.core.management.base import BaseCommand
from tfgol_web.models import Age, Gender, DeathChance

class Command(BaseCommand):
	help = 'Populate databases with the values in supplied CSV files found in tfgol_web/stats_data/'
	
	def fillAge():
		
	
	def handle(self, *args, **options):
		
