package com.v1.ChildrenCare.controller;

import com.v1.ChildrenCare.dto.response.GeneralResponse;
import com.v1.ChildrenCare.entity.Service;
import com.v1.ChildrenCare.service.BlogService;
import com.v1.ChildrenCare.service.ServiceChildrenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/")
public class ServiceController {
    @Autowired
    private ServiceChildrenService serviceChildrenService;

    @GetMapping("manager/service/getlist")
    public ResponseEntity<GeneralResponse> getListService(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "categoryId", required = false) Long categoryId,
            @RequestParam(value = "isActive", defaultValue = "") String isActive) {
        try {
            if (isActive.equals("")) {
                isActive = null;
            }
            return ResponseEntity.ok(GeneralResponse.of(serviceChildrenService.findAllService(page, size, search, categoryId, isActive)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @GetMapping("manager/service/detail")
    public ResponseEntity<GeneralResponse> getServiceDetail(@RequestParam("id") Long id) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(serviceChildrenService.findServiceById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @PostMapping("manager/service/add")// TODO: set category, price salePrice and serviceDetail and createdBy and createdDate
    public ResponseEntity<GeneralResponse> addService(
            @RequestParam("file") MultipartFile file,
            @RequestParam("serviceTitle") String serviceTitle,
            @RequestParam("serviceDetail") String serviceDetail,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("createdBy") Long createdBy,
            @RequestParam("price") String price,
            @RequestParam("salePrice") String salePrice) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(serviceChildrenService.saveService(null, serviceTitle, serviceDetail, price, salePrice, categoryId, "ACTIVE", createdBy, file)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @PutMapping("manager/service/update")
    public ResponseEntity<GeneralResponse> updateService(
            @RequestParam(value = "serviceId", required = true) Long serviceId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "serviceTitle", required = false) String serviceTitle,
            @RequestParam(value = "serviceDetail", required = false) String serviceDetail,
            @RequestParam(value = "price", required = false) String price,
            @RequestParam(value = "salePrice", required = false) String salePrice,
            @RequestParam(value = "createdBy", required = false) Long createdBy,
            @RequestParam(value = "categoryId", required = false) Long categoryId,
            @RequestParam(value = "isActive", required = false) String isActive) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(serviceChildrenService.updateService(serviceId, serviceTitle, serviceDetail, price, salePrice, categoryId, isActive, createdBy, file)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @DeleteMapping("manager/service/delete")
    public ResponseEntity<GeneralResponse> deleteService(@RequestParam("id") Long id) {
        try {
            serviceChildrenService.deleteService(id);
            return ResponseEntity.ok(GeneralResponse.of("Delete success"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }
}
