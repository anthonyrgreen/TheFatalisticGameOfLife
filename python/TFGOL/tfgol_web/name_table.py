import random

boy_names = ["Jacob","Mason","Ethan", "Noah", "William", "Liam", "Jayden", "Michael", "Alexander", "Aiden"]
girl_names = ["Sophia", "Emma", "Isabella", "Olivia", "Ava", "Emily", "Abigail", "Mia", "Madison", "Elizabeth"]

def get_name(gender):
	if(gender == "Male"):
		return random.choice(boy_names)
	else:
		return random.choice(girl_names)
