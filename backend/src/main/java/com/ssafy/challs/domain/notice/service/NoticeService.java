package com.ssafy.challs.domain.notice.service;

import com.ssafy.challs.domain.notice.dto.request.NoticeCreateRequestDto;

public interface NoticeService {
	void createNotice(NoticeCreateRequestDto noticeCreateRequestDto, Long memberId);
}
