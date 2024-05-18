package com.ssafy.challs.domain.blockchain.dto.response.client;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GetChainResponse(
	List<Chain> chain,
	Long length
) {
	public record Chain(
		Body body,
		String hash
	) {
		public record Body(
			Long index,
			@JsonProperty("previous_hash")
			String previousHash,
			Long proof,
			String timestamp,
			List<Transaction> transactions
		) {
		}
	}
}
