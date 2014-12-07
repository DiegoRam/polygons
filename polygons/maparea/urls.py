from django.conf.urls import patterns, url

from maparea import views

urlpatterns = patterns('',
                       url(r'^$', views.index , name ='index'),
                       )