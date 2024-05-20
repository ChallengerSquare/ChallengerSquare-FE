import requests
from blockchain import Blockchain

# 노드 리스트 서버에 자기 노드를 등록
def connect(ip, port):
    datas = {"IP" : ip, "PORT" : port}
    requests.post('http://43.203.254.28:8000/api/connect', json=datas, verify=False)

# 노드 리스트 서버에 있는 노드들의 목록을 가져옴
def list():
    r = requests.get('http://43.203.254.28:8000/api/list', verify=False)
    r.raise_for_status()  # 요청이 성공하지 않으면 예외를 발생시킴
    blockchain = Blockchain.get_blockchain()
    data = r.json()
    nodes = data.get('nodes', [])
    for node in nodes:
        node_tuple = frozenset(node.items())
        blockchain.nodes.add(node_tuple)


if __name__ == '__main__':
    blockchain = Blockchain.get_blockchain()
    # connect("127.0.0.1", 5000)
    # connect("127.0.0.1", 50002)
    # connect("127.0.0.1", 50003)
    # connect("127.0.0.1", 50004)
    list()
    nodes = blockchain.nodes
    for node in nodes:
        print(str(node))