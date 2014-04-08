from django.db import models

# Create your models here.

class ZipCode(models.Model):
	population_thousands = models.IntegerField()
	income_mean  = models.IntegerField()
	income_stdev = models.IntegerField()
	crime_permil = models.IntegerField()
	zip = models.IntegerField(primary_key=True)


class Job(models.Model):
	starting_salary = models.IntegerField()
	growth_rate = models.FloatField()
	name = models.CharField(primary_key=True, max_length=64)

class WorksIn(models.Model):
	zip = models.ForeignKey('ZipCode')
	job = models.ForeignKey('Job')
	percent = models.FloatField()
