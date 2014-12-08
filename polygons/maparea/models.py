from django.db import models
import ast

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
        jsonstr = "["
        for pair in ast.literal_eval(self.points):
            jsonstr += '{"lat": ' + str(pair[0]) + ', "lng": ' + str(pair[1]) + '},'

        return jsonstr[:len(jsonstr)-1] + "]"
