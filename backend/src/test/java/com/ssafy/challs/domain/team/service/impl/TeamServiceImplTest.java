package com.ssafy.challs.domain.team.service.impl;

import static org.assertj.core.api.Assertions.*;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestAwardsDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;
import com.ssafy.challs.domain.contest.service.ContestService;
import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.member.repository.MemberRepository;
import com.ssafy.challs.domain.team.dto.request.TeamCodeRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamParticipantDeleteRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamParticipantsRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateLeaderRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamInfoResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamMemberResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamParticipantsResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamPublicResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamResponseDto;
import com.ssafy.challs.domain.team.repository.TeamParticipantsRepository;
import com.ssafy.challs.domain.team.repository.TeamRepository;
import com.ssafy.challs.domain.team.service.TeamService;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import jakarta.persistence.EntityManager;

@SpringBootTest
@Transactional
@TestPropertySource("classpath:application.yml")
class TeamServiceImplTest {

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	TeamService teamService;

	@Autowired
	TeamRepository teamRepository;

	@Autowired
	ContestService contestService;

	@Value("${cloud.aws.s3.url}")
	String prefix;

	@Value("${redirect-url}")
	String redirect;

	@Autowired
	EntityManager em;

	@Autowired
	TeamParticipantsRepository teamParticipantsRepository;

	Long setMember(String name) {
		Member member = Member.builder()
			.memberName(name)
			.isAgree(true)
			.isAdmin(false)
			.isWithdraw(false)
			.memberBirth(LocalDate.now())
			.memberEmail(name + "@" + name + "." + name)
			.memberAddress("06220 서울 강남구 테헤란로 212 (역삼동, 멀티캠퍼스) 역삼동, 멀티캠퍼스 802호")
			.memberPhone("010-0000-0000")
			.build();
		memberRepository.save(member);
		return member.getId();
	}

	Long setTeam(Long memberId) {
		return teamService.createTeam(new TeamCreateRequestDto("1번팀", "1번팀 설명"), memberId, null).teamId();
	}

	void setContest(Long memberId, Long teamId) throws IOException {
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

		contestService.createContest(request, file, memberId);
	}

	@Test
	@DisplayName("팀 생성")
	void createTeam() {
		Long leader = setMember("leader");

		Long team = setTeam(leader);

		TeamPublicResponseDto teamPublic = teamService.findTeamPublic(team);

		assertThat(teamPublic.teamDescription()).isEqualTo("1번팀 설명");
		assertThat(teamPublic.teamImage()).isNull();
		assertThat(teamPublic.teamName()).isEqualTo("1번팀");
		assertThat(teamPublic.teamId()).isEqualTo(team);
	}

	@Test
	@DisplayName("팀 수정")
	void updateTeam() {
		Long leader = setMember("leader");
		Long member = setMember("member");

		Long team = setTeam(leader);

		TeamPublicResponseDto teamPublic = teamService.findTeamPublic(team);

		assertThat(teamPublic.teamDescription()).isEqualTo("1번팀 설명");
		assertThat(teamPublic.teamImage()).isNull();
		assertThat(teamPublic.teamName()).isEqualTo("1번팀");
		assertThat(teamPublic.teamId()).isEqualTo(team);

		TeamUpdateRequestDto teamUpdateRequestDto = new TeamUpdateRequestDto(team, "변경한 팀 이름", "변경한 팀 설명");

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.updateTeam(teamUpdateRequestDto, null, member));

		teamService.updateTeam(teamUpdateRequestDto, null, leader);

		teamPublic = teamService.findTeamPublic(team);

		assertThat(teamPublic.teamDescription()).isEqualTo("변경한 팀 설명");
		assertThat(teamPublic.teamImage()).isNull();
		assertThat(teamPublic.teamName()).isEqualTo("변경한 팀 이름");
		assertThat(teamPublic.teamId()).isEqualTo(team);
	}

	@Test
	@DisplayName("팀 코드로 팀 정보 조회")
	void findTeamInfo() {
		Long leader = setMember("leader");
		Long wait = setMember("wait");
		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.findTeamInfo(teamCode, leader));

		TeamInfoResponseDto teamInfo = teamService.findTeamInfo(teamCode, wait);
		assertThat(teamInfo.teamName()).isEqualTo("1번팀");
		assertThat(teamInfo.teamImage()).isEqualTo(prefix + "null");
	}

	@Test
	@DisplayName("팀에 가입 신청을 하지 않은 사람만 가능한 팀 참가 신청")
	void createParticipants() {
		Long leader = setMember("leader");
		Long member = setMember("member");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, member);
	}

	@Test
	@DisplayName("팀장만 가능한 팀 참가 신청 수락 or 거절")
	void updateParticipants() {
		Long leader = setMember("leader");
		Long member = setMember("member");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, member);

		List<TeamParticipantsResponseDto> teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		List<TeamParticipantsResponseDto> list = teamParticipantsResponseDto.stream()
			.filter((dto) -> !dto.isApprove())
			.toList();

		teamService.updateParticipants(new TeamParticipantsRequestDto(list.get(0).participantsId(), false), leader);

		assertThat(teamService.searchTeamMemberList(team)).hasSize(1);

		teamService.createParticipants(teamCodeRequestDto, member);

		teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		list = teamParticipantsResponseDto.stream()
			.filter((dto) -> !dto.isApprove())
			.toList();

		teamService.updateParticipants(new TeamParticipantsRequestDto(list.get(0).participantsId(), true), leader);

		assertThat(teamService.searchTeamMemberList(team)).hasSize(2);
	}

	@Test
	@DisplayName("팀장만 가능한 팀원 목록 조회")
	void searchTeamParticipantList() {
		Long leader = setMember("leader");
		Long member = setMember("member");
		Long wait = setMember("wait");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, wait);
		teamService.createParticipants(teamCodeRequestDto, member);

		List<TeamParticipantsResponseDto> teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("wait");
		assertThat(teamParticipantsResponseDto.get(2).memberName()).isEqualTo("member");

		teamService.updateParticipants(
			new TeamParticipantsRequestDto(teamParticipantsResponseDto.get(2).participantsId(), true), leader);

		em.flush();
		em.clear();

		teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);
		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("member");
		assertThat(teamParticipantsResponseDto.get(2).memberName()).isEqualTo("wait");

		assertThat(teamParticipantsResponseDto.get(1).isApprove()).isTrue();
		assertThat(teamParticipantsResponseDto.get(2).isApprove()).isFalse();
	}

	@Test
	@DisplayName("공개된 팀원 목록 조회")
	void searchTeamMemberList() {
		Long leader = setMember("leader");
		Long member = setMember("member");
		Long wait = setMember("wait");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, wait);
		teamService.createParticipants(teamCodeRequestDto, member);

		assertThat(teamService.searchTeamMemberList(team)).hasSize(1);
		assertThat(teamService.searchTeamMemberList(team).get(0).memberName()).isEqualTo("leader");

		List<TeamParticipantsResponseDto> teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("wait");
		assertThat(teamParticipantsResponseDto.get(2).memberName()).isEqualTo("member");

		teamService.updateParticipants(
			new TeamParticipantsRequestDto(teamParticipantsResponseDto.get(2).participantsId(), true), leader);

		em.flush();
		em.clear();

		teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);
		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("member");
		assertThat(teamParticipantsResponseDto.get(2).memberName()).isEqualTo("wait");

		assertThat(teamParticipantsResponseDto.get(1).isApprove()).isTrue();
		assertThat(teamParticipantsResponseDto.get(2).isApprove()).isFalse();

		assertThat(teamService.searchTeamMemberList(team)).hasSize(2);
		assertThat(teamService.searchTeamMemberList(team).get(0).memberName()).isEqualTo("leader");
		assertThat(teamService.searchTeamMemberList(team).get(1).memberName()).isEqualTo("member");
	}

	@Test
	@DisplayName("팀 멤버만 가능한 팀 정보 조회")
	void findTeam() {
		Long leader = setMember("leader");
		Long member = setMember("member");
		Long wait = setMember("wait");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, member);

		assertThat(teamService.searchTeamMemberList(team)).hasSize(1);
		assertThat(teamService.searchTeamMemberList(team).get(0).memberName()).isEqualTo("leader");

		List<TeamParticipantsResponseDto> teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("member");

		teamService.updateParticipants(
			new TeamParticipantsRequestDto(teamParticipantsResponseDto.get(1).participantsId(), true), leader);

		em.flush();
		em.clear();

		TeamResponseDto leaderDto = teamService.findTeam(team, leader);
		TeamResponseDto memberDto = teamService.findTeam(team, member);

		assertThat(leaderDto.teamImage()).isEqualTo(memberDto.teamImage());
		assertThat(leaderDto.teamId()).isEqualTo(memberDto.teamId());
		assertThat(leaderDto.teamCode()).isEqualTo(memberDto.teamCode());
		assertThat(leaderDto.teamName()).isEqualTo(memberDto.teamName());
		assertThat(leaderDto.teamDescription()).isEqualTo(memberDto.teamDescription());
		assertThat(leaderDto.isLeader()).isTrue();
		assertThat(memberDto.isLeader()).isFalse();

		assertThatExceptionOfType(BaseException.class).isThrownBy(() -> teamService.findTeam(team, wait));

	}

	@Test
	@DisplayName("공개된 팀 정보 조회")
	void findTeamPublic() {
		Long leader = setMember("leader");

		Long team = setTeam(leader);

		TeamPublicResponseDto teamPublic = teamService.findTeamPublic(team);

		assertThat(teamPublic.teamName()).isEqualTo("1번팀");
		assertThat(teamPublic.teamDescription()).isEqualTo("1번팀 설명");
		assertThat(teamPublic.teamId()).isEqualTo(team);

	}

	@Test
	@DisplayName("팀 삭제")
	void deleteTeam() {
		Long leader = setMember("leader");
		Long member = setMember("member");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, member);

		assertThat(teamService.searchTeamMemberList(team)).hasSize(1);
		assertThat(teamService.searchTeamMemberList(team).get(0).memberName()).isEqualTo("leader");

		List<TeamParticipantsResponseDto> teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("member");

		teamService.updateParticipants(
			new TeamParticipantsRequestDto(teamParticipantsResponseDto.get(1).participantsId(), true), leader);

		em.flush();
		em.clear();

		assertThat(teamParticipantsRepository.findByTeamId(team, Sort.unsorted())).hasSize(2);

		assertThatExceptionOfType(BaseException.class).isThrownBy(() -> teamService.deleteTeam(team, member));

		teamService.deleteTeam(team, leader);

		assertThat(teamParticipantsRepository.findByTeamId(team, Sort.unsorted())).isEmpty();
	}

	@Test
	@DisplayName("팀 탈퇴")
	void deleteParticipants() {

		Long leader = setMember("leader");
		Long member = setMember("member");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, member);

		assertThat(teamService.searchTeamMemberList(team)).hasSize(1);
		assertThat(teamService.searchTeamMemberList(team).get(0).memberName()).isEqualTo("leader");

		List<TeamParticipantsResponseDto> teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("member");

		teamService.updateParticipants(
			new TeamParticipantsRequestDto(teamParticipantsResponseDto.get(1).participantsId(), true), leader);

		em.flush();
		em.clear();

		assertThat(teamParticipantsRepository.findByTeamId(team, Sort.unsorted())).hasSize(2);

		assertThatExceptionOfType(BaseException.class).isThrownBy(() -> teamService.deleteParticipants(team, leader));

		teamService.deleteParticipants(team, member);

		assertThat(teamParticipantsRepository.findByTeamId(team, Sort.unsorted())).hasSize(1);

	}

	@Test
	@DisplayName("팀 리더 변경")
	void updateTeamLeader() {

		Long leader = setMember("leader");
		Long member = setMember("member");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, member);

		assertThat(teamService.searchTeamMemberList(team)).hasSize(1);
		assertThat(teamService.searchTeamMemberList(team).get(0).memberName()).isEqualTo("leader");

		List<TeamParticipantsResponseDto> teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("member");

		teamService.updateParticipants(
			new TeamParticipantsRequestDto(teamParticipantsResponseDto.get(1).participantsId(), true), leader);

		em.flush();
		em.clear();

		Long id = teamParticipantsRepository.findByTeamIdAndMemberId(team, member)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR)).getId();

		teamService.updateTeamLeader(new TeamUpdateLeaderRequestDto(team, id), leader);
		em.flush();
		em.clear();

		List<TeamMemberResponseDto> teamMemberResponseDto = teamService.searchTeamMemberList(team);
		assertThat(teamMemberResponseDto.get(0).memberName()).isEqualTo("member");
		assertThat(teamMemberResponseDto.get(1).memberName()).isEqualTo("leader");

		teamParticipantsResponseDto = teamService.searchTeamParticipantList(team, member);

		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("member");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("leader");

	}

	@Test
	@DisplayName("팀이 개최한 대회 목록 조회")
	void searchTeamContestList() throws IOException {
		Long leader = setMember("leader");

		Long team = setTeam(leader);

		assertThat(teamService.searchTeamContestList(team, Pageable.ofSize(10)).getContent()).isEmpty();
		setContest(leader, team);
		setContest(leader, team);
		assertThat(teamService.searchTeamContestList(team, Pageable.ofSize(10)).getContent()).hasSize(2);
	}

	@Test
	@DisplayName("팀원 방출")
	void deleteTeamParticipant() {
		Long leader = setMember("leader");
		Long member = setMember("member");

		Long team = setTeam(leader);

		String teamCode = teamRepository.findById(team)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamCode();

		TeamCodeRequestDto teamCodeRequestDto = new TeamCodeRequestDto(teamCode);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.createParticipants(teamCodeRequestDto, leader));

		teamService.createParticipants(teamCodeRequestDto, member);

		assertThat(teamService.searchTeamMemberList(team)).hasSize(1);
		assertThat(teamService.searchTeamMemberList(team).get(0).memberName()).isEqualTo("leader");

		List<TeamParticipantsResponseDto> teamParticipantsResponseDto = teamService.searchTeamParticipantList(team,
			leader);

		assertThat(teamParticipantsResponseDto.get(0).memberName()).isEqualTo("leader");
		assertThat(teamParticipantsResponseDto.get(1).memberName()).isEqualTo("member");

		teamService.updateParticipants(
			new TeamParticipantsRequestDto(teamParticipantsResponseDto.get(1).participantsId(), true), leader);

		em.flush();
		em.clear();

		assertThat(teamParticipantsRepository.findByTeamId(team, Sort.unsorted())).hasSize(2);

		Long leaderId = teamParticipantsRepository.findByTeamIdAndMemberId(team, leader)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getId();

		Long memberId = teamParticipantsRepository.findByTeamIdAndMemberId(team, member)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getId();

		TeamParticipantDeleteRequestDto teamParticipantDeleteRequestDto = new TeamParticipantDeleteRequestDto(leaderId);

		assertThatExceptionOfType(BaseException.class).isThrownBy(
			() -> teamService.deleteTeamParticipant(teamParticipantDeleteRequestDto, member));

		teamService.deleteTeamParticipant(new TeamParticipantDeleteRequestDto(memberId), leader);

		assertThat(teamParticipantsRepository.findByTeamId(team, Sort.unsorted())).hasSize(1);
	}
}