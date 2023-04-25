# Generated by Django 4.1.2 on 2023-04-24 11:32

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='...', max_length=100, null=True)),
                ('slug', models.SlugField(blank=True, max_length=250, null=True)),
                ('body', models.TextField()),
                ('publish', models.DateTimeField(default=django.utils.timezone.now)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('postType', models.CharField(default='post', max_length=10)),
                ('status', models.CharField(choices=[('rigettato', 'Rigettato'), ('publicato', 'Publicato')], default='bozza', max_length=10)),
                ('tagTitleInPage', models.CharField(default='tag_value', max_length=100)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='blog_posts', to='user.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Site',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=250, null=True)),
                ('slug', models.SlugField(blank=True, max_length=250, null=True)),
                ('titleTagContent', models.CharField(default='empty', max_length=200)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sites', to='user.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Resp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('publish', models.DateTimeField(default=django.utils.timezone.now)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('idRespTo', models.CharField(default='0_0', max_length=50)),
                ('postType', models.CharField(choices=[('respToPost', 'respToPost'), ('respToResp', 'respToResp')], default='respToPost', max_length=10)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resps', to='user.profile')),
                ('commento', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='risposte', to='blog.comment')),
                ('respToUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userResps', to='user.profile')),
                ('resps', models.ManyToManyField(blank=True, to='blog.resp')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='all_resps', to='blog.site')),
            ],
            options={
                'ordering': ('publish',),
            },
        ),
        migrations.AddField(
            model_name='comment',
            name='site',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='all_comments', to='blog.site'),
        ),
        migrations.AlterUniqueTogether(
            name='comment',
            unique_together={('author', 'created')},
        ),
    ]