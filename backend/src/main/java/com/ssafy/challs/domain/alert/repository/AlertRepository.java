package com.ssafy.challs.domain.alert.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.challs.domain.alert.entity.Alert;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
}
