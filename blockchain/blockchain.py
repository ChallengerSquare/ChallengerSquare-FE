import datetime
import hashlib
import json
import uuid
from urllib.parse import urlparse

import requests


# Building a Blockchain

class Blockchain:
    _instance = None

    def __init__(self):
        if not Blockchain._instance:
            self.chain = []
            self.transactions = []
            self.nodes = set()
            self.create_block(proof=1, previous_hash='0')
            Blockchain._instance = self  # 인스턴스를 클래스 변수에 저장
        else:
            raise Exception("This class is a singleton!")
    # 블록 생성 함수
    '''
    :param proof: nonce의 역할을 함
    :param previous_hash: 이전 블록의 hash
    :return: 새로 생성된 블록
    '''

    @staticmethod
    def get_blockchain():
        if not Blockchain._instance:
            Blockchain._instance = Blockchain()
        return Blockchain._instance

    def create_block(self, proof, previous_hash):
        # define Block
        block = {'index': len(self.chain) + 1,  # 블록의 번호를 하나 증가
                 'timestamp': str(datetime.datetime.now()),  # 블록 생성 시점
                 'proof': proof,  # nonce 값
                 'previous_hash': previous_hash,  # 이전 블록의 hash값
                 'transactions': self.transactions[:]}  # 트랜잭션 목록을 가져와서 블록의 데이터로 넣음

        self.chain.append(block)  # 체인에 새로운 블록 추가
        # clear transactions after create block
        self.transactions.clear()  # 트랜잭션 멤풀 비우기

        return block

    # 이전 블록 가져오기
    def get_previous_block(self):
        return self.chain[-1]  # 현재 체인에 있는 블록 중 가장 끝 블록 반환

    # 작업 증명
    # 새로운 블록을 채굴하기 위한 nonce 값을 찾아내는 것
    '''
    :param previous_proof: 이전 블록의 nonce 값
    :return new_proof: 새로운 nonce값
    '''

    def proof_of_work(self, previous_proof):  # todo : 해쉬값 찾는걸 더 어렵게 만들어서 시간이 걸리도록 할건지, 일정한 주기를 정할건지 추가
        new_proof = 1  # 새로운 nonce 값을 저장할 변수
        check_proof = False  # 신규 증명의 유효성을 저장할 변수

        # todo : 지금 로직에는 블록의 데이터를 함께 해싱하는 로직이 빠져있음, 대신 이전 블록의 nonce를 추가하는 것으로 대체함
        '''
        1. 트랜잭션을 포함한 데이터 + 타임스탬프 추가해서 해싱 -> 타임스탬프 1초마다 바뀌면 언제 nonce가 찾아질지 장담을 못 하겠음...
        2. 트랜잭션만 포함해서 해싱 : 난이도는 내려가는데 난이도에 대한 확신이 없음
        '''
        while check_proof is False:
            hash_operation = hashlib.sha256(
                str(new_proof ** 2 - previous_proof ** 2).encode()).hexdigest()  # nonce를 포함해서 해싱
            # todo : difficulty가 지금 4인데 이거 상수로 빼도 좋을 거 같아요
            if hash_operation[:4] == '0000':  # difficulty에 맞게 해싱 값 검증
                check_proof = True
            else:
                new_proof += 1  # nonce 값 +1 증가
        return new_proof

    # 블록의 내용을 해싱해서 반환
    '''
    :param block: 블록
    :return: 해싱값
    '''

    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    # 체인이 올바른지 검증하는 함수
    def is_chain_valid(self, chain):
        previous_block = chain[0]  # 제네시스 블록에서부터 시작
        block_index = 1  # 블록의 인덱스

        while block_index < len(chain):
            block = chain[block_index]

            # 현재 블록이 가진 previous_hash가 실제로 이전 블록을 해싱했을 떄의 값과 같은지 확인
            if block['previous_hash'] != self.hash(previous_block):
                return False

            previous_proof = previous_block['proof']  # 이전 블록의 nonce 값
            proof = block['proof']  # 현재 블록의 nonce 값

            # todo: nonce를 이용한 작업증명인데 이거 로직 바꿔야 할듯
            hash_operation = hashlib.sha256(str(proof ** 2 - previous_proof ** 2).encode()).hexdigest()
            if hash_operation[:4] != '0000':
                return False

            previous_block = block
            block_index += 1

        return True

    def add_award_transaction(self, data):
        # data가 json 형식이면 parsing 불필요
        transaction_id = str(uuid.uuid4())
        timestamp = datetime.datetime.now().isoformat()
        transaction = {
            "transaction_id": transaction_id,
            "timestamp": timestamp,
            "type": "award",
            "data": {
                "organizer": data["organizer"],
                "event_name": data["event_name"],
                "award_date": data["award_date"],
                "recipient_name": data["recipient_name"],
                "certificate_code": data["certificate_code"],
                "award_type": data["award_type"]
            }
        }

        self.transactions.append(transaction)

        previous_block = self.get_previous_block()

        return previous_block['index'] + 1

    # 참가기록 트랜잭션 추가
    def add_participation_transaction(self, data):  # todo : 함수 테스트
        # data가 json 형식이면 parsing 불필요
        transaction_id = str(uuid.uuid4())
        timestamp = datetime.datetime.now().isoformat()

        transaction = {
            "transaction_id": transaction_id,
            "timestamp": timestamp,
            "type": "participation",
            "data": {
                "organizer": data["organizer"],
                "event_name": data["event_name"],
                "attendee_name": data["attendee_name"],
                "code": data["code"],
                "event_date": data["event_date"],
                "details": data["details"]
            }
        }

        self.transactions.append(transaction)

        previous_block = self.get_previous_block()

        return previous_block['index'] + 1

    # 노드 목록에 새로운 노드를 추가하는 함수
    def add_node(self, address):
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    #
    def replace_chain(self):  # todo : 길이가 같다면 어떻게 할지 추가
        network = self.nodes
        longest_chain = None
        max_length = len(self.chain)
        for node in network:
            response = requests.get(f'http://{node}/get_chain')  # todo : https 통신으로 추후 변경
            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']
                if length > max_length and self.is_chain_valid(chain):
                    max_length = length
                    longest_chain = chain

        if longest_chain:
            self.chain = longest_chain
            return True

        return False

    def sync_transactions(self):
        # 로컬 트랜잭션 ID 집합
        local_transaction_ids = {tx['transaction_id'] for tx in self.transactions}

        # 네트워크의 모든 노드에 대해 반복
        for node in self.nodes:
            try:
                # 각 노드의 트랜잭션 풀을 가져옴
                response = requests.get(f'http://{node}/get_transactions')
                if response.status_code == 200:
                    node_transactions = response.json()

                    # 각 트랜잭션에 대해 검사
                    for tx in node_transactions:
                        # 로컬 트랜잭션 풀에 없는 경우 추가
                        if tx['transaction_id'] not in local_transaction_ids:
                            self.transactions.append(tx)
                            local_transaction_ids.add(tx['transaction_id'])
                            print(f"New transaction added: {tx['transaction_id']}")
            except requests.exceptions.RequestException as e:
                print(f"Failed to connect to node {node}: {e}")

        print("Finished syncing transactions")

    def get_transactions_by_name(self, name):
        found_transactions = []  # 일치하는 트랜잭션을 저장할 리스트
        for block in self.chain:  # 체인의 모든 블록을 순회
            for transaction in block['transactions']:  # 각 블록의 트랜잭션을 순회
                # 참가기록 트랜잭션과 수상기록 트랜잭션을 확인
                if transaction['type'] == 'participation' and transaction['data']['attendee_name'] == name:
                    found_transactions.append(transaction)
                elif transaction['type'] == 'award' and transaction['data']['recipient_name'] == name:
                    found_transactions.append(transaction)

        return found_transactions


