import socket
from apies import connect
import json

from blockchain import Blockchain


# 자신의 IP 주소를 확인하는 함수
def check_ip():
    print(socket.gethostbyname(socket.gethostname()))
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect(('www.google.com', 443))
        print(sock.getsockname()[0])
        return sock.getsockname()[0]

# 52730 ~ 52760까지의 포트 중에 사용 가능한 포트를 선택해서 반환
def check_port():
    for port in range(52730, 52760 + 1):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            try:
                sock.bind((host, port))
                print(f"Port {port} is available.")
                return port
            except OSError as e:
                print(f"Port {port} is not available: {e}")
                continue

# 서버 설정
host = "127.0.0.1" # 서버의 IP 주소 또는 도메인 이름
port = check_port() # 포트 번호

def request_chain(IP, PORT):
    print(str(IP) + ':' + str(PORT) + ' 에 요청을 보낼 게요')
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
            client_socket.connect((IP, PORT))
            message = {
                'type': 'chain_requst',
                'data': 'please'
            }
            # JSON 객체를 문자열로 인코딩
            encoded_message = json.dumps(message).encode('utf-8')
            # 데이터 전송
            client_socket.sendall(encoded_message)

            response = client_socket.recv(1024).decode("utf-8")
            print(response)

    except ConnectionRefusedError:
        print("연결을 거부당했습니다. 서버가 실행 중인지 확인해주세요.")

def get_chain():
    # print(str(IP) + ':' + str(PORT) + ' 에 요청을 보낼 게요')
    # try:
    #     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
            # client_socket.connect((IP, PORT))
    blockchain = Blockchain.get_blockchain()
    message = {
        'type': 'chain',
        'data': blockchain.chain
    }

    # JSON 객체를 문자열로 인코딩
    encoded_message = json.dumps(message).encode('utf-8')
    return encoded_message
            # 데이터 전송
            # client_socket.sendall(encoded_message)
    # except ConnectionRefusedError:
    #     print("연결을 거부당했습니다. 서버가 실행 중인지 확인해주세요.")

def send_block(IP, PORT, block):
    print(str(IP) + ':' + str(PORT) + ' 에 요청을 보낼 게요')
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
            client_socket.connect((IP, PORT))
            message = {
                'type': 'new_block',
                'data': block
            }

            # JSON 객체를 문자열로 인코딩
            encoded_message = json.dumps(message).encode('utf-8')

            # 데이터 전송
            client_socket.sendall(encoded_message)
    except ConnectionRefusedError:
        print("연결을 거부당했습니다. 서버가 실행 중인지 확인해주세요.")

def run_server():
    # 서버 소켓 생성 및 바인딩, 리스닝
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        print(f"Port {port} 에 연결을 시도할게요")
        server_socket.bind((host, port))
        server_socket.listen(5)
        print(f"서버가 {host}:{port}에서 대기 중입니다...")
        connect(host, port)
        while True:
            # 클라이언트 연결 대기
            client_socket, client_address = server_socket.accept()
            with client_socket:
                client_ip, client_port = client_address  # 주소 파싱
                print(f"클라이언트 {client_address}가 연결되었습니다.")
                try:
                    # 클라이언트로부터 요청 받기
                    data = client_socket.recv(1024).decode("utf-8")
                    # todo : 나중에 여기서 요청을 파싱함
                    if not data:
                        continue    # 데이터가 없으면 하트비트로 간주
                    received_data = json.loads(data)
                    # 메시지 유형에 따라 다른 동작 수행
                    if received_data['type'] == 'new_block':
                        print("새로운 블록 수신:")
                        print(json.dumps(received_data['data'], indent=4))
                        # 1. 블록이 추가 가능한지 확인
                        # 2. 추가 가능하면 끝에 추가
                        # 3. 추가 불가능하면 노드들에게 체인 요청

                    elif received_data['type'] == 'chain':
                        print("새로운 체인 수신:")
                        print(json.dumps(received_data['data'], indent=4))
                        # 1. replace_chain 진행
                    elif received_data['type'] == 'chain_requst':
                        client_socket.sendall(get_chain())

                    # client_socket.send(response.encode("utf-8"))

                except Exception as e:
                    print(f"오류 발생: {e}")
                    # 오류 메시지를 클라이언트에게 전송할 수 있습니다.
                    client_socket.send(f"오류 발생: {str(e)}".encode("utf-8"))

                finally:
                    # 클라이언트 소켓 닫기는 with 문에 의해 자동으로 처리됩니다.
                    print("연결종료")