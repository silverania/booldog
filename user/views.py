from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.conf import settings
from django.template import RequestContext
from django.core.exceptions import ObjectDoesNotExist
from .forms import UserEditForm, ProfileEditForm
from .models import Profile
from blog.models import Site
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.contrib.auth import login, logout, authenticate
from .forms import SignUpForm, LoginForm
from django.template.context_processors import csrf
from django.http import HttpResponse, JsonResponse
from django.views import View
import json
from urllib.parse import urlsplit
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib import messages
from django.contrib.sessions.models import Session
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.utils.translation import gettext as _
import os

scrollTo = ""
Group = Group.objects.all()


def getUser(user):
    list_current_user = []
    firstName = str(user)
    current_user = Profile.objects.filter(first_name=firstName)
    list_current_user = list(current_user)
    list_current_user = serializers.serialize("json", list_current_user)
    return list_current_user


@csrf_exempt
def checkUser(request):
    if request.method == "POST":
        login = getUser(request.user) if request.user.is_authenticated else "false"
        myuser = object()
        authorized = False
        list_json_user_data = json.loads(request.body)
        for key, value in list_json_user_data.items():
            if "mainurl" in key:
                currentUrl = value
                mydomain = urlsplit(currentUrl, allow_fragments=True)
                mydomain = mydomain.hostname
            if "authorized" in key:
                try:
                    if authorized is True or Site.objects.filter(
                        title__icontains=mydomain
                    ):
                        request.session["authorized"] = True
                        authorized = "True"
                        login = str(login)
                        return JsonResponse(
                            {"authorized": authorized, "authenticated": login}
                        )
                    else:
                        return HttpResponse("you are not authorized to use Booldog !")
                except ObjectDoesNotExist:
                    return render(request, "wrongdati.html")

    """
    def get(self, request):
        print("view checuser GET request.user & session is =" +
              str(request.user.is_authenticated)+"____"+str(request.session))
        print("is AUT IN GET ? "+str(self.request.user.is_authenticated))
        sessions = Session.objects.filter(expire_date__gte=timezone.now())
        user_id_list = []
        # build list of user ids from query
        return HttpResponse("ok get for none ! ")

        def getLoggedUsers():
            print("in dispatch getLoggedUSer request.user is ="+str(request.user))
            for session in sessions:
                data = session.get_decoded()
                # if the user is authenticated
                if data.get('_auth_user_id'):
                    user_id_list.append(data.get('_auth_user_id'))
                logged_in_users = Profile.objects.filter(id__in=user_id_list)
            list_of_logged_in_users = [
                {profile.id: profile.first_name} for profile in logged_in_users]
            return list_of_logged_in_users
        print(str(key)+str(value)+str(getLoggedUsers()))
        return JsonResponse({key: value, 'loggedUsers': getLoggedUsers()})

    def dispatch(self, request, *args, **kwargs):
        if request.method == 'GET':
            print("in dispatch GET request.user is ="+str(request.user))
            return self.get(request)
        elif request.method == 'POST':
            # cv = request.body
            # print("from dispatch method :"+str(cv))
            print("in dispatch POST request.user is ="+str(request.user))
            return self.post(self.request)
    """


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


def getUrlRequest(request):
    urls = request.build_absolute_uri()
    return urls


def user_login(request):
    authorized = request.session["authorized"]
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST["username"]
            password = request.POST["password"]
            currentUrl = request.POST["mainurl"]
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                # return redirect(valuenext)
                # form is not valid or user is not authenticated
                response = render(
                    request,
                    "booldog.html",
                    {
                        "authorized": authorized,
                        "currentUrl": currentUrl,
                    },
                )
                return response
            else:
                return render(request, "wrongdati.html", {"currentUrl": currentUrl})
    elif request.method == "GET":
        form = LoginForm()
        if "mainurl" in request.GET:
            currentUrl = request.GET.get("mainurl")
            return render(
                request,
                "registration/login.html",
                {
                    "form": form,
                    "currentUrl": currentUrl,
                },
            )
        else:
            return render(request, "registration/login.html")

    """ per cambiare password """
    """
    if 'blog' in request.get_full_path():
             scrollTo = "#footer"
            if 'next' in request.GET:
                valuenext = request.GET.get('next')+scrollTo
                subject = 'welcome to GFG world'
                message = 'Hi mario, thank you for registering in geeksforgeeks.'
                email_from = settings.EMAIL_HOST_USER
                recipient_list = ["info.strabbit@gmail.com", ]
                # send_mail(subject, message, email_from, recipient_list)
            myuser = None
            print("view: user_login , GET method......valuenext="+valuenext)
            """


@login_required
def home(request):
    return render(request, "compilare_il_kernel.html")


@login_required
def dashboard(request):
    return render(request, " user/dashboard.html", {"section": "dashboard"})


class Logout(View):
    def post(self, request, *args, **kwargs):
        currentUrl = request.POST["mainurl"]
        logout(request)
        return render(
            request,
            "booldog.html",
            {"currentUrl": currentUrl, "authorized": "True"},
        )
    def get(self, request, *args, **kwargs):
        if "mainurl" in request.GET:
            mainurl = request.GET.get("mainurl")
            # return render(request, "seiuscito.html", {'valuenext': mainurl})
        logout(request)
        return render(
            request,
            "booldog.html",
            {"currentUrl": mainurl, "authorized": "True"},
        )


def user_register(request):
    valuenext = ""
    if request.method == "POST":
        form = SignUpForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            username = form.cleaned_data.get("username")
            user.profile.photo = request.FILES["photo"]
            user.profile.first_name = username
            user.profile.email = form.cleaned_data.get("email")
            user.profile.website = form.cleaned_data.get("website")
            split_url = urlsplit(user.profile.website)
            try:
                if split_url.hostname:
                    myhostname = split_url.hostname
                else:
                    myhostname = ""
                if split_url.path:
                    mypath = split_url.path
                else:
                    mypath = ""
                basesite = myhostname + mypath
            except TypeError:
                print(" ERRORE : non è possibile creare basesite")
            # user.profile.website = titleSite.scheme + "://" + titleSite.netloc
            if "blog" in request.path:
                valuenext = request.GET.get("mainurl")
                # agiungere i permessi per leggere i propri post dall adminpage
                user.save()
                return redirect("/user/login/blog?mainurl=" + valuenext)
            elif "booldog" in request.path:
                site = Site.objects.create(title=basesite, user=user.profile)
                site.save()
                group = Group.get(name="BlogAdmin")
                user.groups.add(group)
                print("myuser" + str(user) + "aggiunto al gruppo blogadmin ")
                user.is_staff = True
                user.save()
                # mostra messaggio e esci
                # responsetext = _("you are authorized to use booldog .")
                # responsetext2 = _(
                #   "Enter your username and password in the bldg.js file and you are ready to use booldog on your site"
                # )
                # return HttpResponse(
                #   "<h1>" + responsetext + "</h1><h2>" + responsetext2 + "</h2>"
                # )
                return render(
                    request, "register_done.html", {"new_user": user.profile.first_name}
                )
                #   "<h1>" + responsetext + "</h1><h2>" + responsetext2 + "</h2>"
                # )
            else:
                if "next" in request.GET:
                    valuenext = request.GET.get("mainurl")
                    user.save()
                    return redirect("/user/login?mainurl=" + valuenext)
                else:
                    user.save()
                    return redirect("/user/login")
            if "next" in request.GET:
                valuenext = request.GET.get("next") + scrollTo
                subject = "booldog"
                message = "user e password"
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [
                    "info.strabbit@gmail.com",
                ]
                send_mail(subject, message, email_from, recipient_list)
        else:
            response = render(request, "user/register.html", {"form": form})
            return response
    else:
        # in base alla presenza della variabile next capisco
        # se la richiesta di registrazione è per installare il Blog
        # oppure per usarlo
        form = SignUpForm()
        if "mainurl" in request.GET:
            valuenext = request.GET.get("mainurl")
            response = render(
                request, "user/register.html", {"form": form, "mainurl": valuenext}
            )
        else:
            response = render(request, "user/register.html", {"form": form})
        return response


def change_password(request):
    authorized = request.session["authorized"]
    if request.method == "POST":
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            authorized = request.session["authorized"]
            if "mainurl" in request.POST:
                mainurl = request.POST.get("mainurl")
                return render(
                    request,
                    "registration/pass_changed_done.html",
                    {
                        "currentUrl": mainurl,
                        "authorized": authorized,
                    },
                )
        else:
            return render(request, "wrongdati.html", {"currentUrl": mainurl})
    else:
        if "mainurl" in request.GET:
            mainurl = request.GET.get("mainurl")
        form = PasswordChangeForm(request.user)
        return render(
            request,
            "change_password.html",
            {
                "form": form,
                "currentUrl": mainurl,
                "authorized": authorized,
            },
        )


@login_required
def edit(request):
    print("request=" + str(request))
    if request.method == "POST":
        user_form = UserEditForm(instance=request.user, data=request.POST)
        profile_form = ProfileEditForm(
            instance=request.user.profile, data=request.POST, files=request.FILES
        )
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileEditForm(instance=request.user.profile)
    return render(
        request, "edit.html", {"user_form": user_form, "profile_form": profile_form}
    )
