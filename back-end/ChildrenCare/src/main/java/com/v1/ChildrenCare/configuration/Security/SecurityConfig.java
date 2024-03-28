package com.v1.ChildrenCare.configuration.Security;

import com.v1.ChildrenCare.configuration.Security.jwt.JwtTokenFilter;
import com.v1.ChildrenCare.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;



@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
        prePostEnabled = true,
        jsr250Enabled = true,
        proxyTargetClass = true
)
public class SecurityConfig {
    private final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);
    private final AccountRepository accountRepository;
    private final JwtTokenFilter jwtTokenFilter;


    public SecurityConfig(AccountRepository accountRepository, JwtTokenFilter jwtTokenFilter) {
        this.accountRepository = accountRepository;
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    UserDetailsService userDetailsService() {
        return new CustomUserDetailsService(accountRepository);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors(customizer -> {
        });
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/auth/login").permitAll()
                        .requestMatchers("/auth/checkAccessToken").permitAll()
                        // User
//                        hasAnyAuthority("USER","ADMIN")
                        .requestMatchers("/user/addUser").hasAnyAuthority("USER","ADMIN")
                        .requestMatchers("/user/searchUser").hasAnyAuthority( "ADMIN")
                        .requestMatchers("/user/deleteUser").hasAnyAuthority( "ADMIN")
                        .requestMatchers("/user/addUserByAdmin").hasAnyAuthority( "ADMIN")
                        .requestMatchers("/user/updateUser").hasAnyAuthority("USER","STAFF","ADMIN")
                        .requestMatchers("/user/findUser").hasAnyAuthority("USER","ADMIN","STAFF")
                        // account
                        .requestMatchers("/account/searchAccount").hasAnyAuthority("ADMIN")
                        .requestMatchers("/account/addAccountByAdmin").hasAnyAuthority("ADMIN")
                        .requestMatchers("/account/addAccount").permitAll()
                        .requestMatchers("/account/updateAccount").hasAnyAuthority("ADMIN","USER")
                        .requestMatchers("/account/deleteAccount").hasAnyAuthority("ADMIN")
                        .requestMatchers("/account/changePassword").hasAnyAuthority("ADMIN","USER","STAFF")
                        .requestMatchers("/account/changePasswordWithToken").permitAll()
                        .requestMatchers("/account/forgotPassword").permitAll()
                        //


                        .requestMatchers("/api/feedback/**","/api/children/**").permitAll()
//                       .requestMatchers( "/api/children/**").hasAnyAuthority("ADMIN","USER","STAFF")


                        // post
//                        .requestMatchers("/manager/post/**").permitAll()
                                .requestMatchers("/manager/post/**").permitAll()
                                .requestMatchers("/user/post/**").permitAll()
                         // service
//                        .requestMatchers("/manager/service/**").permitAll()
                                .requestMatchers("/manager/service/**").hasAnyAuthority("ADMIN")
                        .requestMatchers("/user/service/**").permitAll()


                        .requestMatchers("/account/verifyEmail").permitAll()
                        .requestMatchers("/account/resendVerifyEmail").permitAll()
                        // feedback

                        .anyRequest().authenticated()

                );
        httpSecurity.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
