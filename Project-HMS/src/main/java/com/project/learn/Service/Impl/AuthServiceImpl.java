package com.project.learn.Service.Impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.learn.Config.JwtProvider;
import com.project.learn.Entities.Docter;
import com.project.learn.Entities.Patient;
import com.project.learn.Enum.USER_ROLE;
import com.project.learn.Repo.DocterRepo;
import com.project.learn.Repo.PatientRepo;
import com.project.learn.Request.LoginRequest;
import com.project.learn.Response.AuthResponse;
import com.project.learn.Service.AuthService;
import com.project.learn.Service.EmailService;
import com.project.learn.Service.PatientService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final PatientService patientService;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserServiceImpl customUserServiceImpl;
    private final PatientRepo patientRepo;
    private final JwtProvider jwtProvider;
    private final DocterRepo docRepo;
    private final EmailService emailService;
    
	@Value("${frontend.url}")
	private String frontend_url;

    @Override
    public String createPatient(Patient patient) throws Exception {
        Optional<Patient> existingPatient = Optional.ofNullable(patientRepo.findByEmail(patient.getEmail()));
   
        if (existingPatient.isEmpty()) {
            Patient newPatient = new Patient();
            newPatient.setEmail(patient.getEmail());
            newPatient.setFullName(patient.getFullName());
            newPatient.setContact(patient.getContact());
            newPatient.setGender(patient.getGender());
            newPatient.setPassword(passwordEncoder.encode(patient.getPassword()));
         
            patient = patientRepo.save(newPatient);
        } else {
            patient = existingPatient.get();
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.PATIENT.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
            patient.getEmail(),
            patient.getPassword(),
            authorities
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public AuthResponse signing(LoginRequest req) throws Exception {
        String username = req.getEmail();
        String rawPassword = req.getPassword();

        Authentication authentication = authenticate(username, rawPassword,req.getRole());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login successful");

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        if (roleName != null) {
            authResponse.setRole(USER_ROLE.valueOf(roleName.toUpperCase()));
        }

        return authResponse;
    }

    private Authentication authenticate(String username, String rawPassword,USER_ROLE role) throws Exception {
        UserDetails userDetails = customUserServiceImpl.loadUserByUsername(username);

        if (userDetails == null) {
            throw new Exception("Invalid username");
        }
        
     // Check if user has the expected role
        boolean hasExpectedRole = userDetails.getAuthorities().stream()
            .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(role.toString()));

        if (!hasExpectedRole) {
            throw new Exception("User not allowed: Role mismatch");
        }

        // Compare raw password with encoded password
        if (!passwordEncoder.matches(rawPassword, userDetails.getPassword())) {
            throw new Exception("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(
            userDetails.getUsername(),
            userDetails.getPassword(),
            userDetails.getAuthorities()
        );
    }

	@Override
	public String createDocter(Docter docter) throws Exception {
		Optional<Docter> existingDocter = Optional.ofNullable(docRepo.findByEmail(docter.getEmail()));
		if(existingDocter.isEmpty()) {
			Docter newDocter = new Docter();
			newDocter.setEmail(docter.getEmail());
			newDocter.setFees(docter.getFees());
			newDocter.setMobileNo(docter.getMobileNo());
			newDocter.setName(docter.getName());
			newDocter.setPassword(passwordEncoder.encode(docter.getPassword()));
			newDocter.setSpecialization(docter.getSpecialization());
			newDocter.setUsername(docter.getUsername());
			
			docter = docRepo.save(newDocter);
		} else {
			docter = existingDocter.get();
		}
		 List<GrantedAuthority> authorities = new ArrayList<>();
	        authorities.add(new SimpleGrantedAuthority(USER_ROLE.DOCTOR.toString()));

	        Authentication authentication = new UsernamePasswordAuthenticationToken(
	            docter.getEmail(),
	            docter.getPassword(),
	            authorities
	        );
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        
	        jwtProvider.generateToken(authentication);
	        return "success";
	}

	@Override
	public String forgotPassword(String email) throws Exception {
		patientService.getPatientByEmail(email);
		String subject = "Reset Your Password";
		String text = "Link for Reset your HMS password: " + frontend_url + "/resetPassword";
		emailService.sendPasswordResetLink(email, subject, text);
		return email;
	}

	@Override
	public String resetPassword(String email, String password) throws Exception {
		Patient patient = patientService.getPatientByEmail(email);
		patient.setPassword(passwordEncoder.encode(password));
		patientRepo.save(patient);
		return "Succcess";
	}
	
	
}
