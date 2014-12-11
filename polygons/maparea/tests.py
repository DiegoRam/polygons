from django.test import TestCase
from maparea.models import User, Polygon

# Create your tests here.


class PolygonsTest(TestCase):

    def test_create_single_polygon(self):
        user = User(username='tasha')
        user.save()
        points = [(37.22,43.5678),(35,122)]
        polygon = Polygon(user=user, points=str(points))
        polygon.save()

        others = Polygon.objects.filter(user__username="tasha")
        self.assertIsNotNone(others)
        self.assertTrue(len(others[0].points) > 0)
        print others[0].get_points_list_to_json()
        self.assertTrue(len(others[0].get_points_list_to_json()) > 0)


