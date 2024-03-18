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
@RequestMapping("/manager/service")
public class ServiceController {
    @Autowired
    private ServiceChildrenService serviceChildrenService;

    @GetMapping("/getlist")
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

    @GetMapping("/detail")
    public ResponseEntity<GeneralResponse> getServiceDetail(@RequestParam("id") Long id) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(serviceChildrenService.findServiceById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<GeneralResponse> addService(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value ="serviceTitle", required = true) String serviceTitle,
            @RequestParam(value ="serviceDetail", required = false) String serviceDetail,
            @RequestParam(value = "categoryId", required = false) Long categoryId,
            @RequestParam(value = "createdBy", required = false) Long createdBy,
            @RequestParam(value =  "price", required = false) String price,
            @RequestParam(value =  "salePrice", required = false) String salePrice) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(serviceChildrenService.saveService(null, serviceTitle, serviceDetail, price, salePrice, categoryId, "ACTIVE", createdBy, null)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @PutMapping("/update")
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

    @DeleteMapping("/delete")
    public ResponseEntity<GeneralResponse> deleteService(@RequestParam("id") Long id) {
        try {
            serviceChildrenService.deleteService(id);
            return ResponseEntity.ok(GeneralResponse.of("Delete success"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    // user api

    @GetMapping("user/service/getlist")
    public ResponseEntity<GeneralResponse> userGetListService(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "categoryId", required = false) Long categoryId) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(serviceChildrenService.findAllService(page, size, search, categoryId, "ACTIVE")));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @GetMapping("user/service/detail")
    public ResponseEntity<GeneralResponse> userGetServiceDetail(@RequestParam("id") Long id) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(serviceChildrenService.findServiceById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }


}
