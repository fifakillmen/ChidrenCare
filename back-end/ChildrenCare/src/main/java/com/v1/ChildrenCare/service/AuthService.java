package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.request.AccountRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

public interface AuthService {
    ResponseEntity<?> login (AccountRequest accountRequest);
    ResponseEntity<?> checkAccessToken (HttpServletRequest request);
}
