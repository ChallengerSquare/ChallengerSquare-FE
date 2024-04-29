package com.ssafy.challs.domain.alert.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.alert.entity.Alert;
import com.ssafy.challs.domain.alert.entity.AlertMember;

public interface AlertMemberRepository extends JpaRepository<AlertMember, Long> {

	List<AlertMember> findAllByMemberCode(String memberCode);

	List<AlertMember> findAllByMemberCodeAndIsRead(String memberCode, Boolean isRead);

	Optional<AlertMember> findAlertMembersByMemberCodeAndAlert(String memberCode, Alert alert);

}
