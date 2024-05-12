package com.ssafy.challs.domain.blockchain.dto.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

public record ParticipantsChainResponseDto(
	@Schema(description = "대회를 주최한 팀 이름", example = "팀이름")
	String organizer,
	@Schema(description = "대회 이름", example = "대회이름")
	@JsonProperty("event_name")
	String eventName,
	@Schema(description = "참석자 이름", example = "홍길동")
	@JsonProperty("attendee_name")
	String attendeeName,
	@Schema(description = "참석자 고유 코드", example = "UUID")
	@JsonProperty("attendee_code")
	String attendeeCode,
	@Schema(description = "참석일", example = "2024-05-12")
	@JsonProperty("event_date")
	LocalDate eventDate,
	@Schema(description = "블록체인 고유 코드", example = "UUID")
	String code,
	@Schema(description = "설명", example = "뭔지 모르겠지만 블록체인에 있음")
	String details,
	@Schema(description = "블록체인의 타입", example = "participation")
	String type
) implements BlockChainResponse {
	public ParticipantsChainResponseDto {
		type = "participation";
	}
}

