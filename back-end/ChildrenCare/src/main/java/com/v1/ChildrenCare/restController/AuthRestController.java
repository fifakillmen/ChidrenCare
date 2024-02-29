package com.v1.ChildrenCare.restController;

import com.v1.ChildrenCare.request.AccountRequest;
import com.v1.ChildrenCare.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthRestController {
    private final AuthService authService;

    public AuthRestController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated AccountRequest accountRequest) {
        return authService.login(accountRequest);
    }
    @PostMapping("/checkAccessToken")
    public ResponseEntity<?> checkAccessToken(HttpServletRequest request) {
        return authService.checkAccessToken(request);
    }
}
