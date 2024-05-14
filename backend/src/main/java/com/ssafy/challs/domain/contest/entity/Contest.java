package com.ssafy.challs.domain.contest.entity;

import java.time.LocalDate;

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
public class Contest extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	Team team;
	String contestTitle;
	@Column(columnDefinition = "TEXT")
	String contestContent;
	String contestLocation;
	LocalDate contestRegistrationStart;
	LocalDate contestRegistrationEnd;
	LocalDate contestStart;
	LocalDate contestEnd;
	Integer contestRegistrationNum;
	Integer contestFee;
	String contestImage;
	Character contestCategory;
	Character contestState;
	Boolean isPriority;

	public void setContestImage(String contestImage) {
		this.contestImage = contestImage;
	}

}
