import socket


# 자신의 IP 주소를 확인하는 함수
def check_ip():
    print(socket.gethostbyname(socket.gethostname()))
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect(('www.google.com', 443))
        print(sock.getsockname()[0])
        return sock.getsockname()[0]

# 52730 ~ 52760까지의 포트 중에 사용 가능한 포트를 선택
def check_port():
    for port in range(52730, 52760):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            try:
                sock.bind(('', port))
                print(port)
                return port
            except socket.error:
                continue

# 서버 설정
host = check_ip() # 서버의 IP 주소 또는 도메인 이름
port = check_port() # 포트 번호


def send_chain(IP, PORT, chain):
    print(str(IP) + ':' + str(PORT) + ' 에 요청을 보낼 게요')
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
            client_socket.connect((IP, PORT))
            name = "chain"
            message = chain
    except ConnectionRefusedError:
        print("연결을 거부당했습니다. 서버가 실행 중인지 확인해주세요.")

def run_server():
    # 서버 소켓 생성 및 바인딩, 리스닝
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.bind((host, port))
        server_socket.listen(5)
        print(f"서버가 {host}:{port}에서 대기 중입니다...")
        while True:
            # 클라이언트 연결 대기
            client_socket, client_address = server_socket.accept()
            with client_socket:
                print(f"클라이언트 {client_address}가 연결되었습니다.")

                try:
                    # 클라이언트로부터 요청 받기
                    data = client_socket.recv(1024).decode("utf-8")
                    if not data:
                        continue    # 데이터가 없으면 하트비트로 간주

                    # todo : 나중에 여기서 요청을 파싱함
                    parts = data.split("&&")
                    if len(parts) >= 2:
                        name = parts[0]
                        message = parts[1]
                        response = f"어서와! {name}"

                        # 클라이언트 이름과 메시지 출력
                        print(f"클라이언트 이름: {name}")
                        print(f"클라이언트 메시지: {message}")
                    else:
                        response = "유효하지 않은 요청"

                    # 응답 클라이언트에게 전송
                    client_socket.send(response.encode("utf-8"))

                except Exception as e:
                    print(f"오류 발생: {e}")
                    # 오류 메시지를 클라이언트에게 전송할 수 있습니다.
                    client_socket.send(f"오류 발생: {str(e)}".encode("utf-8"))

                finally:
                    # 클라이언트 소켓 닫기는 with 문에 의해 자동으로 처리됩니다.
                    print("연결종료")