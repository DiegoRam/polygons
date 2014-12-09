from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import logout, authenticate, login
import logging
from maparea.models import User, Polygon
import json
from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger(__name__)


def authenticated(method):
    """#Yes I know. But I dont know why the built-in django decorator itself is not working for me"""
    def wrapper(request):
        if request.user.is_authenticated():
            return method(request)
        else:
            return redirect('/maparea/login')

    return wrapper


@authenticated
def index(request):

    query = User.objects.filter(username__exact=request.user.username)

    if query is None or len(query) < 1:
        User(username=request.user.username).save()

    context = {'username': request.user.username}
    return render(request, 'maparea/index.jade', context)


def get_user_polygons(request, username):
    query = User.objects.filter(username__exact=username)
    if not query is None and len(query) > 0:
        polygons = Polygon.objects.filter(user__username__exact=username)
        if not polygons is None and len(polygons) > 0:
            str_polygons = '[' + ','.join([polygon.get_points_list_to_json() for polygon in polygons]) + ']'
            return HttpResponse(content=str_polygons, content_type='application/json')
        else:
            return HttpResponse(status=404, content="Polygon not found")
    else:
        return HttpResponse(status=404, content="User Not Found")



def login_view(request):
    if request.method == 'GET':
        return render(request, 'maparea/login.jade')

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/maparea')
        else:
            return redirect('maparea/login')


@authenticated
def query(request):
    context = {'username': request.user.username}
    return render(request, 'maparea/query.jade', context)


def logout_view(request):
    logout(request)
    return redirect('/maparea/login')

@csrf_exempt
def savePolygons(request):
    if request.method == 'POST':
        data = request.POST
        user = User.objects.filter(username__exact=request.user.username)
        if not user is None and len(user) > 0:
            points = []
            for i in range(len(data)):
                if not data.get('data['+str(i)+'][lat]') is None:
                    points.append((float(str(data.get('data['+str(i)+'][lat]'))), float(str(data.get('data['+str(i)+'][lng]')))))
            print 'points: ' + str(points)
            Polygon(user=user[0], points=str(points)).save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=403)


