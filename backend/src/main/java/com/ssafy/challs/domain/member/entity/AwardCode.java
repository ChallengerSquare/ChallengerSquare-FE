package com.ssafy.challs.domain.member.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AwardCode {

	@Id
	Long id;
	Long member;
	Boolean isAward;
	String contestTitle;
	String awardCode;

}
