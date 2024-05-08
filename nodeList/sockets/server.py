# import socket
# import ssl
# import random
#
# # from django.shortcuts import render
# # from socket import *
# # from ssl import *
#
# # Create your views here.
#
# HOST = ""
# PORT = 50007
#
# def run_server():
#     context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#     context.load_cert_chain('server.crt', 'server.key')
#
#     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
#         sock.bind((HOST, PORT))
#         sock.listen()
#         print('서버가 시작되었습니다....')
#
#         with context.wrap_socket(sock, server_side=True) as s:
#             conn, addr = s.accept()
#             with conn:
#                 answer = random.randint(1, 9)
#                 print(f'클라이언트가 접속했습니다:{addr},정답은 {answer} 입니다.')
#                 while True:
#                     data = conn.recv(1024).decode('utf-8')
#                     print(f'데이터:{data}')
#
#                     try:
#                         n = int(data)
#                     except ValueError:
#                         conn.sendall(f'입력값이 올바르지 않습니다:{data}'.encode('utf-8'))
#                         continue
#
#                     if n == 0:
#                         conn.sendall(f"종료".encode('utf-8'))
#                         break
#                     if n > answer:
#                         conn.sendall("너무 높아요".encode('utf-8'))
#                     elif n < answer:
#                         conn.sendall("너무 낮아요".encode('utf-8'))
#                     else:
#                         conn.sendall("정답".encode('utf-8'))
#                         break

import socket

# 서버 설정
host = "70.12.246.176"  # 서버의 IP 주소 또는 도메인 이름
port = 52736       # 포트 번호

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
                        continue

                    # 요청 파싱
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
