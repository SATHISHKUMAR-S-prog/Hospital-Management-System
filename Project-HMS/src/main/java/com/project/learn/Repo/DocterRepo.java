package com.project.learn.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.learn.Entities.Docter;
import com.project.learn.Enum.DoctorStatus;
import com.project.learn.Enum.Specialization;

@Repository
public interface DocterRepo extends JpaRepository<Docter, Integer> , JpaSpecificationExecutor<Docter> {
	
	Docter findByEmail(String email);
	List<Docter> findBySpecialization(Specialization specialization);
	List<Docter> findByStatus(DoctorStatus status);
	
	@Query("select d from Docter d where (:query is null or lower(d.name) like lower(concat('%' , :query , '%'))) or (:query is null or lower(d.email) like lower(concat('%' , :query , '%'))) or (:query is null or lower(d.mobileNo) like lower(concat('%' , :query , '%')))")
	List<Docter> searchDoctor(@Param("query") String query);
	
}
