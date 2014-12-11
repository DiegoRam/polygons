Polygons
========

This is a simple application that allow user to create custom areas on a google map.
Besides, you can ask to the app whether an specific point already belongs to an area. Just by click on the map


## Installation

* First of all you need to install virtualenv at your system and create a new one.

		$apt-get install python-pip
		$pip install virtualenv
* Once you installed those and activate the new environment properly, you need to install the proper packages:

		$pip install -r requeriments.txt
		
* Now, you need to check the database setting and run:

		$python manage.py migrate
		
* Since there is no registration process yet, you need to create a  superuser by:

		$python manage.py createsuperuser
		
* At last, you can use this super user to log in into the app. Or create new users via django built-in admin.

## Roadmap

* There is a lot of technical debts. Sorry for that.
* Currently, query page has no functionality.
* Create registration process.
* Add area deletion feature.
