package com.ssafy.challs.domain.blockchain.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.ssafy.challs.domain.blockchain.dto.request.BlockChainRequest;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainResponseDto;

// 연결할 주소와 이름 지정
@FeignClient(name = "blockChainFeignClient", url = "${feign-client.url}")
public interface BlockChainClient {

	// 저장할 때 사용 할 메소드

	/**
	 * 블록체인을 저장할 때 사용하는 Client
	 *
	 * @author 강태연
	 * @param secretCode 블록체인 저장 시 지정된 사용자를 인증 할 비밀코드
	 * @param blockChainRequest 블록체인 생성에 필요한 데이터
	 */
	@PostMapping("/add-transaction")
	void createBlockChain(@RequestHeader("Secret-Code") String secretCode,
		@RequestBody BlockChainRequest blockChainRequest);

	/**
	 * 블록체인을 조회할 때 사용하는 Client
	 *
	 * @author 강태연
	 * @param code 블록체인 고유 코드
	 * @return 조회된 블록체인 정보
	 */
	@GetMapping("/get-transactions/code/{code}")
	BlockChainResponseDto getBlockChain(@PathVariable String code);

}
