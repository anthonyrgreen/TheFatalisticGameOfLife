from django.db import models

# Create your models here.

class Age(models.Model)
	age = models.IntegerField(primary_key=True)
	prob = models.FloatField()

class Gender(models.Model)
	gender = models.CharField(primary_key=True, max_length=8)
	prob = models.FloatField()

class DeathChance(models.Model):
	age = models.ForeignKey(Age)
	gender = models.ForeignKey(Gender)
	death_rate = models.FloatField()
	class Meta:
		unique_together(("age", "gender"))

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


#class DataModel(models.Model):
#	(WIP) new table containing all data
