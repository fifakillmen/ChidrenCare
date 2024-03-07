package com.v1.ChildrenCare.controller;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.request.ChildrenRequest;
import com.v1.ChildrenCare.request.SearchChildrenRequest;
import com.v1.ChildrenCare.service.ChildrenService;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/children")
public class ChildController {
    @Resource
    private ChildrenService childrenService;

    @PostMapping("/search")
    public ResponseEntity<Result> createAndEdit(@RequestBody SearchChildrenRequest request) {
        return childrenService.search(request);
    }

    @PostMapping("/create")
    public ResponseEntity<Result> createAndEdit(@RequestBody ChildrenRequest request) {
        return childrenService.createAndEdit(request);
    }
    @GetMapping("/list")
    public ResponseEntity<Result> getListChildren() {
        return childrenService.getAllChildren();
    }

    @GetMapping("/delete")
    public ResponseEntity<Result> delete(@RequestParam("id") Long id) {
        return childrenService.delete(id);
    }

    @GetMapping("/detail")
    public ResponseEntity<Result> detail(@RequestParam("id") Long id) {
        return childrenService.detail(id);
    }
}
