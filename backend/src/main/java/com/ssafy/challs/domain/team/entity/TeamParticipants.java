package com.ssafy.challs.domain.team.entity;

import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.global.common.entity.BaseEntity;

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
public class TeamParticipants extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	Member member;
	@ManyToOne(fetch = FetchType.LAZY)
	Team team;
	Boolean isLeader;
	Boolean isParticipants;

}
