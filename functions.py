# filtra query in admin.py

class PostAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        query = super(PostAdmin, self).get_queryset(request)
        filtered_query = Comment.objects.none()
        profile = Profile.objects.get(user=request.user)
        site = Site.objects.filter(user=profile)
        for s in site.all():
            # mysite=Site.objects.get(user=)
            filtered_query |= query.filter(site=s)
            print(s.title)
        return query
    search_fields = ('body',)
    list_filter = ('slug', 'status', 'created', 'publish', 'author',)
    #prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'publish'
    ordering = ('status', 'publish')
    list_display = ('site', 'body', 'slug', 'created', 'publish', 'author')
