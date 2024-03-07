package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.configuration.Security.CustomUserDetails;
import com.v1.ChildrenCare.configuration.Security.jwt.JwtTokenUtil;
import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import com.v1.ChildrenCare.repository.AccountRepository;
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
    private final AccountRepository accountRepository;

    public AuthServiceImpl( UserService userService, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil,
                            AccountRepository accountRepository) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.accountRepository = accountRepository;
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
        loginResponse.setCreated_date(myAccount.getCreatedDate());
        if (myAccount.getCreatedBy()!=null){
            loginResponse.setCreatedBy_UserId(myAccount.getCreatedBy().getId());
        }else{
            loginResponse.setCreatedBy_UserId(null);
        }
        loginResponse.setIs_account_active(myAccount.getIsActive());
        loginResponse.setModifiedBy_UserId(myAccount.getModifiedBy_UserId());

        String accessToken = jwtTokenUtil.generateAccessToken(accountDetail);
        loginResponse.setAccessToken(accessToken);
        loginResponse.setIs_access_token_active(true);
        // luu vao db thong tin access token
        Account account= accountRepository.findByEmail(myAccount.getEmail());
        account.setAccessToken(accessToken);
        account.setAccessTokenActive(true);
        accountRepository.save(account);
        //

        UserDto userDto= userService.findUserByEmail(myAccount.getEmail());
        if (userDto != null){
            loginResponse.setFname(userDto.getFirstName());
            loginResponse.setLname(userDto.getLastName());
            loginResponse.setAvatar(userDto.getAvartaLink());
        }

        return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,loginResponse));
    }

    @Override
    public ResponseEntity<?> checkAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String accessToken = header.split(" ")[1];
        if (jwtTokenUtil.validateAccessToken(accessToken)) {
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,true));
        }
        return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body(false);
    }
}
