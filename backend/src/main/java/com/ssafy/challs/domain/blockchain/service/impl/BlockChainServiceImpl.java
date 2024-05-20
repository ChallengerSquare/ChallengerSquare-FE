package com.ssafy.challs.domain.blockchain.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.challs.domain.blockchain.client.BlockChainClient;
import com.ssafy.challs.domain.blockchain.client.BlockChainNodeClient;
import com.ssafy.challs.domain.blockchain.dto.request.BlockChainRequest;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainCountResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainStatusResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.client.BlockChainResponse;
import com.ssafy.challs.domain.blockchain.dto.response.client.GetChainResponse;
import com.ssafy.challs.domain.blockchain.dto.response.client.Transaction;
import com.ssafy.challs.domain.blockchain.service.BlockChainService;
import com.ssafy.challs.domain.member.repository.AwardsCodeRepository;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlockChainServiceImpl implements BlockChainService {

	private final BlockChainClient blockChainClient;
	private final BlockChainNodeClient blockChainNodeClient;
	private final AwardsCodeRepository awardsCodeRepository;

	@Value("${feign-client.secret-code}")
	private String secretCode;

	/**
	 * 블록체인 생성 메소드
	 *
	 * @author 강태연
	 * @param blockChainRequest 블록체인 생성에 필요한 정보
	 */
	@Override
	public void createBlockChain(BlockChainRequest blockChainRequest) {
		blockChainClient.createBlockChain(secretCode, blockChainRequest);
	}

	/**
	 * 블록체인 조회 메소드
	 *
	 * @author 강태연
	 * @param code 블록체인 조회에 필요한 정보
	 * @return 조회된 블록체인 정보
	 */
	@Override
	@Transactional(readOnly = true)
	public BlockChainResponse getBlockChain(String code) {
		if (awardsCodeRepository.findByAwardCode(code).isEmpty()) {
			throw new BaseException(ErrorCode.AWARDS_CODE_ERROR);
		}
		return blockChainClient.getBlockChain(code).results().get(0).data();
	}

	@Override
	public GetChainResponse getChain() {
		return blockChainClient.getChain();
	}

	@Override
	public BlockChainCountResponseDto getNodeCount() {
		return blockChainNodeClient.getNodeCount();
	}

	@Override
	public BlockChainStatusResponseDto getNetworkStatus() {
		return blockChainNodeClient.getNetworkStatus();
	}

	@Override
	public BlockChainCountResponseDto getAllTransactionsCount() {
		return blockChainClient.getAllTransactionsCount();
	}

	@Override
	public BlockChainCountResponseDto getWaitingTransactionsCount() {
		return blockChainClient.getWaitingTransactionsCount();
	}

	@Override
	public BlockChainCountResponseDto getBlockCount() {
		return blockChainClient.getBlockCount();
	}

	@Override
	public List<Transaction> getAllTransactions() {
		return blockChainClient.getAllTransactions();
	}

	@Override
	public BlockChainCountResponseDto getMiningPeriod() {
		return blockChainClient.getMiningPeriod();
	}

}
