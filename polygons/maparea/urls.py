from django.conf.urls import patterns, url

from maparea import views

urlpatterns = patterns('',
                       url(r'^$', views.index , name ='index'),
                       url(r'^login', views.login_view, name = 'login'),
                       url(r'^logout', views.logout_view, name = 'logout'),
                       url(r'^query', views.query, name = 'query'),
                       url(r'^savepolygon', views.savePolygons, name = 'savepolygons'),
                       url(r'^(?P<username>[a-z]+)/$', views.get_user_polygons, name='getpolygons'),
                       url(r'^polygons/all', views.all_pollygons, name='polygons')
                       )