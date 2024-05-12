package com.ssafy.challs.domain.blockchain.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.ssafy.challs.domain.blockchain.dto.request.BlockChainRequest;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainResponseDto;

@FeignClient(name = "blockChainFeignClient", url = "${feign-client.url}")
public interface BlockChainClient {

	@PostMapping("/add-transaction")
	void createBlockChain(@RequestHeader("Secret-Code") String secretCode,
		@RequestBody BlockChainRequest blockChainRequest);

	@GetMapping("/get-transactions/code/{code}")
	BlockChainResponseDto getBlockChain(@PathVariable String code);

}
