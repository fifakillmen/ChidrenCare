package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.configuration.Security.CustomUserDetails;
import com.v1.ChildrenCare.configuration.Security.jwt.JwtTokenUtil;
import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import com.v1.ChildrenCare.request.AccountRequest;
import com.v1.ChildrenCare.request.LoginRespone;
import com.v1.ChildrenCare.service.AuthService;
import com.v1.ChildrenCare.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;


@Service
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthServiceImpl( UserService userService, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public ResponseEntity<?> login(AccountRequest accountRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(accountRequest.getEmail(), accountRequest.getPassword())
        );
        CustomUserDetails accountDetail = (CustomUserDetails) authentication.getPrincipal();

        Account myAccount = accountDetail.getAccount();
        LoginRespone loginResponse = new LoginRespone();
        loginResponse.setEmail(myAccount.getEmail());
        UserDto userDto= userService.findUserByEmail(myAccount.getEmail());
        loginResponse.setFname(userDto.getFirstName());
        loginResponse.setLname(userDto.getLastName());
        loginResponse.setAvatar(userDto.getAvartaLink());
        loginResponse.setAccessToken(myAccount.getAccessToken());

        loginResponse.setCreated_date(myAccount.getCreatedDate());
        loginResponse.setIs_access_token_active(myAccount.getAccessTokenActive());
        if (myAccount.getCreatedBy()!=null){
            loginResponse.setCreatedBy_UserId(myAccount.getCreatedBy().getId());
        }else{
            loginResponse.setCreatedBy_UserId(null);
        }
        loginResponse.setIs_account_active(myAccount.getIsActive());
        loginResponse.setModifiedBy_UserId(myAccount.getModifiedBy_UserId());
        loginResponse.setAccessToken(jwtTokenUtil.generateAccessToken(accountDetail));

        return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,loginResponse));
    }

    @Override
    public ResponseEntity<?> checkAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String accessToken = header.split(" ")[1];
        if (jwtTokenUtil.validateAccessToken(accessToken)) {
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,true));
        }
        return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body(false);    }
}
