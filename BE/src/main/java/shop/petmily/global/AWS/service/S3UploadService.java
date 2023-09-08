package shop.petmily.global.AWS.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3UploadService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String saveFile(MultipartFile multipartFile){
        try {
            String originalFilename = multipartFile.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID() + "_" + originalFilename;

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(multipartFile.getSize());
            metadata.setContentType(multipartFile.getContentType());

            amazonS3.putObject(bucket, uniqueFileName, multipartFile.getInputStream(), metadata);
            String savePath = amazonS3.getUrl(bucket, uniqueFileName).toString();

            return savePath.replace(bucket, "bucketUrl");
        } catch (SdkClientException | IOException e){
            throw new BusinessLogicException(ExceptionCode.FILE_UPLOAD_FAILED);
        }
    }

    public void deleteFile(String fileName){
            String originalFileName = fileName.substring(fileName.lastIndexOf("com/") + 4);
            amazonS3.deleteObject(bucket, originalFileName);
    }
}