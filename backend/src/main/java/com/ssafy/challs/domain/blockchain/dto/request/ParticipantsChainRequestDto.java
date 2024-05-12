package com.ssafy.challs.domain.blockchain.dto.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record ParticipantsChainRequestDto(
	String type,
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
	String details
) implements BlockChainRequest {
}
