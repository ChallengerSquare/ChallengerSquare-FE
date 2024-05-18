import socket
from django.utils import timezone
from apies.models import Node
from apies.serializers import NodeSerializer
def signal(IP, PORT):
    # print(str(IP) + ':' + str(PORT) + ' 에 요청을 보낼 게요')
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
            client_socket.connect((IP, PORT))
            # reader, writer = await asyncio.open_connection(IP, PORT)

            # 데이터 전송
            name = 'name'
            message = 'message'
            # nodes = Node.objects.all()
            # serializer = NodeSerializer(nodes, many=True)

            request = f"{name}&&{message}"
            client_socket.send(request.encode("utf-8"))

            # 서버로부터 응답 받기
            response = client_socket.recv(1024).decode("utf-8")
            print(f"{name} : {message}")
            print(f"서버 : {response}\n")

            node = Node.objects.get(IP=IP, PORT=PORT)
            node.LAST_CONN_DATE = timezone.now()
            node.save()

            # with 문이 끝나면 자동으로 클라이언트 소켓이 닫힘
    except ConnectionRefusedError:
        print("연결을 거부당했습니다. 서버가 실행 중인지 확인해주세요.")

        # 데이터베이스 업데이트: DELETE_DATE
        try:
            node = Node.objects.get(IP=IP, PORT=PORT)
            node.DELETE_DATE = timezone.now()
            node.save()
        except Node.DoesNotExist:
            print(f"{IP}:{PORT}에 해당하는 노드가 데이터베이스에 존재하지 않습니다.")