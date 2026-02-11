package com.project.learn.Repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.learn.Entities.Appointment;
import com.project.learn.Entities.Docter;
import com.project.learn.Enum.Status;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Integer>, JpaSpecificationExecutor<Appointment> {
	
	List<Appointment> findByDocterIdOrderByDateDesc(int id);
	List<Appointment> findByPatientIdOrderByDateDesc(int id);
	List<Appointment> findByDocterIdAndDate(int id,LocalDate date);
	List<Appointment> findByDocterIdAndPatientIdOrderByDateDesc(int docterId, int patientId);
	List<Appointment> findByStatusAndDateBefore(Status status, LocalDate date);
	List<Appointment> findByDocterIdAndDateAndStatus(int id,LocalDate date, Status status);
	List<Appointment> findByDocterIdAndStatus(int id, Status status);
	List<Appointment> findByDateAndStatus(LocalDate date,Status status);
	List<Appointment> findByStatus(Status status);
	List<Appointment> findByDate(LocalDate date);
	List<Appointment> findAllByOrderByDateDesc();
	
	@Query("SELECT a from Appointment a where ((:query is null or lower(a.patient.fullName) like lower(concat('%' , :query , '%')))" +
		"or (:query is null or lower(a.patient.email) like lower(concat('%' , :query , '%'))) "+ 
		"or (:query is null or lower(a.patient.contact) like lower(concat('%' , :query , '%'))) ) and a.docter.id = :id order by a.date desc")
	List<Appointment> searchAppointment(@Param("id") int id,@Param("query") String query);
}
