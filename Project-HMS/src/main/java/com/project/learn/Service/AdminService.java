package com.project.learn.Service;

import com.project.learn.Entities.Admin;

public interface AdminService {

	public Admin getAdminByEmail(String email) throws Exception;
	public Admin getAdminByJwt(String jwt) throws Exception;
}
