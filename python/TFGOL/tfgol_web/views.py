from django.shortcuts import render
from django.http import HttpResponse
from models import ZipCode, Job, WorksIn
from django.db.models import Sum
import json
import random
from tfgol_web.new_person import person

# Create your views here.


def randomZip():
	totalpop = ZipCode.objects.all().aggregate(Sum('population_thousands'))['population_thousands__sum']
	zips = ZipCode.objects.order_by('-population_thousands')
	rand = random.uniform(0,totalpop)
	running_sum = 0
	for cur_zip in zips:
		running_sum += cur_zip.population_thousands
		if rand < running_sum:
			return cur_zip


def mainpage(request):

	return render(request, 'index.html', { 'name': 'carl' })

def person_from_birth(request):
	average_joe = person()
	average_joe.from_womb()
	response = json.dumps(average_joe.life_data() )#, separators=(',', ': '))
	return HttpResponse(response, mimetype="application/json")

def person_from_midlife(request):
	data = json.loads(request.body)
	average_joe = person()
	average_joe.from_midlife(data)
	response = json.dumps(average_joe.life_data(), separators=(',', ': '))
	return HttpResponse(response, mimetype="application/json")

def aboutpage(request):
	return render(request, 'about.html',{})

def disclaimerpage(request):
	return render(request, 'disclaimer.html',{})
