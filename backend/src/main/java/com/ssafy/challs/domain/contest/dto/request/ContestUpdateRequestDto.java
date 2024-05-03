package com.ssafy.challs.domain.contest.dto.request;

import java.util.List;

import com.ssafy.challs.domain.contest.dto.response.ContestAwardsDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ContestUpdateRequestDto(
	@Schema(description = "대회 PK", example = "1")
	@NotNull
	Long contestId,
	@Schema(description = "대회 제목", example = "데이터 수집 대회!!!!!!!!")
	@NotEmpty
	String contestTitle,
	@Schema(description = "대회 설명", example = "대회 설명 : 데이터 수집 대회입니다")
	@NotEmpty
	String contestContent,
	@Schema(description = "대회 장소", example = "서울시 강남구 역삼동")
	@NotEmpty
	String contestLocation,
	@Schema(description = "대회 개최팀 ID", example = "1")
	@NotNull
	Long teamId,
	@Schema(description = "대회 접수 신청 기간")
	@NotNull
	ContestPeriodDto registrationPeriod,
	@Schema(description = "대회 진행 기간")
	@NotNull
	ContestPeriodDto contestPeriod,
	@Schema(description = "대회 모집인원", example = "30")
	@NotNull
	Integer contestRegistrationNum,
	@Schema(description = "대회 참가비", example = "10000")
	@NotNull
	Integer contestFee,
	@Schema(description = "대회 주최측 연락처", example = "000-0000-0000")
	@NotEmpty
	String contestPhone,
	@Schema(description = "대회 선착순 여부", example = "false")
	@NotNull
	Boolean isPriority,
	@Schema(description = "대회 카테고리", example = "3")
	@NotNull
	Character contestCategory,
	@Schema(description = "대회 최소 신청 인원", example = "1")
	@NotNull
	Integer contestPeopleMin,
	@Schema(description = "대회 최대 신청 인원", example = "6")
	@NotNull
	Integer contestPeopleMax,
	@Schema(description = "시상 정보")
	@NotNull
	List<ContestAwardsDto> contestAwards
) {
}
