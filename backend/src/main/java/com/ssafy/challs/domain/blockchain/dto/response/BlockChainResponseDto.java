package com.ssafy.challs.domain.blockchain.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import io.swagger.v3.oas.annotations.media.Schema;

public record BlockChainResponseDto(
	@Schema(description = "블록체인 조회시 응답 메세지", example = "successfully find transactions!!")
	@JsonProperty("message")
	String message,
	@Schema(description = "결과")
	@JsonProperty("results")
	List<Results> results
) {
	public record Results(
		@Schema(description = "블록체인 데이터")
		@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXTERNAL_PROPERTY, property = "type")
		@JsonSubTypes({
			@JsonSubTypes.Type(value = AwardsChainResponseDto.class, name = "award"),
			@JsonSubTypes.Type(value = ParticipantsChainResponseDto.class, name = "participation")
		})
		BlockChainResponse data,
		@Schema(description = "블록체인의 종류", example = "participation")
		String type
	) {
	}
}
