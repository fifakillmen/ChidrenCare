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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
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
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(accountRequest.getEmail(), accountRequest.getPassword())
            );
            CustomUserDetails accountDetail = (CustomUserDetails) authentication.getPrincipal();
            Account myAccount = accountDetail.getAccount();
            if (myAccount.getIsActive().equals(enumActive.ACTIVE)){
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
                loginResponse.setRoles(myAccount.getRole());
                // luu vao db thong tin access token
                Account account= accountRepository.findByEmail(myAccount.getEmail());
                account.setAccessToken(accessToken);
                account.setAccessTokenActive(true);
                accountRepository.save(account);
                //
                UserDto userDto= userService.findUserByEmail(myAccount.getEmail());
                if (userDto != null){
                    loginResponse.setUserId(userDto.getId());
                    loginResponse.setFname(userDto.getFirstName());
                    loginResponse.setLname(userDto.getLastName());
                    loginResponse.setAvatar(userDto.getAvartaLink());
                }
                return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,loginResponse));
            }else {
                return ResponseEntity.ok(new Result("Account is InActive or got Baned from Admin", enumResultStatus.NOT_FOUND,null));
            }
        }
        catch (BadCredentialsException e) {
            // Sai tên đăng nhập hoặc mật khẩu, trả về mã trạng thái 401
            return ResponseEntity.ok(new Result("Invalid email or password", enumResultStatus.UNAUTHORIZED,null ));
        } catch (AuthenticationException e) {
            // Quyền truy cập bị từ chối, trả về mã trạng thái 403
            return ResponseEntity.ok(new Result("Access Denied", enumResultStatus.FORBIDDEN,null ));
        }
    }

    @Override
    public ResponseEntity<?> checkAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String accessToken = header.split(" ")[1];
        if (jwtTokenUtil.validateAccessToken(accessToken)) {
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,true));
        }
        return ResponseEntity.ok(new Result("FALSE", enumResultStatus.ERROR,false));
    }
}
