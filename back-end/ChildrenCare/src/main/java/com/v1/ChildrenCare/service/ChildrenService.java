package com.v1.ChildrenCare.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.entity.Children;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import com.v1.ChildrenCare.repository.ChildRepository;
import com.v1.ChildrenCare.request.ChildrenRequest;
import com.v1.ChildrenCare.request.SearchChildrenRequest;
import jakarta.annotation.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChildrenService {
    @Resource
    private ChildRepository childRepository;

    public ResponseEntity<Result> createAndEdit(ChildrenRequest request) {
        try {
            createAndEditChildren(request);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }
    public ResponseEntity<Result> getAllChildren() {
        return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, childRepository.findAll()));
    }
    public ResponseEntity<Result> delete(Long id) {
        try {
            deleteChildren(id);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }

    public ResponseEntity<Result> detail(Long id) {
        try {
            detailChildren(id);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, detailChildren(id)));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }

    public ResponseEntity<Result> search(SearchChildrenRequest request) {
        try {
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, searchChildren(request)));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }

    private void createAndEditChildren(ChildrenRequest request) {
        Children child = null;
        if (request.getId() != null) {
            child = childRepository.findById(request.getId()).orElseThrow(() -> new NotFoundException("Not found children"));
        } else {
            child = new Children();
            child.setCreatedDate(LocalDate.from(LocalDateTime.now()));
        }
        child.setFirstName(request.getFirstName());
        child.setLastName(request.getLastName());
        child.setDob(request.getDob());
        child.setNote(request.getNote());
        child.setAge(request.getAge());
        child.setGender(request.getGender());
        child.setIsActive(enumActive.valueOf(request.getIsActive()));
        childRepository.save(child);
    }

    private void deleteChildren(Long id) {
        Children child = childRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found children"));
        childRepository.delete(child);
    }

    private Children detailChildren(Long id) {
        Children child = childRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found children"));
        return child;
    }

    private List<Children> searchChildren(SearchChildrenRequest request) {
        PageRequest pageable = PageRequest.of(request.getPageNumber(), 10);
        Page<Children> page = childRepository.search(request.getName(), request.getIsActive(), request.getAgeMin(), request.getAgeMax(), pageable);
        return page.toList();
    }


}
