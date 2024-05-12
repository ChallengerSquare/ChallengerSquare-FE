package com.ssafy.challs.domain.blockchain.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.challs.domain.blockchain.dto.response.BlockChainResponse;
import com.ssafy.challs.domain.blockchain.service.BlockChainService;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/block-chain")
@RequiredArgsConstructor
@Tag(name = "block chain Controller", description = "블록체인 관리 컨트롤러")
public class BlockChainController {

	private final BlockChainService blockChainService;

	@GetMapping
	public ResponseEntity<SuccessResponse<BlockChainResponse>> getAwardsChain(@RequestParam String code) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, blockChainService.getBlockChain(code)));
	}

}
