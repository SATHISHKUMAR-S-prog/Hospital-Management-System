package com.project.learn.Service;


import com.project.learn.Entities.Docter;
import com.project.learn.Entities.Patient;
import com.project.learn.Request.LoginRequest;
import com.project.learn.Response.AuthResponse;

public interface AuthService {
	
	
	String createPatient(Patient patient) throws Exception;
	
	AuthResponse signing(LoginRequest req) throws Exception;
	
	String createDocter(Docter docter) throws Exception;

	String forgotPassword(String email) throws Exception;
	
	String resetPassword(String email, String password) throws Exception;
}
