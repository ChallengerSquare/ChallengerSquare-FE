package com.ssafy.challs.domain.notice.entity;

import com.ssafy.challs.domain.contest.entity.Contest;
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
public class Notice extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	Contest contest;
	String noticeTitle;
	@Column(columnDefinition = "TEXT")
	String noticeContent;

}
