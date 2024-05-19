package com.ssafy.challs.domain.notice.service.impl;

import static org.assertj.core.api.Assertions.*;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestAwardsDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;
import com.ssafy.challs.domain.contest.service.ContestService;
import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.member.repository.MemberRepository;
import com.ssafy.challs.domain.notice.dto.request.NoticeCreateRequestDto;
import com.ssafy.challs.domain.notice.dto.response.NoticeResponseDto;
import com.ssafy.challs.domain.notice.repository.NoticeRepository;
import com.ssafy.challs.domain.notice.service.NoticeService;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.service.TeamService;

@SpringBootTest
@Transactional
class NoticeServiceImplTest {

	@Autowired
	NoticeService noticeService;

	@Autowired
	NoticeRepository noticeRepository;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	TeamService teamService;

	@Autowired
	ContestService contestService;

	Long setMember() {
		Member leader = Member.builder()
			.memberName("리더")
			.isAgree(true)
			.isAdmin(false)
			.isWithdraw(false)
			.memberBirth(LocalDate.now())
			.memberEmail("leader@leader.leader")
			.memberAddress("06220 서울 강남구 테헤란로 212 (역삼동, 멀티캠퍼스) 역삼동, 멀티캠퍼스 802호")
			.build();
		memberRepository.save(leader);
		return leader.getId();
	}

	Long setTeam(Long memberId) {
		return teamService.createTeam(new TeamCreateRequestDto("테스트용 팀 이름", "테스트용 팀 설명"), memberId, null).teamId();
	}

	Long setContest(Long memberId, Long teamId) throws IOException {
		ContestCreateRequestDto request = ContestCreateRequestDto.builder()
			.contestTitle("테스트용 대회 제목")
			.contestContent("테스트용 대회 설명")
			.contestLocation("06220 서울 강남구 테헤란로 212 (역삼동, 멀티캠퍼스) 역삼동, 멀티캠퍼스 802호")
			.teamId(teamId)
			.registrationPeriod(new ContestPeriodDto(LocalDate.of(2024, 5, 10), LocalDate.of(2024, 5, 22)))
			.contestPeriod(new ContestPeriodDto(LocalDate.of(2024, 5, 25), LocalDate.of(2024, 5, 30)))
			.contestRegistrationNum(10)
			.contestFee(10000)
			.contestPhone("010-0000-0000")
			.isPriority(false)
			.contestCategory('1')
			.contestAwards(
				List.of(new ContestAwardsDto(null, "테스트용 상 1번", 10, 10000),
					new ContestAwardsDto(null, "테스트용 상 2번", 20, 20000)))
			.build();

		MultipartFile file = new MockMultipartFile("임시용 이미지", InputStream.nullInputStream());

		return contestService.createContest(request, file, memberId).contestId();
	}

	@Test
	@DisplayName("공지사항 작성, 조회 테스트")
	void noticeTest() throws IOException {
		Long memberId = setMember();
		Long teamId = setTeam(memberId);
		Long contestId = setContest(memberId, teamId);

		NoticeCreateRequestDto one = new NoticeCreateRequestDto("임시용 공지사항 1번", "임시용 공지사항 내용 1번",
			contestId);
		NoticeCreateRequestDto two = new NoticeCreateRequestDto("임시용 공지사항 2번", "임시용 공지사항 내용 2번",
			contestId);

		noticeService.createNotice(one, memberId);
		noticeService.createNotice(two, memberId);

		Page<NoticeResponseDto> noticeResponseDto = noticeService.searchNoticeList(contestId, Pageable.ofSize(10));
		NoticeResponseDto noticeResponseDto1 = noticeResponseDto.getContent().get(0);
		NoticeResponseDto noticeResponseDto2 = noticeResponseDto.getContent().get(1);

		assertThat(noticeResponseDto1.title()).isEqualTo("임시용 공지사항 1번");
		assertThat(noticeResponseDto1.content()).isEqualTo("임시용 공지사항 내용 1번");
		assertThat(noticeResponseDto2.title()).isEqualTo("임시용 공지사항 2번");
		assertThat(noticeResponseDto2.content()).isEqualTo("임시용 공지사항 내용 2번");
	}

}