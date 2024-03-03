package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.entity.Blog;
import com.v1.ChildrenCare.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ServiceChildrenService {
//    Page<Service> findAllService(Pageable pageable, @Param("search") String search, @Param("categoryId") Long categoryId, @Param("isActive") String isActive);

    List<Service> findAllService(int page, int size, String search, Long categoryId, String isActive);
    Service saveService(Long serviceId, String serviceTitle, String serviceDetail, String price, String salePrice, Long categoryId, String isActive, Long createBy, MultipartFile file);
    Service updateService(Long serviceId, String serviceTitle, String serviceDetail, String price, String salePrice, Long categoryId, String isActive, Long createBy, MultipartFile file);

    Service findServiceById(Long id);

    void deleteService(Long id);
}
