from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from . import views
urlpatterns = [
    path('connect', views.connectNode),  # 노드 연결 요청
    path('list', views.listNodes),
    path('getNodeCount', views.getNodeCount, name='getNodeCount')
]