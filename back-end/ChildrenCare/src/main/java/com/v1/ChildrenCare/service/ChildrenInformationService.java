package com.v1.ChildrenCare.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.entity.Children;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import com.v1.ChildrenCare.repository.ChildInformationRepository;
import com.v1.ChildrenCare.request.ChildrenRequest;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class ChildrenInformationService {
    @Resource
    private ChildInformationRepository childInformationRepository;

    public ResponseEntity<Result> createAndEdit(ChildrenRequest request) {
        try {
            createAndEditChildren(request);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, null));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }

    public ResponseEntity<Result> delete(Long id) {
        try {
            deleteChildren(id);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, null));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }

    private void createAndEditChildren(ChildrenRequest request) {
        Children childInformation = null;
        if (request.getId() != null) {
            childInformation = childInformationRepository.findById(request.getId()).orElseThrow(() -> new NotFoundException("Not found children"));
        } else {
            childInformation = new Children();
            childInformation.setCreatedDate(LocalDate.from(LocalDateTime.now()));
        }
        childInformation.setFirstName(request.getFirstName());
        childInformation.setLastName(request.getLastName());
        childInformation.setDob(request.getDob());
        childInformation.setNote(request.getNote());
//        childInformation.setIsActive();
        childInformationRepository.save(childInformation);
    }

    private void deleteChildren(Long id) {
        Children childInformation = childInformationRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found children"));
        childInformationRepository.delete(childInformation);
    }
}
