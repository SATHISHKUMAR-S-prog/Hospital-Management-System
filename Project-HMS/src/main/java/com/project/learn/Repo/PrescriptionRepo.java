package com.project.learn.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.learn.Entities.Prescription;

@Repository
public interface PrescriptionRepo extends JpaRepository<Prescription, Integer> {

	List<Prescription> findByDocterIdOrderByDateDesc(int id);
	List<Prescription> findByPatientIdOrderByDateDesc(int id);
	List<Prescription> findAllByOrderByDateDesc();
}
