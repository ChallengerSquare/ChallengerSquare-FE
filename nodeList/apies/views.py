import json
import datetime
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Node
from django.http.response import HttpResponse
import requests

# Create your views here.

@api_view(['POST'])
def connectNode(request):
    node = Node()
    data = json.loads(request.body)
    node.ADDR = data['addr']
    node.ADD_DATE = datetime.datetime.now()
    node.LAST_CONN_DATE = datetime.datetime.now()
    node.save()