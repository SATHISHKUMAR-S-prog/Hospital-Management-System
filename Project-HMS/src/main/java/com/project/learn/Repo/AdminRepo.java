package com.project.learn.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.learn.Entities.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
	
	Admin findByEmail(String email);

}
