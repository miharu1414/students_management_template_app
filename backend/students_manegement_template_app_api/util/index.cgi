#!/usr/local/bin/python

from wsgiref.handlers import CGIHandler
from helloFlask import app
CGIHandler().run(app)