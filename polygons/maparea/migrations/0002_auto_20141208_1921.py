# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maparea', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='polygon',
            name='polygon',
        ),
        migrations.AddField(
            model_name='polygon',
            name='points',
            field=models.CharField(default='', max_length=500),
            preserve_default=False,
        ),
    ]
