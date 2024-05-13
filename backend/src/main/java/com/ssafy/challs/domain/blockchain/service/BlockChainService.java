package com.ssafy.challs.domain.blockchain.service;

import com.ssafy.challs.domain.blockchain.dto.request.BlockChainRequest;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainResponse;

public interface BlockChainService {
	void createBlockChain(BlockChainRequest blockChainRequest);

	BlockChainResponse getBlockChain(String code);
}
