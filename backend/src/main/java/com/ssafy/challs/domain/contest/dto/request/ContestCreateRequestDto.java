package com.ssafy.challs.domain.contest.dto.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.contest.dto.response.ContestAwardsDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ContestCreateRequestDto(
	@Schema(description = "대회 제목", example = "데이터 수집 대회!!!!!!!!")
	String contestTitle,
	@Schema(description = "대회 설명", example = "대회 설명 : 데이터 수집 대회입니다")
	String contestContent,
	@Schema(description = "대회 장소", example = "서울시 강남구 역삼동")
	String contestLocation,
	@Schema(description = "대회 포스터")
	MultipartFile contestImage,
	@Schema(description = "대회 개최팀 ID", example = "1")
	Long teamId,
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
	@Schema(description = "대회 카테고리", example = "3")
	Character contestCategory,
	@Schema(description = "대회 최소 신청 인원", example = "1")
	Integer contestPeopleMin,
	@Schema(description = "대회 최대 신청 인원", example = "6")
	Integer contestPeopleMax,
	@Schema(description = "시상 정보")
	List<ContestAwardsDto> contestAwards
) {
}
