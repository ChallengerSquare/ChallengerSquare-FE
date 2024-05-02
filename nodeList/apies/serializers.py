from rest_framework import serializers
from .models import Node

class NodeSerializer(serializers.ModelSerializer):
    class Node:
        model = Node
        fields = ['ID', 'ADDR', 'LAST_CONN_DATE']