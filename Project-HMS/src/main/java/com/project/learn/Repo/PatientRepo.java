package com.project.learn.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.learn.Entities.Patient;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Integer>, JpaSpecificationExecutor<Patient> {
	
	Patient findByEmail(String email);
	
	@Query("select p from Patient p where (:query is null or lower(p.fullName) like lower(concat('%' , :query , '%'))) " +
			"or (:query is null or lower(p.email) like lower(concat('%' , :query , '%'))) "+ 
			"or (:query is null or lower(p.contact) like lower(concat('%' , :query , '%')))")
	List<Patient> searchPatient(@Param("query") String query);
	
}
