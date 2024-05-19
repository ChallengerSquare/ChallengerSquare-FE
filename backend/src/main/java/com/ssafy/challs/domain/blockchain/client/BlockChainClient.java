package com.ssafy.challs.domain.blockchain.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.ssafy.challs.domain.blockchain.dto.request.BlockChainRequest;
import com.ssafy.challs.domain.blockchain.dto.response.BlockChainCountResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.client.BlockChainResponseDto;
import com.ssafy.challs.domain.blockchain.dto.response.client.GetChainResponse;
import com.ssafy.challs.domain.blockchain.dto.response.client.Transaction;

// 연결할 주소와 이름 지정
@FeignClient(name = "blockChainFeignClient", url = "${feign-client.block-chain.url}")
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

	/**
	 * 모든 체인을 조회
	 *
	 * @author 강태연
	 * @return 모든 체인
	 */
	@GetMapping("/get-chain")
	GetChainResponse getChain();

	/**
	 * 모든 트랙잭션의 숫자를 조회
	 *
	 * @author 강태연
	 * @return 모든 트랙잭션의 숫자
	 */
	@GetMapping("/get-all-transactions-count")
	BlockChainCountResponseDto getAllTransactionsCount();

	/**
	 * 대기중인 트랙잭션의 숫자를 조회
	 *
	 * @author 강태연
	 * @return 대기중인 트랜잭션의 숫자
	 */
	@GetMapping("/get-transactions-count")
	BlockChainCountResponseDto getWaitingTransactionsCount();

	/**
	 * 블록의 숫자 조회
	 *
	 * @author 강태연
	 * @return 블록의 숫자
	 */
	@GetMapping("/get-block-count")
	BlockChainCountResponseDto getBlockCount();

	/**
	 * 모든 트랜잭션 조회
	 *
	 * @author 강태연
	 * @return 모든 트랜잭션
	 */
	@GetMapping("/get-all-transactions")
	List<Transaction> getAllTransactions();

	/**
	 * 블록 생성 속도 조회
	 *
	 * @author 강태연
	 * @return 블록 생성 속도
	 */
	@GetMapping("/get-mining-period")
	BlockChainCountResponseDto getMiningPeriod();

}
