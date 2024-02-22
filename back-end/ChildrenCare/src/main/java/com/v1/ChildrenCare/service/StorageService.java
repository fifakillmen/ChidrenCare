package com.v1.ChildrenCare.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    public String uploadFile(MultipartFile multipartFile);
    public String downloadFile(String fileName);
    public boolean deleteFile(String fileName);
    public String getFileLink(String fileName);
}
