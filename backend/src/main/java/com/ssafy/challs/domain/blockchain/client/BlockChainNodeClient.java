package com.ssafy.challs.domain.blockchain.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.ssafy.challs.domain.blockchain.dto.response.BlockChainCountResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainStatusResponseDto;

@FeignClient(name = "blockChainNodeFeignClient", url = "${feign-client.block-chain.node.url}")
public interface BlockChainNodeClient {

	/**
	 * 노드의 숫자 조회
	 *
	 * @author 강태연
	 * @return 노드의 숫자
	 */
	@GetMapping(value = "/api/getNodeCount")
	BlockChainCountResponseDto getNodeCount();

	/**
	 * 네트워크 상태 조회
	 *
	 * @author 강태연
	 * @return 네트워크 상태
	 */
	@GetMapping(value = "/api/getNetworkStatus")
	BlockChainStatusResponseDto getNetworkStatus();

}
