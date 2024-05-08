package com.ssafy.challs.global.common.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class S3ImageUploader {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3Client amazonS3Client;

	public String uploadImage(MultipartFile originalImage, String location, String number) {
		String newFIleName = location + "_" + number + ".jpg";
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType(originalImage.getContentType());
		objectMetadata.setContentLength(originalImage.getSize());
		try {
			amazonS3Client.putObject(
				new PutObjectRequest(bucket, newFIleName, originalImage.getInputStream(), objectMetadata).withCannedAcl(
					CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new BaseException(ErrorCode.IO_ERROR);
		}
		return newFIleName;
	}

	public void deleteImage(String fileName) {
		amazonS3Client.deleteObject(bucket, fileName);
	}

}
