package com.ssafy.challs.global.common.exception;

import lombok.Getter;

@Getter
public class BaseException extends RuntimeException {
	private final ErrorCode errorCode;

	public BaseException(ErrorCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}

	public BaseException(String message, ErrorCode errorCode) {
		super(message);
		this.errorCode = errorCode;
	}

	public int getStatus() {
		return errorCode.getStatus();
	}

	public String getCode() {
		return errorCode.getCode();
	}

}