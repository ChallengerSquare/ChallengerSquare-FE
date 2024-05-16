package com.ssafy.challs.domain.contest.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ContestFindResponseDto(
	@Schema(description = "대회 ID", example = "1")
	Long contestId,
	@Schema(description = "대회 제목", example = "데이터 수집 대회!!!!!!!!")
	String contestTitle,
	@Schema(description = "대회 내용", example = "데이터 수집 대회 내용!!!!!!!!")
	String contestContent,
	@Schema(description = "대회 포스터", example = "s3 주소")
	String contestImage,
	@Schema(description = "대회 개최팀 이름", example = "SSAFY")
	String teamName,
	@Schema(description = "대회 개최팀 ID", example = "1")
	String teamId,
	@Schema(description = "대회 접수 신청 기간")
	ContestPeriodDto registrationPeriod,
	@Schema(description = "대회 진행 기간")
	ContestPeriodDto contestPeriod,
	@Schema(description = "대회 모집인원", example = "30")
	Integer contestRegistrationNum,
	@Schema(description = "대회 참가비", example = "10000")
	Integer contestFee,
	@Schema(description = "대회 주최측 연락처", example = "000-0000-0000")
	String contestPhone,
	@Schema(description = "대회 선착순 여부", example = "false")
	Boolean isPriority,
	@Schema(description = "대회 카테고리", example = "2")
	String contestCategory,
	@Schema(description = "대회 주최 장소", example = "서울시 강남구")
	String contestLocation,
	@Schema(description = "대회 신청한 팀장인지 여부", example = "true")
	Boolean isLeader,
	@Schema(description = "B :참가 신청 안한 상태, W : 참가 신청 후 승인 대기중, A : 참가 신청 후 승인 완료, R : 참가 신청 후 승인 거절", example = "BEFORE")
	String participantState,
	@Schema(description = "P : 모집 전, J : 모집 중, D : 모집 끝, S : 대회 시작, E : 대회 끝")
	Character contestState,
	@Schema(description = "시상 정보")
	List<ContestAwardsDto> contestAwards
) {
}
