package com.ssafy.challs.domain.member.entity;

import java.time.LocalDate;

import com.ssafy.challs.global.common.entity.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String memberName;
	LocalDate memberBirth;
	String memberPhone;
	String memberAddress;
	Boolean isWithdraw;
	Boolean isAgree;
	Character memberProvider;
	String memberEmail;
	Boolean isAdmin;
	String memberProviderId;
	String memberCode;

}
