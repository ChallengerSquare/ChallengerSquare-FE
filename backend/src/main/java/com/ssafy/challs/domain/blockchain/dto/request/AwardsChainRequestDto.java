package com.ssafy.challs.domain.blockchain.dto.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record AwardsChainRequestDto(
	String type,
	String organizer,
	@JsonProperty("event_name")
	String event_name,
	@JsonProperty("award_date")
	LocalDate awardDate,
	@JsonProperty("recipient_name")
	String recipientName,
	@JsonProperty("recipient_code")
	String recipientCode,
	String code,
	@JsonProperty("award_type")
	String awardType
) implements BlockChainRequest {
}
