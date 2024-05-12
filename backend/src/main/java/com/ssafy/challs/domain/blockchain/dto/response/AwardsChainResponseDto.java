package com.ssafy.challs.domain.blockchain.dto.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AwardsChainResponseDto(
	String organizer,
	@JsonProperty("event_name")
	String eventName,
	@JsonProperty("award_date")
	LocalDate awardDate,
	@JsonProperty("award_type")
	String awardType,
	@JsonProperty("recipient_name")
	String recipientName,
	@JsonProperty("recipient_code")
	String recipientCode,
	@JsonProperty("code")
	String code,
	String type
) implements BlockChainResponse {
	public AwardsChainResponseDto {
		type = "award";
	}
}
