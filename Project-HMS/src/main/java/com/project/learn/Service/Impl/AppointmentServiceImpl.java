package com.project.learn.Service.Impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.project.learn.Entities.Admin;
import com.project.learn.Entities.Appointment;
import com.project.learn.Entities.Docter;
import com.project.learn.Entities.Patient;
import com.project.learn.Enum.Status;
import com.project.learn.Repo.AppointmentRepo;
import com.project.learn.Service.AppointmentService;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService{
	
	private final AppointmentRepo appRepo;

	@Scheduled(cron = "0 0 0 * * *")
	public void updateOutdatedAppointments() {
	    LocalDate today = LocalDate.now();
	    List<Appointment> outdatedAppointments = appRepo.findByStatusAndDateBefore(Status.ACTIVE, today);

	    for (Appointment appointment : outdatedAppointments) {
	        appointment.setStatus(Status.OUTDATED);
	        appRepo.save(appointment);
	    }

	    System.out.println("✅ Outdated appointments updated: " + outdatedAppointments.size());
	}

	@PostConstruct
    public void init() {
        System.out.println("🚀 Server started: Checking outdated appointments...");
        updateOutdatedAppointments();
    }
	
	@Override
	public List<Appointment> getAllAppointment() {
	
		return appRepo.findAllByOrderByDateDesc();
	}

	@Override
	public Appointment createAppointment(Appointment appointment, Patient patient,Docter docter) throws Exception {
		
		if(!appointment.getDocter().equals(docter) && appointment.getPatient().equals(patient))
			throw new Exception("doctor or patient not found");
		
		Appointment newAppointment = new Appointment();
		newAppointment.setPatient(patient);
		newAppointment.setDate(appointment.getDate());
		newAppointment.setTime(appointment.getTime());
		newAppointment.setDocter(docter);
		newAppointment.setStatus(Status.ACTIVE);
		System.out.println("app"+ appointment);
		
		System.out.println("new app "+ newAppointment);
		return appRepo.save(newAppointment);
	}

	@Override
	public List<Appointment> getAppointmentByDocterId(int id) throws Exception {
		Optional<List<Appointment>> appointments = Optional.ofNullable(appRepo.findByDocterIdOrderByDateDesc(id));
		if(appointments.isEmpty())
			throw new Exception("appointment not found with this docter id " + id);
		
		return appointments.get();
	}

	@Override
	public List<Appointment> getAppointmentByPatientId(int id) throws Exception {
		
		Optional<List<Appointment>> appointments = Optional.ofNullable( appRepo.findByPatientIdOrderByDateDesc(id));
		if(appointments.isEmpty())
			throw new Exception("appointment not found with this  id " + id);
		
		return appointments.get();
	}

	@Override
	public Appointment updateAppointment(Appointment appointment) throws Exception {
		Optional<Appointment> updatedAppointment = Optional.ofNullable(appRepo.findById(appointment.getId()).get());
		
		if(updatedAppointment.isEmpty())
			throw new Exception("appointment not found");
	
	
			
			if(appointment.getDate() != null && !appointment.getDate().equals(updatedAppointment.get().getDate()))
				updatedAppointment.get().setDate(appointment.getDate());
			
			if(appointment.getTime() != null && !appointment.getTime().equals(updatedAppointment.get().getTime()))
				updatedAppointment.get().setTime(appointment.getTime());
			
			updatedAppointment.get().setStatus(Status.POSTPONED);
			
			return appRepo.save(updatedAppointment.get()); 
		
	}

	@Override
	public List<Appointment> getAppointmentByDate(int id,LocalDate date) throws Exception {
		Optional<List<Appointment>> appointments = Optional.ofNullable( appRepo.findByDocterIdAndDate(id,date));
//		if(appointments.isEmpty())
//			throw new Exception("appointment not found with this date " + date);
		
		return appointments.get();
	}

	@Override
	public List<Appointment> getAppointmentByDocterAndPatient(int docterId, int paitentId) throws Exception {
		Optional<List<Appointment>> appointments = Optional.ofNullable( appRepo.findByDocterIdAndPatientIdOrderByDateDesc(docterId, paitentId));
		if(appointments.isEmpty())
			throw new Exception("appointment not found with this id ");
		
		return appointments.get();
	}

	@Override
	public Appointment changeAppointmentStatus(int id, Status status) throws Exception {
		Optional<Appointment> updatedAppointment = Optional.ofNullable(appRepo.findById(id).get());
		
		if(updatedAppointment.isEmpty())
			throw new Exception("appointment not found");
	
			
			updatedAppointment.get().setStatus(status);
			
			return appRepo.save(updatedAppointment.get()); 
	}

	@Override
	public List<Appointment> getDoctorAppointmentByDateAndStatus(int id, LocalDate date, Status status) throws Exception {
		
		if(status.equals(Status.OUTDATED))
			return appRepo.findByDocterIdAndStatus(id, status);
			
		
		if(!status.equals(Status.ALL) && date != null) 
			return appRepo.findByDocterIdAndDateAndStatus(id, date, status);
		
		if(date == null && !status.equals(Status.ALL))
			return appRepo.findByDocterIdAndStatus(id, status);
		
		if(status.equals(Status.ALL))
			return appRepo.findByDocterIdOrderByDateDesc(id);
			
		
		return getAppointmentByDate(id, date);
	}

	@Override
	public List<Appointment> getAppointmentByDateAndStatus(LocalDate date, Status status) throws Exception {
		if(status.equals(Status.OUTDATED))
			return appRepo.findByStatus(status);
			
		if(!status.equals(Status.ALL) && date != null) 
			return appRepo.findByDateAndStatus(date, status);
		
		if(date == null && !status.equals(Status.ALL))
			return appRepo.findByStatus(status);
		
		if(status.equals(Status.ALL))
			return appRepo.findAllByOrderByDateDesc();
			
		
		return appRepo.findByDate(date);
	}

	@Override
	public List<Appointment> searchAppointmentByQuery(int id, String query) {
		
		return appRepo.searchAppointment(id, query);
	}
}
