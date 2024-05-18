package com.ssafy.challs.domain.blockchain.dto.response.client;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

public record Participant(
	String organizer,
	@JsonProperty("event_name")
	String eventName,
	@JsonProperty("attendee_name")
	String attendeeName,
	@JsonProperty("attendee_code")
	String attendeeCode,
	@JsonProperty("event_date")
	String eventDate,
	@Schema(description = "블록체인 고유 코드", example = "UUID")
	String code,
	String details
) implements Data {
}
