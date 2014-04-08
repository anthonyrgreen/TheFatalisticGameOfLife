from django.http import HttpResponse

def mainpage(request):

	return HttpResponse("Hello, world.")