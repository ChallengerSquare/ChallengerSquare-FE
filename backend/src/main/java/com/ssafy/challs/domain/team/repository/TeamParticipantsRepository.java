package com.ssafy.challs.domain.team.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import com.ssafy.challs.domain.team.entity.TeamParticipants;

public interface TeamParticipantsRepository
	extends JpaRepository<TeamParticipants, Long>, TeamParticipantsRepositoryCustom {

	// 멤버와 팀을 넘겨줘서 해당 멤버가 해당 팀의 리더인지 확인
	boolean existsByMemberIdAndTeamIdAndIsLeaderTrue(Long memberId, Long teamId);

	// 멤버와 팀을 넘겨줘서 해당 멤버가 해당 팀을 신청중인지 확인
	boolean existsByMemberIdAndTeamId(Long memberId, Long teamId);

	// 팀 참가 신청 삭제
	void deleteById(@NonNull Long id);

	// 이미 팀에 참가 된 사람인지
	boolean existsByIdAndIsParticipantsTrue(Long id);

	// 팀장이 팀원, 팀 참가 신청 한 인원을 조회할 경우
	List<TeamParticipants> findByTeamId(Long teamId, Sort sort);

	// 팀원이 팀원을 조회할 경우
	List<TeamParticipants> findByTeamIdAndIsParticipantsTrue(Long teamId, Sort sort);

	Optional<TeamParticipants> findByTeamIdAndMemberId(Long teamId, Long memberId);

	void deleteByTeamId(Long teamId);

}
