package com.project.learn.Service.Impl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.learn.Entities.Admin;
import com.project.learn.Entities.Docter;
import com.project.learn.Entities.Patient;
import com.project.learn.Enum.DoctorStatus;
import com.project.learn.Enum.USER_ROLE;
import com.project.learn.Repo.AdminRepo;
import com.project.learn.Repo.DocterRepo;
import com.project.learn.Repo.PatientRepo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomUserServiceImpl implements UserDetailsService {
	
	private final PatientRepo patientRepo;
	private final DocterRepo docRepo;
	private final AdminRepo adminRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		
		  // Find patient by email
        Optional<Patient> patientOpt = Optional.ofNullable(patientRepo.findByEmail(username));
        if (patientOpt.isPresent()) {
            return buildUserDetails(patientOpt.get().getEmail(), patientOpt.get().getPassword(), USER_ROLE.PATIENT);
        }

        // Find doctor by email
        Optional<Docter> doctorOpt = Optional.ofNullable(docRepo.findByEmail(username));
        if (doctorOpt.isPresent() && doctorOpt.get().getStatus().equals(DoctorStatus.ACTIVE)) {
            return buildUserDetails(doctorOpt.get().getEmail(), doctorOpt.get().getPassword(), USER_ROLE.DOCTOR);
        }

        // Find admin by email
        Optional<Admin> adminOpt = Optional.ofNullable(adminRepo.findByEmail(username));
        if (adminOpt.isPresent()) {
            return buildUserDetails(adminOpt.get().getEmail(), adminOpt.get().getPassword(), USER_ROLE.ADMIN);
        }
		
		throw new UsernameNotFoundException("user not found with this email " + username);
	}
	

	private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {
	
		
		  List<GrantedAuthority> authorityList = Collections.singletonList(new SimpleGrantedAuthority(role.name()));
		
		return new org.springframework.security.core.userdetails.User(email , password ,authorityList);
	}



	

}
