from django.conf.urls import patterns, include, url

from django.contrib import admin
from tfgol_web import views
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'TFGOL.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
	url(r'^about/', views.aboutpage),
	url(r'^disclaimer/', views.disclaimerpage),
	url(r'^roll/', views.person_from_birth,
	url(r'^reroll/', views.person_from_midlife)
    url(r'^', views.mainpage),
)
