package com.v1.ChildrenCare.service.serviceImpl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.v1.ChildrenCare.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import static com.amazonaws.services.s3.model.CannedAccessControlList.PublicRead;

@Service
public class StorageServiceImpl implements StorageService {
    @Value("${application.bucket.name}")
    private String bucketName;
    @Autowired
    private AmazonS3 s3Client;


    @Override
    public String uploadFile(MultipartFile multipartFile) {
        File fileObject= convertMultipartFiletoFile(multipartFile);
        String filename=System.currentTimeMillis()+"_"+multipartFile.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName,filename,fileObject));
        s3Client.setObjectAcl(bucketName,filename,PublicRead);
        fileObject.delete();
        return filename;
    }

    @Override
    public String downloadFile(String fileName) {
       S3Object s3Object= s3Client.getObject(bucketName,fileName);
        S3ObjectInputStream inputStream= s3Object.getObjectContent();
        try{
        byte[] content= IOUtils.toByteArray(inputStream);
        }catch (IOException e ){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean deleteFile(String fileName) {
        s3Client.deleteObject(bucketName,fileName);
        return true;
    }

    @Override
    public String getFileLink(String fileName) {
        return s3Client.getUrl(bucketName,fileName).toString();
    }

    private File convertMultipartFiletoFile(MultipartFile file){
        File convertedFile=new File(file.getOriginalFilename());
        try(FileOutputStream fos=new FileOutputStream(convertedFile)){
            fos.write(file.getBytes());
        }catch (IOException e){
            System.out.println("Error converting multipartFile to file: "+e.getMessage());
        }
        return convertedFile;
    }
}
