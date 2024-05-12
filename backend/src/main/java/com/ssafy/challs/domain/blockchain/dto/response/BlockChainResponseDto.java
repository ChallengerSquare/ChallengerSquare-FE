package com.ssafy.challs.domain.blockchain.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

public record BlockChainResponseDto(
	@JsonProperty("message")
	String message,
	@JsonProperty("results")
	List<Results> results
) {
	public record Results(
		@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXTERNAL_PROPERTY, property = "type")
		@JsonSubTypes({
			@JsonSubTypes.Type(value = AwardsChainResponseDto.class, name = "award"),
			@JsonSubTypes.Type(value = ParticipantsChainResponseDto.class, name = "participation")
		})
		BlockChainResponse data,
		String type
	) {
	}
}
