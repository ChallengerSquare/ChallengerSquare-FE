from django.shortcuts import render
from socket import *
from ssl import *
# Create your views here.

host = "127.0.0.1"
port = 5000

serverSocket = socket(AF_INET, SOCK_STREAM)