from rest_framework import serializers
from .models import Node

class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = ['ID', 'IP', 'PORT', 'LAST_CONN_DATE']