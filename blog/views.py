import mimetypes
import os
from user.models import Profile
from blog.models import Comment, Resp, Site
from django.http import HttpResponse, JsonResponse
from django.utils import formats
from datetime import datetime
import json
from django.views import View
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.urls import reverse
from urllib.parse import urlsplit
import blog
from django.shortcuts import render

# from django.views.decorators.clickjacking import xframe_options_exempt

photo = ""
message = ""

formatted_datetime = formats.date_format(datetime.now(), "SHORT_DATETIME_FORMAT")

# @xframe_options_exempt


class Homepage(View):
    def get(self, request):
        if "page5" in request.path:
            booldogHtml = "prova.html"
        else:
            booldogHtml = "index.html"
        thissession = request.session.session_key
        response = render(request, "booldog.html")
        response.set_cookie("thissess", thissession)
        print("inviato cookie di sessione al client con ID = " + str(thissession))
        return render(request, booldogHtml)


def files(request, arg):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    filename = arg
    filepath = BASE_DIR + "/static/client/" + filename
    path = open(filepath, "r")
    mime_type, _ = mimetypes.guess_type(filepath)
    response = HttpResponse(path, content_type=mime_type)
    response["Content-Disposition"] = "attachment; filename=%s" % filename
    return response


class Booldog(View):
    def get(self, request):
        print("entry in booldog vieew")
        booldogHtml = "booldog.html"
        currentUrl = request.GET.get("mainurl")
        return render(request, booldogHtml, {"currentUrl": currentUrl})


class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Resp.__class__) or isinstance(obj, Site.__class__):
            return str(obj)
        return super().default(obj)


def getLoginName(request):
    if request.user.is_authenticated:
        myuser = Profile.objects.filter(user_id=request.user.id)
    else:
        myuser = Profile.objects.filter(first_name="anonimo")
        #    myuser.photo = settings.MEDIA_URL+"images/user-secret-solid.gif"
    return myuser


def serializer(data):
    datas = serializers.serialize(
        "json",
        data,
        cls=LazyEncoder,
        # safe=False,
        use_natural_primary_keys=True,
        use_natural_foreign_keys=True,
    )
    return datas


def getPost(request):
    print("GETPOST ENTRY")
    global formatted_datetime
    # token_generator = default_token_generator,
    data = ""
    t = []
    datac = []
    comments = []
    comments_in_database = Comment.objects.all()
    profiles = list(Profile.objects.all())
    profiles_list = serializer(profiles)
    t2 = []
    if "mainurl" in request.GET and request.GET["mainurl"]:
        tagTitle = str(request.GET.get("mainurl"))
        split_url = urlsplit(tagTitle)
        basesite=split_url.hostname+split_url.path
        if comments_in_database.exists():
            all_comments_for_page = Comment.objects.filter(
                site__title=basesite
            ).order_by("-publish")
            datac = list(all_comments_for_page)
            data_comm = serializer(datac)
            if datac:
                for comment in all_comments_for_page:
                    try:
                        if basesite in str(comment.site.title):
                            comments.append(comment)
                            t_order = comment.risposte.all().order_by("-publish")
                            t = list(t_order)
                    except Exception:
                        continue
                    try:
                        if t2 is not None:
                            t2 = t2 + t
                    except UnboundLocalError:
                        t2 = t
                    try:
                        t2 = list(t2)
                        risposte_serialized = serializer(t2)
                    except UnboundLocalError:
                        print("Nessun commento per la pagina !")
                data = json.dumps(
                    {
                        "data_comm": data_comm,
                        "resps": risposte_serialized,
                        "profiles": profiles_list,
                    }
                )
        else:
            data = json.dumps(
                {
                    "resps": [{"": ""}],
                    "data_comm": [{"": ""}],
                    "profiles": profiles_list,
                }
            )
    return JsonResponse(data, safe=False)


def newPost(request):
    postType = ""
    post = []
    getRespOrPostToAssignResp = []
    body = request.GET.get("body")
    author = request.GET.get("username")
    author = Profile.objects.get(first_name=author)
    rootSite = request.GET.get("mainurl")
    split_url = urlsplit(rootSite)
    basesite=split_url.hostname+split_url.path
    siteadminuser=Site.objects.get(title=basesite)
    site,created = Site.objects.get_or_create(title=basesite,user=Profile.objects.get(first_name=siteadminuser.user))
    # check site authorization
    postType = request.GET.get("type")
    if "newpost" in postType:
        post = blog.models.Comment()
        post.postType = "post"
    else:
        post = blog.models.Resp()
        respToProfile = request.GET.get("respToUser")
        respToProfile = Profile.objects.get(first_name=respToProfile)
        post.respToUser = respToProfile
        post.idRespTo = request.GET.get("respTo")
        commento = request.GET.get("commento")
        comment = Comment.objects.get(pk=commento)
        post.commento = comment
        respToType = request.GET.get("respToType")
        if "respToResp" in respToType:
            post.postType = "respToResp"
            getRespOrPostToAssignResp = Resp.objects.get(pk=post.idRespTo)
        elif "respToPost" in respToType:
            getRespOrPostToAssignResp = Comment.objects.get(pk=commento)
            post.commento = getRespOrPostToAssignResp
    post.site = site
    post.slug = post.site.title.replace("/", "")
    post.slug = post.site.title.replace(":", "")
    post.author = author
    # post.site.user = myuser
    post.publish = datetime.now()
    post.created = post.publish
    post.body = body
    post.save()
    typeIs = str(type(getRespOrPostToAssignResp))
    if "Resp" in typeIs:
        getRespOrPostToAssignResp.resps.add(post)
    return HttpResponse("post inserito")


def retReverse(name):
    return reverse("blog:" + name)
