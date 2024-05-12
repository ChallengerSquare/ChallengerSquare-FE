package com.ssafy.challs.domain.blockchain.dto.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ParticipantsChainResponseDto(
	String organizer,
	@JsonProperty("event_name")
	String eventName,
	@JsonProperty("attendee_name")
	String attendeeName,
	@JsonProperty("attendee_code")
	String attendeeCode,
	@JsonProperty("event_date")
	LocalDate eventDate,
	String code,
	String details,
	String type
) implements BlockChainResponse {
	public ParticipantsChainResponseDto {
		type = "participation";
	}
}

