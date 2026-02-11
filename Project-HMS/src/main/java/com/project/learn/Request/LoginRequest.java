package com.project.learn.Request;

import com.project.learn.Enum.USER_ROLE;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	
	private String email;
	private String password;
	private USER_ROLE role;

}
