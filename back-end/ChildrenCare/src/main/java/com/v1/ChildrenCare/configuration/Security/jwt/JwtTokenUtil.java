package com.v1.ChildrenCare.configuration.Security.jwt;

import com.v1.ChildrenCare.configuration.Security.CustomUserDetails;
import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.Role;
import com.v1.ChildrenCare.enumPack.enumRole;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Component
public class JwtTokenUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);
    @Value("${jwt.expiration}")
    private long TOKEN_EXPIRED_DAY;
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public String generateAccessToken(CustomUserDetails account) {
        JwtBuilder jwts = Jwts.builder()
                .setSubject(String.format("%s", account.getUsername()))
                .claim("roles", account.getAuthorities().toString())
                .setIssuer("ChildrenCare")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRED_DAY))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY);
        if (account.getAccount().getUser()!=null) {
            jwts.claim("userId", account.getAccount().getUser().getId());
        }
        return jwts.compact();
    }

    public String generateAccessTokenUsingField(Account account) {
        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        account.getRole().stream().forEach(role -> {
            roles.add(new SimpleGrantedAuthority(role.toString()));
        });
        String accessToken = Jwts.builder()
                .setSubject(String.format("%s", account.getEmail()))
                .claim("roles", roles.toString())
                .setIssuer("ChildrenCare")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRED_DAY))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
        return accessToken;
    }

    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            LOGGER.error("JWT expired", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            LOGGER.error("Token is null, empty or only whitespace", ex.getMessage());
        } catch (MalformedJwtException ex) {
            LOGGER.error("JWT is invalid", ex);
        } catch (UnsupportedJwtException ex) {
            LOGGER.error("JWT is not supported", ex);
        } catch (SignatureException ex) {
            LOGGER.error("Signature validation failed");
        }
        return false;
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    public Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        return header.split(" ")[1].trim();
    }
    public Account getAccount(String token) {
        Account account = new Account();

        Claims claims = parseClaims(token);
        String claimRoles = (String) claims.get("roles");
        claimRoles = claimRoles.replace("[", "").replace("]", "");
        String[] roleNames = claimRoles.split(", ");
        List<Role> roles = new ArrayList<>();
        for(String roleName : roleNames) {
            Role role = new Role();
            role.setName(enumRole.valueOf(roleName));
            roles.add(role);
        }
        account.setRole(roles);
        String subject = (String) claims.get(Claims.SUBJECT);
        String email = subject;

        account.setEmail(email);
        return account;
    }

}
