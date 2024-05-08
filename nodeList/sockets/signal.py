import socket
def signal(IP, PORT):
    print(str(IP) + '에 요청을 보낼 게요')
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
            client_socket.connect((IP, PORT))
            # reader, writer = await asyncio.open_connection(IP, PORT)

            # 데이터 전송
            name = "미니몬"
            message = "안녕, 서버!"

            request = f"{name}&&{message}"
            client_socket.send(request.encode("utf-8"))

            # 서버로부터 응답 받기
            response = client_socket.recv(1024).decode("utf-8")
            print(f"{name} : {message}")
            print(f"서버 : {response}\n")
            # with 문이 끝나면 자동으로 클라이언트 소켓이 닫힘
    except ConnectionRefusedError:
        print("연결을 거부당했습니다. 서버가 실행 중인지 확인해주세요.")