package com.ssafy.challs.domain.contest.entity;

import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.global.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContestParticipants extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	Contest contest;
	@ManyToOne(fetch = FetchType.LAZY)
	Team team;
	@Column(columnDefinition = "CHAR(1)")
	String contestParticipantsState;
	@Column(columnDefinition = "TEXT")
	String contestParticipantsReason;
	Boolean isParticipants;

}
