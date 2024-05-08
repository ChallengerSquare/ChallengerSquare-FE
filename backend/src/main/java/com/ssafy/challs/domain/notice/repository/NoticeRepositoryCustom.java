package com.ssafy.challs.domain.notice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.challs.domain.notice.dto.response.NoticeResponseDto;

public interface NoticeRepositoryCustom {
	Page<NoticeResponseDto> searchNoticeList(Pageable pageable, Long contestId);
}
