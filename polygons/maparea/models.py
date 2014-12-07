from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=200)

    def __str__(self):
        return self.username


class Polygon(models.Model):
    user = models.ForeignKey(User)
    polygon = models.CharField(max_length=500)

    def __str__(self):
        return self.user.username + " " + self.polygon
