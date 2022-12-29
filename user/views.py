from django.shortcuts import render
from django.contrib.auth.tokens import default_token_generator
from .forms import UserEditForm, ProfileEditForm
from .models import Profile
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.contrib.auth import login, logout, authenticate
from .forms import SignUpForm
from django.template.context_processors import csrf
from django.http import HttpResponse, JsonResponse
from django.views import View
import json
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm

scrollTo = ''
Group = Group.objects.all()


def getUser(user):
    list_current_user = []
    firstName = str(user)
    current_user = Profile.objects.filter(first_name=firstName)
    list_current_user = list(current_user)
    list_current_user = serializers.serialize(
        "json", list_current_user)
    return list_current_user


class checkUser(View):
    def post(self, request):
        login = getUser(request.user) if request.user.is_authenticated else None
        myuser = object()
        authorized = False
        list_json_user_data = json.loads(request.body)
        for key, value in list_json_user_data.items():
            print(key)
            if 'user' in key:
                myuser = value
            if 'password' in key:
                password = value
            if 'currentUrl' in key:
                currentUrl = value
        if not isinstance(myuser, User):
            try:
                myuser = authenticate(username=myuser, password=password)
                if myuser is not None:
                    list_current_user = getUser(myuser)
                    firstName = str(myuser)
                    currentUser = Profile.objects.get(first_name=firstName)
                    if 'blog' in request.get_full_path():
                        if not str(currentUser.website) in currentUrl:
                            print("nessun autorizzazione concessa !")
                            raise Exception(
                                "sito Web non autoriazzato o assente in fase di registrazione")
                        else:
                            authorized = True
                else:
                    myuser = "None"
                    list_current_user = myuser
                if not myuser.groups.filter(name__in=['BlogAdmin']).exists():
                    group = Group.get(name='BlogAdmin')
                    myuser.groups.add(group)
            except Exception:
                print("Errore nel autenticazione dell user , e/o nella sua assegnazione"
                      + "al gruppo BlogAdmin")
                myuser = "None"
                list_current_user = myuser
                print("77 "+str(list_current_user))
        else:
            list_current_user = getUser(myuser)
            print("86 "+str(list_current_user))
        data = json.dumps(
            {
                "authorized": authorized,
                "userLoggedIN": list_current_user,
                "authenticated": request.user.is_authenticated,
            })
        print(str(JsonResponse(data, safe=False)))
        response = JsonResponse(
            data, safe=False
        )
        return response

    def get(self, request):
        print(request.user.is_authenticated)
        c = {}
        c.update(csrf(request))
        for key, value in c.items():
            key = str(key)
            value = str(value)
        print(str(key)+str(value))
        return JsonResponse({key: value})

    def dispatch(self, request, *args, **kwargs):
        if request.method == 'GET':
            return self.get(request)
        elif request.method == 'POST':
            #cv = request.body
            #print("from dispatch method :"+str(cv))
            return self.post(request)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def getUrlRequest(request):
    urls = request.build_absolute_uri()
    return urls


def user_login(request):
    if request.method == 'POST':
        print(str(request.user.is_authenticated))
        if request.user.is_authenticated:
            print("user autenticato !")
            print("is POST !!!!!!!!!!!!!")
            dataJson = ({'authenticated': 'True'})
            dataJson = dataJson = ({'user': str(request.user)})
            response = HttpResponse(dataJson)
        else:
            thisJson = ''
            user = ''
            user_token = ""
            password = ''
            token = ''
            # print('Raw Data: "%s"' % request.body)
            thisUser = json.loads(request.body)
            user = thisUser['user']
            password = thisUser['password']
            requestSite = thisUser['requestSite']
            # if 'HTTP_X_CSRFTOKEN' not in request.META:
            #    return HttpResponse('connessione non permessa')
            #else:
            #    token = request.META.get('HTTP_X_CSRFTOKEN')
            #breakpoint()
            myuser = authenticate(username=user, password=password)
            # if type(myuser) is User and myuser.is_authenticated:

            login(request, myuser)
            user_token = default_token_generator.make_token(myuser)
            dataJson = ({'user': str(request.user), 'authenticated': request.user.is_authenticated})
            response = HttpResponse(json.dumps(dataJson))
            response.set_cookie('t_sacc_gia', user_token)
            print("Login well done"+str(request.user.is_authenticated))
            dataDictionary = {'userLoggedIN': str(request.user)}
            dataJson = json.dumps(dataDictionary)
            # return HttpResponse(template, {'data': dataJson})
            return response
    else:
        if request.user.is_authenticated:
            print("user autenticato !")
        c = {}
        c.update(csrf(request))
        for key, value in c.items():
            key = str(key)
            value = str(value)
        return JsonResponse({key: value})


@login_required
def home(request):
    return render(request, 'compilare_il_kernel.html')


@login_required
def dashboard(request):
    return render(request, ' user/dashboard.html', {'section': 'dashboard'})


class Logout(View):
    def get(self, request):
        global userLoggedIN
        logout(request)
        userLoggedIN = None
        if 'next' in request.GET:
            print("next in request !")
            next = request.GET.get('next')
            template = "registration/logged_out.html"
            return redirect(next)
            #return render(request, "seiuscito.html", {'valuenext': next})
        return render(request, "seiuscito.html", {'valuenext': next})


def user_register(request):
    valuenext = ""
    if request.method == 'POST':
        form = SignUpForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user.profile.photo = form.cleaned_data.get('photo')
            user.profile.first_name = username
            user.profile.website = form.cleaned_data.get('website')
            if 'bloguser' in request.path:
                valuenext = request.GET.get('next')
                user.save()
                return redirect('/user/login/blog?next='+valuenext)
            elif 'blog' in request.path:
                group = Group.get(name='BlogAdmin')
                user.groups.add(group)
                print('myuser'+str(user)
                      + "aggiunto al gruppo blogadmin ")
                user.is_staff = True
                user.save()
                # mostra messaggio e esci
                return HttpResponse("<h1>sei autorizzato ad usare webTalk ! </h1><h2>inserisci user e password nei tag Html del tuo sito . </h2>")
            else:
                if 'next' in request.GET:
                    valuenext = request.GET.get('next')
                    user.save()
                    return redirect('/user/login?next='+valuenext)
                else:
                    user.save()
                    return redirect('/user/login')

    else:
        # in base alla presenza della variabile next capisco
        # se la richiesta di registrazione è per installare il Blog
        # oppure per usarlo
        if 'next' in request.GET:
            valuenext = request.GET.get('next')
        form = SignUpForm()
    return render(request, 'user/register.html', {'form': form, 'next': valuenext})


def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            if 'next' in request.GET:
                valuenext = request.GET.get('next')
                return render(request, "registration/pass_changed_done.html", {'valuenext': valuenext})
        else:
            return HttpResponse("errore nei dati inseriti !")
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'change_password.html', {'form': form})


@ login_required
def edit(request):
    print("request="+str(request))
    if request.method == 'POST':
        user_form = UserEditForm(instance=request.user,
                                 data=request.POST)
        profile_form = ProfileEditForm(
            instance=request.user.profile, data=request.POST, files=request.FILES)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileEditForm(
            instance=request.user.profile)
    return render(request, 'edit.html', {'user_form': user_form, 'profile_form': profile_form})
