package com.ssafy.challs.domain.blockchain.dto.response.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

public record Transaction(
	@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXTERNAL_PROPERTY, property = "type")
	@JsonSubTypes({
		@JsonSubTypes.Type(value = Award.class, name = "award"),
		@JsonSubTypes.Type(value = Participant.class, name = "participation")
	})
	Data data,
	String timestamp,
	@JsonProperty("transaction_id")
	String transactionId,
	String type
) {
}
