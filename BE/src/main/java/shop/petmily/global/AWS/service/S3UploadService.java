package shop.petmily.global.AWS.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3UploadService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String saveFile(MultipartFile originalIMG) {
        checkIMG(originalIMG);

        try {
            String uniqueFileName = UUID.randomUUID() + "_" + originalIMG.getOriginalFilename();
            File resizeIMG = resizeIMG(originalIMG);

            amazonS3.putObject(new PutObjectRequest(bucket, uniqueFileName, resizeIMG).withCannedAcl(CannedAccessControlList.PublicRead));

            resizeIMG.delete();

            return amazonS3.getUrl(bucket, uniqueFileName).toString().replace(bucket, "bucketUrl");
        } catch (SdkClientException | IOException e) {
            throw new BusinessLogicException(ExceptionCode.FILE_UPLOAD_FAILED);
        }
    }

    public void deleteFile(String fileName) {
        String originalFileName = fileName.substring(fileName.lastIndexOf("com/") + 4);
        amazonS3.deleteObject(bucket, originalFileName);
    }

    private void checkIMG(MultipartFile multipartFile) {
        if (!multipartFile.getContentType().contains("image"))
            throw new BusinessLogicException(ExceptionCode.NO_IMG);
    }

    private File resizeIMG(MultipartFile multipartFile) throws IOException {
        try {
            File file = new File(System.getProperty("java.io.tmpdir") + "/" + multipartFile.getOriginalFilename());
            String formatName = multipartFile.getContentType().split("/")[1];
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(multipartFile.getBytes());
            }

            BufferedImage originalImage = ImageIO.read(file);
            int originWidth = originalImage.getWidth();
            int originHeight = originalImage.getHeight();

            if (originWidth < 500) return file;

            double ratio = (double) originHeight / (double) originWidth;
            int height = (int) Math.round(500 * ratio);

            java.awt.Image scaledImage = originalImage.getScaledInstance(500, height, java.awt.Image.SCALE_SMOOTH);
            BufferedImage resizedImage = new BufferedImage(500, height, BufferedImage.TYPE_INT_RGB);
            resizedImage.getGraphics().drawImage(scaledImage, 0, 0, null);

            File resizedFile = new File(System.getProperty("java.io.tmpdir") + "/resized_" + multipartFile.getOriginalFilename());
            ImageIO.write(resizedImage, formatName, resizedFile);

            return resizedFile;
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.FILE_RESIZE_FAILED);
        }
    }
}