
""" return json of foreignkey  from views.py 
if comments_in_database.exists():
            all_comments_for_page = Comment.objects.filter(
                site__title=tagTitle).order_by('-publish')
            datac = list(all_comments_for_page)
            data_comm = serializers.serialize(datac)
            if datac:
                for comment in all_comments_for_page:
                    try:
                        if tagTitle in str(comment.site.title):
                            comments.append(comment)
                            t_order = comment.risposte.all().order_by('-publish')
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
    """