from django.shortcuts import render, redirect
from django.contrib.auth import logout, authenticate, login
import logging

logger = logging.getLogger(__name__)

def index(request):
    if request.user.is_authenticated():
        logger.debug('request autheticated')
        print 'request authenticated'
        context = {'username': request.user.username}
        return render(request, 'maparea/index.jade', context)
    else:
        return redirect('/maparea/login')


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


def logout_view(request):
    logout(request)
    return redirect('/maparea/login')
