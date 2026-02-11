package com.project.learn.Service.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.learn.Config.JwtProvider;
import com.project.learn.Entities.Admin;
import com.project.learn.Enum.USER_ROLE;
import com.project.learn.Repo.AdminRepo;
import com.project.learn.Service.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceInpl implements AdminService,CommandLineRunner {
	
	private final AdminRepo adminRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtProvider jwtProvider;
	
//	@Value("${admin_email}")
//	private String admin_email;
//	
//	@Value("${admin_password}")
//	private String admin_password;
//	
//	@Value("${admin_name}")
//	private String admin_name;
	
	@Override
	public Admin getAdminByEmail(String email) throws Exception {
		
		Optional<Admin> admin = Optional.ofNullable(adminRepo.findByEmail(email));
		if(admin.isEmpty())
			throw new Exception("admin not found with this email " + email);
		
		return admin.get();
	}

	@Override
	public void run(String... args) throws Exception {
		initialiseAdminUser();
		
	}
	
	public void initialiseAdminUser() {
//		String adminUsername = admin_email;
		
		String adminUsername = "admin@gmail.com";
		
		if(adminRepo.findByEmail(adminUsername)== null) {
			Admin admin = new Admin();
			
			admin.setEmail(adminUsername);
			admin.setFullName("Admin");
			admin.setPassword(passwordEncoder.encode("admin@1"));
			
			adminRepo.save(admin);
			
			 List<GrantedAuthority> authorities = new ArrayList<>();
		        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ADMIN.toString()));

		        Authentication authentication = new UsernamePasswordAuthenticationToken(
		            admin.getEmail(),
		            admin.getPassword(),
		            authorities
		        );
		        SecurityContextHolder.getContext().setAuthentication(authentication);

		        String jwt = jwtProvider.generateToken(authentication);
		}
	}

	@Override
	public Admin getAdminByJwt(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		Admin admin = getAdminByEmail(email);
		return admin;
	}

}
