from models import ZipCode, Job, WorksIn
import random
import roll

def isRandTruePercent(percent_true):
	return random.random() <= percent_true

def randomName(zip):
	# TODO
	return 'carl'

def randomJob(zip):
	# TODO
	return 'panhandler'

class Person:
	# all random variables
	age = 0
	dead = False
	gender = ''
	race = ''
	name = ''
	career = '' #fkey
	networth = 0
	income = 0
	income_growthrate = 0
	current_zip_num = 0 #fkey
	# TODO: more?

	def __init__(self, zip):
		self.name = randomName(zip)
		self.current_zip_num = zip.zip
		self.career = randomJob(zip)
		self.income = random.gauss(62000,5000)
		self.income_growthrate = 0.01

	def move(self, new_zip): # dep
		current_zip_num = new_zip.zip

	def careerChange(self, job): # dep
		career = job.name
		income = job.starting_salary
		income_growthrate = job.growth_rate

	def step(self):
		# process random events

		self.age = roll.age(self)
		self.dead = roll.death(self)
		self.income_growthrate = roll.income_growth(self)
		self.income = roll.income(self)
		self.networth = roll.networth(self)
		# etc (TODO)
