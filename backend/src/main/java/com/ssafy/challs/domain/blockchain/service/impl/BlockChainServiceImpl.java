package com.ssafy.challs.domain.blockchain.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.challs.domain.blockchain.client.BlockChainClient;
import com.ssafy.challs.domain.blockchain.dto.request.BlockChainRequest;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainResponse;
import com.ssafy.challs.domain.blockchain.service.BlockChainService;
import com.ssafy.challs.domain.member.repository.AwardsCodeRepository;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlockChainServiceImpl implements BlockChainService {

	private final BlockChainClient blockChainClient;
	private final AwardsCodeRepository awardsCodeRepository;

	@Value("${feign-client.secret-code}")
	private String secretCode;

	@Override
	public void createBlockChain(BlockChainRequest blockChainRequest) {
		blockChainClient.createBlockChain(secretCode, blockChainRequest);
	}

	@Override
	@Transactional(readOnly = true)
	public BlockChainResponse getBlockChain(String code) {
		if (awardsCodeRepository.findByAwardCode(code).isEmpty()) {
			throw new BaseException(ErrorCode.AWARDS_CODE_ERROR);
		}
		return blockChainClient.getBlockChain(code).results().get(0).data();
	}

}
