package com.ssafy.challs.domain.auth.oauth2.service;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ssafy.challs.domain.auth.oauth2.dto.OAuth2UserInfo;
import com.ssafy.challs.domain.auth.oauth2.dto.PrincipalDetails;
import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.member.repository.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;

	@Transactional
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		Map<String, Object> oAuth2UserAttributes = super.loadUser(userRequest).getAttributes();
		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		String userNameAttributeName = userRequest.getClientRegistration()
			.getProviderDetails()
			.getUserInfoEndpoint()
			.getUserNameAttributeName();
		OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfo.of(registrationId, oAuth2UserAttributes);
		Member member = getOrSave(oAuth2UserInfo);
		return new PrincipalDetails(member, oAuth2UserAttributes, userNameAttributeName);
	}

	// 사용자 조회, 없는 경우 저장
	private Member getOrSave(OAuth2UserInfo oAuth2UserInfo) {
		Member member = memberRepository.findByMemberProviderAndMemberProviderIdAndIsWithdrawIsFalse(
			oAuth2UserInfo.provider(), oAuth2UserInfo.providerId()).orElseGet(oAuth2UserInfo::toEntity);
		return memberRepository.save(member);
	}

}
