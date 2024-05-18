package com.ssafy.challs.domain.blockchain.dto.response.client;

import com.fasterxml.jackson.annotation.JsonProperty;

public record Award(
	String organizer,
	@JsonProperty("event_name")
	String eventName,
	@JsonProperty("award_date")
	String awardDate,
	@JsonProperty("award_type")
	String awardType,
	@JsonProperty("recipient_name")
	String recipientName,
	@JsonProperty("recipient_code")
	String recipientCode,
	@JsonProperty("code")
	String code
) implements Data {
}
