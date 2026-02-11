package com.project.learn.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.learn.Entities.Patient;
import com.project.learn.Enum.USER_ROLE;
import com.project.learn.Request.LoginRequest;
import com.project.learn.Response.AuthResponse;
import com.project.learn.Service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;
	
	@PostMapping("login")
	public ResponseEntity<AuthResponse> signIn(@RequestBody LoginRequest req) throws Exception{
		AuthResponse authResponse = authService.signing(req);
		
		return ResponseEntity.ok(authResponse);
	}
	
	@PostMapping("create/patient")
	public ResponseEntity<AuthResponse> createPatient(@RequestBody Patient patient) throws Exception{
//		System.out.println(patient);
		AuthResponse authResponse = new AuthResponse();
		String jwt = authService.createPatient(patient);
		
		authResponse.setJwt(jwt);
		authResponse.setMessage("Patient created successfully");
		authResponse.setRole(USER_ROLE.PATIENT);
		
		return ResponseEntity.ok(authResponse);
	}
	
	@GetMapping("/forgotPassword")
	public ResponseEntity<String> forgotPassword(@RequestParam String email) throws Exception{
		String message = authService.forgotPassword(email);
		return ResponseEntity.ok(message);
	}
	
	@PutMapping("/resetPassword")
	public ResponseEntity<String> resetPassword(@RequestBody LoginRequest req) throws Exception {
		String message = authService.resetPassword(req.getEmail(), req.getPassword());
		return ResponseEntity.ok(message);
	}
	

}