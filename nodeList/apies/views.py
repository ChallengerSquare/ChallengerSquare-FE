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
    node.IP = data['IP']
    node.PORT = data['PORT']
    # todo: 쿼리셋으로 IP, PORT를 조건으로 검색해서 DB에 값이 있는지 조회
    # IP와 PORT를 기준으로 Node 객체 검색
    node, created = Node.objects.get_or_create(IP=data['IP'], PORT=data['PORT'], defaults={
        'ADD_DATE': datetime.datetime.now(),
        'LAST_CONN_DATE': datetime.datetime.now()
    })
    # todo: 값이 없으면 새로 등록
    # todo: 값이 있으면 그 row의 LAST_CONN_DATE를 now()로 변경
    if not created:
        # Node 객체가 이미 존재하면 LAST_CONN_DATE를 현재 시각으로 업데이트
        node.LAST_CONN_DATE = datetime.datetime.now()
        node.save()
    # node.ADD_DATE = datetime.datetime.now()
    # node.LAST_CONN_DATE = datetime.datetime.now()
    # node.save()
    return Response(data)


@api_view(['GET'])
def listNodes(request):
    # todo : 무작위 랜덤 추출 추가
    nodes = Node.objects.all()
    serializer = serializers.NodeSerializer(nodes, many=True)
    return Response({'nodes': serializer.data})


@api_view(['GET'])
def getNodeCount(request):
    # 참여 중인 노드의 총 개수 계산
    node_count = Node.objects.count()
    return Response({"result": node_count})


@api_view(['GET'])
def getNetworkStatus(request):
    try:
        # 네트워크 상태를 확인하는 로직을 추가할 수 있습니다.
        # 현재는 에러가 없음을 가정하고 "GOOD"을 반환합니다.
        return Response({"result": "GOOD"})
    except Exception as e:
        return Response({"status": "ERROR", "detail": str(e)}, status=500)
