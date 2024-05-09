package com.ssafy.challs.domain.notice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.challs.domain.notice.dto.request.NoticeCreateRequestDto;
import com.ssafy.challs.domain.notice.dto.response.NoticeResponseDto;

public interface NoticeService {
	void createNotice(NoticeCreateRequestDto noticeCreateRequestDto, Long memberId);

	Page<NoticeResponseDto> searchNoticeList(Long contestId, Pageable pageable);
}
