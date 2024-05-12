package com.ssafy.challs.domain.blockchain.dto.response;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
	@JsonSubTypes.Type(value = AwardsChainResponseDto.class, name = "award"),
	@JsonSubTypes.Type(value = ParticipantsChainResponseDto.class, name = "participation")
})
public interface BlockChainResponse {
}
