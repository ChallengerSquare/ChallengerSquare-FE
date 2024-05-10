import requests

# 노드 리스트 서버에 자기 노드를 등록
def connect(ip, port):
    datas = {"IP" : ip, "PORT" : port}
    requests.post('http://127.0.0.1:8000/api/connect', json=datas)

# 노드 리스트 서버에 있는 노드들의 목록을 가져옴
def list():
    r = requests.get('http://127.0.0.1:8000/api/list')