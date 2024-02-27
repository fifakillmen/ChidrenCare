package com.v1.ChildrenCare.controller;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.request.ChildrenRequest;
import com.v1.ChildrenCare.service.ChildrenInformationService;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/child-information")
public class ChildInformationController {
    @Resource
    private ChildrenInformationService childrenInformationService;

    @PostMapping("/create")
    public ResponseEntity<Result> createAndEdit(@RequestBody ChildrenRequest request) {
        return childrenInformationService.createAndEdit(request);
    }

    @GetMapping("/delete")
    public ResponseEntity<Result> delete(@RequestParam("id") Long id) {
        return childrenInformationService.delete(id);
    }
}
