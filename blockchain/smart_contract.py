
class SmartContract:
    def __init__(self, blockchain):
        self.blockchain = blockchain

    def validate_transaction(self, transaction):
        # 트랜잭션 유형에 따른 필수 데이터 필드 검증
        required_fields = {
            'award': ['organizer', 'event_name', 'award_date', 'recipient_name', 'certificate_code', 'award_type'],  # todo : 올바른 컬럼명으로 고치기
            'participation': ['organizer', 'event_name', 'attendee_name', 'event_date', 'code', 'details']
        }

        transaction_type = transaction.get('type')
        fields = required_fields.get(transaction_type)

        if not fields:
            return False, "Invalid transaction type"

        if not all(field in transaction for field in fields):
            return False, "Missing required transaction data"

        return True, "Transaction is valid"

    def execute_transaction(self, transaction):
        # 트랜잭션 유효성 검증
        is_valid, message = self.validate_transaction(transaction)
        if not is_valid:
            return False, message

        # 트랜잭션을 블록체인에 추가
        if transaction['type'] == 'award':
            index = self.blockchain.add_award_transaction(transaction)
        elif transaction['type'] == 'participation':
            index = self.blockchain.add_participation_transaction(transaction)

        return True, f"Transaction will be added to Block {index}"