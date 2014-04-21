import distributions as dist
import random
import json

class person:
	def __init__(self):
		# The below is a measure of the average an individual can be expected to move
		# around in the percentile spread of incomes -- in other words, if 
		# avg_inc_change = .04, then that means the average person can be expected to
		# go from the 50th to the 54th, or the 46th percentile, in a given year. 
		# This should eventually be replaced with something tied to educational ach-
		# ievment.
		self.avg_inc_change = .04
	def from_womb(self):
		random.seed()
		self.gender = self.roll_gender()
		self.race = self.roll_race()
		self.name = self.roll_name()
		self.income = 0
		self.age = 0
		self.alive = True
		self.income_percentile = random.uniform(0, 1)
	def from_midlife(self, data):
		self.gender = data["gender"]
		self.race = data["race"]
		self.name = data["name"]
		self.income = int(data["income"]) # (int)?
		self.age = int(data["age"]) # (int)?
		self.alive = True
		self.income_percentile = random.uniform(0, 1) # does this work?
	def life_data(self):
		records = []
		while(self.alive):
			records.append({
				"gender" : self.gender,
				"race" : self.race,
				"name" : self.name,
				"income" : self.income,
				"age" : self.age,
				"income_percentile" : self.income_percentile})
			self.step_year()
		return records
	def roll_race(self):
		# These stats come from the wiki page for "Demographics of the United States"
		# -- note that the Hispanic population is over-represented by about 3% because 
		# of our lack of categories for Native Hawaiian, Pacific Islander, and Native
		# American populations
		dice = random.uniform(0, 1)
		if(dice <= .637):
			return "White"
		elif(dice <= .637 + .122):
			return "Black"
		elif(dice <= .637 + .122 + .047):
			return "Asian"
		else:
			return "Hispanic"
	def roll_gender(self):
		# Wikipedia claims that there are 1.048 males/females at birth, meaning the
		# proportion of men is 1.048/(1 + 1.048) = .51171875
		dice = random.uniform(0, 1)
		if(dice <= .51171875):
			return "Male"
		else:
			return "Female"
	def roll_name(self):
		return "Alice"
	def roll_birthday(self):
		if(random.uniform(0, 1) < dist.death_prob(self.gender, self.age)):
			return False
		else:
			return True
	def roll_income(self):		
		# If we've got no income, hang tight
		if(self.age < 25):
			return

		income_f = dist.income_cumulative_prob_inverse(self.gender, self.race, self.age)
		income_percentile_f = dist.income_cumulative_prob_func(self.gender, self.race, self.age)

		# Compute new income if we've had none so far
		if(self.age == 25):
			self.income = income_f(self.income_percentile)
		# Else compute continuation income
		else:
			# Figure out our current income percentile and jiggle it
			self.income_percentile = income_percentile_f(self.income)
			self.income_percentile += random.gauss(0, self.avg_inc_change)
			if(self.income_percentile > 1):
				self.income_percentile = .999999999999
			elif(self.income_percentile < 0):
				self.income_percentile = 0
			# Compute new income
			self.income = income_f(self.income_percentile)
	def step_year(self):
		self.print_state()
		if(not self.roll_birthday()):
			self.alive = False
		else:
			self.age = self.age + 1
			self.roll_income()
	def print_state(self):
		print("At age " + str(self.age) + ", I am in the " + str(100*self.income_percentile) + \
		"th percentile. I make " + str(self.income) + " a year")
