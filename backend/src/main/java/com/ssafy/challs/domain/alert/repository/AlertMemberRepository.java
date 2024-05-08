package com.ssafy.challs.domain.alert.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.alert.entity.Alert;
import com.ssafy.challs.domain.alert.entity.AlertMember;

public interface AlertMemberRepository extends JpaRepository<AlertMember, Long> {

	List<AlertMember> findAllByMemberId(Long memberId);

	List<AlertMember> findAllByMemberIdAndIsRead(Long memberId, Boolean isRead);

	boolean existsByMemberIdAndIsRead(Long memberId, Boolean isRead);

	Optional<AlertMember> findAlertMembersByMemberIdAndAlert(Long memberId, Alert alert);

}
