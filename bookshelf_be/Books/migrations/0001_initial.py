# Generated by Django 5.0 on 2023-12-24 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('author', models.CharField(max_length=255)),
                ('publication_year', models.IntegerField()),
                ('genre', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
