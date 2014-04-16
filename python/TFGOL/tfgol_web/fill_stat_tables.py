import csv
import os

def fill_income():
	with open("./stat_data/csv_sheets/income_median_mean|gender_age_race.csv", "r+") as x:
		y = open('./stat_data/income_table.py', 'w+')
		y.write("income = {")
		income_med_mean = csv.reader(x)
		for row in income_med_mean:
			if(row[0] == "Male" or row[0] == "Female"):
				gender = row[0]
			elif(row[0] == "25-34"):
				age = 25
			elif(row[0] == "35-44"):
				age = 35
			elif(row[0] == "45-54"):
				age = 45
			elif(row[0] == "55-64"):
				age = 55
			elif(row[0] == "65-74"):
				age = 65
			elif(row[0] == "75--"):
				age = 75
			else:
				race = row[0]
				y.write("('" + gender + "','" + race + "'," + str(age) + ") : (" + row[1] + "," + row[2] + "),\n")
		y.write("0:0}\n")
		func = '''def get_income(gender, race, age):
  if(age < 25):
    return (0,0)
  elif(age < 35):
    return income[(gender, race, 25)]
  elif(age < 45):
    return income[(gender, race, 35)]
  elif(age < 55):
    return income[(gender, race, 45)]
  elif(age < 65):
    return income[(gender, race, 55)]
  elif(age < 75):
    return income[(gender, race, 65)]
  else:
    return income[(gender, race, 75)]'''
		y.write(func)
		y.close()
	
def fill_death():
	with open("./stat_data/csv_sheets/death|age_gender.csv", "r+") as sheet:
		with open("./stat_data/death_table.py", "w+") as table:
			table.write("death = {")
			death = csv.reader(sheet)
			death.next()
			for row in death:
				table.write("(Male," + row[0] + ") : " + row[1] + ",\n")
				table.write("(Female," + row[0] + ") : " + row[2] + ",\n")
			table.write("0:0}\n\n")
			func = '''def get_death(gender, age):
	return death[(gender, age)]'''
			table.write(func)
			
fill_income()
fill_death()
