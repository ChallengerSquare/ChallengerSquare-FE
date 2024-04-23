package com.ssafy.challs.domain.alert.entity;

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
public class Alert extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	Member member;
	Character alertType;
	String alertContent;
	Boolean isRead;
	Long alertTargetId;

}
