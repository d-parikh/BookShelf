from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_year = models.IntegerField()
    genre = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.title
