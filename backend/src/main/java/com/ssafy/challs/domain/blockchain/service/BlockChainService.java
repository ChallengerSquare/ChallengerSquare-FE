package com.ssafy.challs.domain.blockchain.service;

import java.util.List;

import com.ssafy.challs.domain.blockchain.dto.request.BlockChainRequest;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainCountResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainStatusResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.client.BlockChainResponse;
import com.ssafy.challs.domain.blockchain.dto.response.client.GetChainResponse;
import com.ssafy.challs.domain.blockchain.dto.response.client.Transaction;

public interface BlockChainService {
	void createBlockChain(BlockChainRequest blockChainRequest);

	BlockChainResponse getBlockChain(String code);

	GetChainResponse getChain();

	BlockChainCountResponseDto getNodeCount();

	BlockChainStatusResponseDto getNetworkStatus();

	BlockChainCountResponseDto getAllTransactionsCount();

	BlockChainCountResponseDto getWaitingTransactionsCount();

	BlockChainCountResponseDto getBlockCount();

	List<Transaction> getAllTransactions();

	BlockChainCountResponseDto getMiningPeriod();
}
