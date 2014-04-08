from models import ZipCode, Job, WorksIn
import random

def isRandTruePercent(percent_true):
	return random.random() <= percent_true

def randomName(zip):
	# TODO
	return 'carl'

def randomJob(zip):
	# TODO
	return 'hobo'

class Person:
	age = 0
	name = ''
	career = '' #fkey
	networth = 0
	income = 0
	dead = False
	income_growthrate = 0
	current_zip_num = 0 #fkey


	def __init__(self, zip):
		self.name = randomName(zip)
		self.current_zip_num = zip.zip
		self.career = randomJob(zip)
		self.income = 60000
		self.income_growthrate = 0.01

	def move(self, new_zip):
		current_zip_num = new_zip.zip

	def careerChange(self, job):
		career = job.name
		income = job.starting_salary
		income_growthrate = job.growth_rate

	def step(self):
		# process small changes in variables
		++self.age
		self.networth += self.income
		self.income *= 1.0 + self.income_growthrate

		# process random events
		# erm... TODO
