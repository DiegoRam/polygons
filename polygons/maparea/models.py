from django.db import models
import ast
import json


# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=200)

    def __str__(self):
        return self.username


class Polygon(models.Model):
    user = models.ForeignKey(User)
    points = models.CharField(max_length=500)

    def __str__(self):
        return self.user.username + " " + self.polygon

    def get_points_list_to_json(self):
        polygon_dict = {}
        polygon_dict['username'] = self.user.username
        polygon_dict['locations'] = [{'lat': pair[0], 'lng': pair[1]} for pair in ast.literal_eval(self.points)]

        return json.dumps(polygon_dict)
