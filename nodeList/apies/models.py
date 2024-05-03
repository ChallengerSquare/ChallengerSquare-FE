from django.db import models

# Create your models here.
class Node(models.Model):
    ID = models.AutoField(primary_key=True)
    ADDR = models.CharField(max_length=30)
    ADD_DATE = models.DateTimeField(auto_now_add=True)
    DEL_DATE = models.DateTimeField(null=True, blank=True)
    LAST_CONN_DATE = models.DateTimeField(null=True, blank=True)