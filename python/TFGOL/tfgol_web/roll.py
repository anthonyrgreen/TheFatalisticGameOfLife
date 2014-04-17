import person

def age(person):
	return person.age + 1

def death(person):
	# query db for probabilities given person
	# ( TODO )
	return False

def income_growth(person):
	return person.income_growthrate

def income(person):
	return person.income * (1.0 + person.income_growthrate)

def networth(person):
	# TODO: this will also have some statistical factor
	# added into it with data from the db
	return person.networth + person.income
