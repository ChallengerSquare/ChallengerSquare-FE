from uuid import uuid4

from flask import Flask, jsonify, request

from blockchain import Blockchain
from smart_contract import SmartContract

app = Flask(__name__)

node_address = str(uuid4()).replace('-', '')
blockchain = Blockchain()
smart_contract = SmartContract(blockchain)


@app.route('/mine_block', methods=['GET'])
def mine_block():
    previous_block = blockchain.get_previous_block()
    previous_proof = previous_block['proof']
    proof = blockchain.proof_of_work(previous_proof)
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block(proof, previous_hash)

    response = {'message': 'Congratulations, you just mine a block!!',
                'index': block['index'],
                'timestamp': block['timestamp'],
                'proof': block['proof'],
                'previous_hash': block['previous_hash'],
                'transactions': block['transactions']}

    return jsonify(response), 200


@app.route('/get_chain', methods=['GET'])
def get_chain():
    response = {'chain': blockchain.chain,
                'length': len(blockchain.chain)}

    return jsonify(response), 200


@app.route('/is_valid', methods=['GET'])
def is_valid():
    is_valid = blockchain.is_chain_valid(blockchain.chain)
    if is_valid:
        response = {'message': 'All good. The Blockchain is valid!'}
    else:
        response = {'message': 'We have a problem!!'}

    return jsonify(response), 200


@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    json = request.get_json()
    if smart_contract.validate_transaction(json):
        if json['type'] == 'award':
            index = blockchain.add_award_transaction(json)
            response = {'message': f'This transaction will be added to Block {index}'}
            return jsonify(response), 201
        elif json['type'] == 'participant':
            index = blockchain.add_participation_transaction(json)
            response = {'message': f'This transaction will be added to Block {index}'}
            return jsonify(response), 201
    else:
        return 'Invalid Transaction', 400


# todo : node 를 탐색해서 connect 하도록
# todo : node 탐색 기준 설정
@app.route('/connect_node', methods=['POST'])
def connect_node():
    json = request.get_json()
    nodes = json.get('nodes')
    if nodes is None:
        return 'No nodes provided', 400

    for node in nodes:
        blockchain.add_node(node)
    response = {'message': 'All the nodes now connected. The hadcoin Blockchain now contains the following nodes',
                'total_nodes': list(blockchain.nodes)}
    return jsonify(response), 201


@app.route('/replace_chain', methods=['GET'])  # todo : chain 길이가 같을 때 어떻게 할건지 추가
def replace_chain():
    is_chain_replaced = blockchain.replace_chain()
    if is_chain_replaced:
        response = {'message': 'The node had different chains so the chain was replaced by the longest chain',
                    'new_chain': blockchain.chain}
    else:
        response = {'message': 'All good. The chain is the largest one',
                    'actual_chain': blockchain.chain}

    return jsonify(response), 200


# Running the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
