from django.shortcuts import render, redirect
from django.contrib.auth import logout, authenticate, login
import logging

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
    context = {'username': request.user.username}
    return render(request, 'maparea/index.jade', context)


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

