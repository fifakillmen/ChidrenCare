package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.entity.Category;
import com.v1.ChildrenCare.entity.Service;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.repository.*;
import com.v1.ChildrenCare.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceChildrenServiceImpl implements ServiceChildrenService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Service> findAllService(int page, int size, String search, Long categoryId, String isActive) {
        if (isActive == null) {
            return serviceRepository.findAllService(PageRequest.of(page, size), search, categoryId).getContent();
        }
        enumActive enumActiveValue;
        try {
            enumActiveValue = enumActive.valueOf(isActive);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid value for isActive: " + isActive, e);
        }
        return serviceRepository.findAllService(PageRequest.of(page, size), search, categoryId, enumActiveValue).getContent();
    }

    @Override
    public Service saveService(Long serviceId, String serviceTitle, String serviceDetail, String price, String salePrice, Long categoryId, String isActive, String createBy, MultipartFile file) {
        Service service;
        if (serviceId == null) {
            service = new Service();
        } else {
            service = serviceRepository.findById(serviceId).orElse(null);

        }
        service.setServiceTitle(serviceTitle);
        service.setServiceDetail(serviceDetail);
        service.setServicePrice(price);
        service.setSalePrice(salePrice);
        Category category = categoryRepository.findById(categoryId).orElse(null);
        service.setCategory(category);
        if (isActive != null) {
            enumActive enumActiveValue;
            try {
                enumActiveValue = enumActive.valueOf(isActive);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid value for isActive: " + isActive, e);
            }
            service.setIsActive(enumActiveValue);
        }
        if (file != null) {
            String fileName = storageService.uploadFile(file);
            service.setThumbnail(fileName);
        }
        service.setUpdatedDate(LocalDate.now());
        service = serviceRepository.save(service);
        return service;
    }

    @Override
    public Service updateService(Long serviceId, String serviceTitle, String serviceDetail, String price, String salePrice, Long categoryId, String isActive, String createBy, MultipartFile file) {
        Service service = serviceRepository.findById(serviceId).orElse(null);
        if(service == null){
            throw new IllegalArgumentException("Service not found");
        }
        if (serviceTitle != null) {
            service.setServiceTitle(serviceTitle);
        }
        if (serviceDetail != null) {
            service.setServiceDetail(serviceDetail);
        }
        if (price != null) {
            service.setServicePrice(price);
        }
        if (salePrice != null) {
            service.setSalePrice(salePrice);
        }
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            service.setCategory(category);
        }
        if (isActive != null) {
            enumActive enumActiveValue;
            try {
                enumActiveValue = enumActive.valueOf(isActive);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid value for isActive: " + isActive, e);
            }
            service.setIsActive(enumActiveValue);
        }
        if (file != null) {
            String fileName = storageService.uploadFile(file);
            service.setThumbnail(fileName);
        }
        service.setUpdatedDate(LocalDate.now());
        service = serviceRepository.save(service);
        return service;
    }

//    @Override
//    public Service addService(Service service, MultipartFile file, Long createdBy) {
//        service.setCreatedDate(LocalDate.now());
//        service.setUpdatedDate(LocalDate.now());
//        service.setCreatedBy(userRepository.findById(createdBy).orElse(null));
//        if (service.getCreatedBy() == null) {
//            return null;
//        }
//        if (file != null) {
//            String fileName = storageService.uploadFile(file);
//            service.setThumbnail(fileName);
//        }
//        service = serviceRepository.save(service);
//        return service;
//    }

    @Override
    public Service findServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}
