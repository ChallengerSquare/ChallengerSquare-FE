package com.ssafy.challs.domain.blockchain.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.challs.domain.blockchain.dto.response.BlockChainCountResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainStatusResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.client.BlockChainResponse;
import com.ssafy.challs.domain.blockchain.dto.response.client.GetChainResponse;
import com.ssafy.challs.domain.blockchain.dto.response.client.Transaction;
import com.ssafy.challs.domain.blockchain.service.BlockChainService;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/block-chain")
@RequiredArgsConstructor
@Tag(name = "block chain Controller", description = "블록체인 관리 컨트롤러")
public class BlockChainController {

	private final BlockChainService blockChainService;

	/**
	 * 블록체인 조회를 위한 api
	 *
	 * @author 강태연
	 * @param code 블록체인 고유 코드
	 * @return 블록체인 정보
	 */
	@GetMapping
	@Operation(summary = "블록체인 조회", description = "블록체인 고유 코드로 블록체인 조회")
	public ResponseEntity<SuccessResponse<BlockChainResponse>> getAwardsChain(@RequestParam String code) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getBlockChain(code)));
	}

	@GetMapping("/get-chain")
	@Operation(summary = "모든 체인 조회", description = "모든 체인 조회")
	public ResponseEntity<SuccessResponse<GetChainResponse>> getChain() {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getChain()));
	}

	@GetMapping("/get-node-count")
	@Operation(summary = "노드 숫자 조회", description = "모든 노드 숫자 조회")
	public ResponseEntity<SuccessResponse<BlockChainCountResponseDto>> getNodeCount() {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getNodeCount()));
	}

	@GetMapping("/get-network-status")
	@Operation(summary = "네트워크 상태 조회", description = "네트워크 상태 조회")
	public ResponseEntity<SuccessResponse<BlockChainStatusResponseDto>> getNetworkStatus() {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getNetworkStatus()));
	}

	@GetMapping("/get-all-transactions-count")
	@Operation(summary = "모든 트랜잭션의 숫자 조회", description = "모든 트랜잭션의 숫자 조회")
	public ResponseEntity<SuccessResponse<BlockChainCountResponseDto>> getAllTransactionsCount() {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getAllTransactionsCount()));
	}

	@GetMapping("/get-transactions-count")
	@Operation(summary = "모든 트랜잭션의 숫자 조회", description = "모든 트랜잭션의 숫자 조회")
	public ResponseEntity<SuccessResponse<BlockChainCountResponseDto>> getWaitingTransactionsCount() {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getWaitingTransactionsCount()));
	}

	@GetMapping("/get-block-count")
	@Operation(summary = "등록 대기중인 트랜잭션의 숫자 조회", description = "등록 대기중인 트랜잭션의 숫자 조회")
	public ResponseEntity<SuccessResponse<BlockChainCountResponseDto>> getBlockCount() {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getBlockCount()));
	}

	@GetMapping("/get-all-transactions")
	@Operation(summary = "모든 트랙잭션 조회", description = "모든 트랙잭션 조회")
	public ResponseEntity<SuccessResponse<List<Transaction>>> getAllTransactions() {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getAllTransactions()));
	}

	@GetMapping("/get-mining-period")
	@Operation(summary = "블록 생성 속도 조회", description = "블록 생성 속도 조회")
	public ResponseEntity<SuccessResponse<BlockChainCountResponseDto>> getMiningPeriod() {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getMiningPeriod()));
	}

}
