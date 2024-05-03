import json
import datetime
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Node
from . import serializers
from django.http.response import HttpResponse
import requests

# Create your views here.

@api_view(['POST'])
def connectNode(request):
    node = Node()
    data = json.loads(request.body)
    node.ADDR = data['addr']
    # todo: IP 중복이면 저장 안하는 로직 추가하기
    node.ADD_DATE = datetime.datetime.now()
    node.LAST_CONN_DATE = datetime.datetime.now()
    node.save()
    # todo: 리턴 값 제대로 설정하기
    return Response(data)

@api_view(['GET'])
def listNodes(request):
    nodes = Node.objects.all()
    # print(nodes)
    serializer = serializers.NodeSerializer(nodes, many=True)
    return Response(serializer.data)