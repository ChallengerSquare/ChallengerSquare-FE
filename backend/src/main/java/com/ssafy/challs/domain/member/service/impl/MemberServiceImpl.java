package com.ssafy.challs.domain.member.service.impl;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.ssafy.challs.domain.auth.jwt.dto.TokenCookie;
import com.ssafy.challs.domain.auth.jwt.repository.RefreshTokenRepository;
import com.ssafy.challs.domain.auth.jwt.service.CookieUtil;
import com.ssafy.challs.domain.auth.jwt.service.TokenProvider;
import com.ssafy.challs.domain.member.dto.request.MemberCreateRequestDto;
import com.ssafy.challs.domain.member.dto.request.MemberUpdateRequestDto;
import com.ssafy.challs.domain.member.dto.response.MemberFindResponseDto;
import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.member.repository.MemberRepository;
import com.ssafy.challs.domain.member.service.MemberService;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final RefreshTokenRepository refreshTokenRepository;
	private final TokenProvider tokenProvider;
	private final CookieUtil cookieUtil;

	/**
	 * refresh token을 기준으로 새로운 accessToken과 refreshToken 발급
	 * @author 강태연
	 * @param refreshToken refreshToken
	 * @return 토큰을 저장할 HttpHeaders
	 */
	@Override
	@Transactional
	public HttpHeaders createToken(String refreshToken) {
		if (!tokenProvider.validationToken(refreshToken)) {
			throw new BaseException(ErrorCode.WRONG_TOKEN_ERROR);
		}
		String idFromToken = tokenProvider.getIdFromToken(refreshToken);
		String memberId = refreshTokenRepository.getAndRemove(idFromToken);
		if (memberId == null) {
			throw new BaseException(ErrorCode.WRONG_TOKEN_ERROR);
		}
		TokenCookie tokenCookie = tokenProvider.makeTokenCookie(memberId);
		return getHeaders(tokenCookie);
	}

	/**
	 * refresh token을 redis에서 삭제하고 cookie를 삭제
	 * @author 강태연
	 * @param refreshToken refreshToken
	 * @return 토큰을 저장할 HttpHeaders
	 */
	@Override
	@Transactional
	public HttpHeaders deleteRefreshToken(String refreshToken) {
		if (!tokenProvider.validationToken(refreshToken)) {
			throw new BaseException(ErrorCode.WRONG_TOKEN_ERROR);
		}
		String idFromToken = tokenProvider.getIdFromToken(refreshToken);
		refreshTokenRepository.remove(idFromToken);
		TokenCookie tokenCookie = cookieUtil.deleteCookie();
		return getHeaders(tokenCookie);
	}

	// 생성한 쿠키를 저장할 headers 생성
	private HttpHeaders getHeaders(TokenCookie tokenCookie) {
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add(HttpHeaders.SET_COOKIE, tokenCookie.accessCookie().toString());
		httpHeaders.add(HttpHeaders.SET_COOKIE, tokenCookie.refreshCookie().toString());
		return httpHeaders;
	}

	/**
	 * 회원가입
	 * @author 강태연
	 * @param memberCreateRequestDto 회원가입에 필요한 정보
	 * @param memberId 회원 pk
	 */
	@Override
	@Transactional
	public void createMember(MemberCreateRequestDto memberCreateRequestDto, Long memberId) {
		memberRepository.createMember(memberCreateRequestDto, memberId);
	}

	/**
	 * 정보수정
	 * @author 강태연
	 * @param memberUpdateRequestDto 정보수정에 필요한 정보
	 * @param memberId 회원 pk
	 */
	@Override
	@Transactional
	public void updateMember(MemberUpdateRequestDto memberUpdateRequestDto, Long memberId) {
		memberRepository.updateMember(memberUpdateRequestDto, memberId);
	}

	/**
	 * 정보 조회
	 * @author 강태연
	 * @param memberId 회원 pk
	 * @return 회원 조회 결과
	 */
	@Override
	public MemberFindResponseDto findMember(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new BaseException(ErrorCode.MEMBER_FOUND_ERROR));
		return new MemberFindResponseDto(member.getMemberName(), member.getMemberBirth(), member.getMemberPhone(),
			member.getMemberAddress());
	}

	/**
	 * 회원 탈퇴
	 * @author 강태연
	 * @param memberId 회원 pk
	 */
	@Override
	@Transactional
	public void deleteMember(Long memberId) {
		memberRepository.deleteMember(memberId);
	}

}
