from blockchain import Blockchain

blockchain = Blockchain.get_blockchain()


class SmartContract:
    def __init__(self):
        self.blockchain = blockchain

    @staticmethod
    def validate_transaction(transaction):
        # 트랜잭션 유형에 따른 필수 데이터 필드 검증
        required_fields = {
            'award': ['organizer', 'event_name', 'award_date', 'recipient_name', 'recipient_code', 'code', 'award_type'],
            'participation': ['organizer', 'event_name', 'attendee_name', 'attendee_code', 'event_date', 'code', 'details']
        }
        transaction_type = transaction.get('type')
        fields = required_fields.get(transaction_type)

        # todo : 올바른 형식의 데이터인지 검증 로직 추가
        if not fields:
            raise ValueError("Invalid transaction type")

        if not all(field in transaction for field in fields):
            raise ValueError("Missing required transaction data")

        return True, "Transaction is valid"

    def validate_request_user(self, user_code):
        if user_code == 'secretbetweenunmeiloveyou':
            return True, "User is valid"
        else:
            raise ValueError("Need a valid user code")

    def execute_transaction(self, transaction, secret_code):
        try:
            self.validate_request_user(secret_code)  # 유저 검증
            self.validate_transaction(transaction)  # 유효성 검증
            # 트랜잭션을 블록체인에 추가
            if transaction['type'] == 'award':
                index = self.blockchain.add_award_transaction(transaction)
            elif transaction['type'] == 'participation':
                index = self.blockchain.add_participation_transaction(transaction)
            return f"Transaction will be added to Block {index}"
        except ValueError as e:
            # 로컬 예외 처리: 특정 오류 로그 등
            raise e  # 다시 예외를 발생시켜 상위 레벨에서 처리할 수 있게 함

