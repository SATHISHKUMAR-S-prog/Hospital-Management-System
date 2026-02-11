package com.project.learn.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.learn.Entities.Appointment;
import com.project.learn.Entities.Docter;
import com.project.learn.Entities.Patient;
import com.project.learn.Entities.Prescription;
import com.project.learn.Enum.Specialization;
import com.project.learn.Enum.Status;
import com.project.learn.Service.AppointmentService;
import com.project.learn.Service.DocterService;
import com.project.learn.Service.PatientService;
import com.project.learn.Service.PrescriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/patient")
public class PatientController {
	
	private final PatientService patientService;
	private final PrescriptionService preService;
	private final AppointmentService appService;
	private final DocterService docService;
	
	
	@GetMapping("appointments")
	public ResponseEntity<List<Appointment>> getAllAppointmnets(@RequestHeader("Authorization") String jwt) throws Exception{
		Patient patient = patientService.getPatientByJwt(jwt);
		
		List<Appointment> appointments = appService.getAppointmentByPatientId(patient.getId());
		if(appointments == null )
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(appointments,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("prescriptions")
	public ResponseEntity<List<Prescription>> getAlPrescription(@RequestHeader("Authorization") String jwt) throws Exception{
		
		Patient patient = patientService.getPatientByJwt(jwt);
		
		List<Prescription> prescriptions = preService.getPrescriptionByPatient(patient.getId());
		if(prescriptions == null )
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(prescriptions,HttpStatus.ACCEPTED);
	}
	
	@PostMapping("create/appointment")
	public ResponseEntity<String> createAppointment(@RequestBody Appointment appointment,@RequestHeader("Authorization") String jwt) throws Exception{
		Patient patient = patientService.getPatientByJwt(jwt);
		System.out.println("patient in cont "+ appointment.getPatient());
		Docter docter = docService.getDocterById(appointment.getDocter().getId());
		System.out.println("docter in cont "+ docter);
		appService.createAppointment(appointment,patient,docter);
		
		return new ResponseEntity<String>("success",HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<Patient> getPatient(@RequestHeader("Authorization") String jwt) throws Exception {
		Patient patient = patientService.getPatientByJwt(jwt);
		
		if(patient == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<>(patient,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("update/appointment")
	public ResponseEntity<List<Appointment>> updateAppointment(@RequestBody Appointment appointment,@RequestHeader("Authorization") String jwt) throws Exception{
		Patient patient = patientService.getPatientByJwt(jwt);
		
		if(patient == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		appService.updateAppointment(appointment);
		List<Appointment> appointments = appService.getAppointmentByPatientId(patient.getId());
		return new ResponseEntity<>(appointments,HttpStatus.CREATED);
	}
	
	@GetMapping("docters/{specialization}")
	public ResponseEntity<List<Docter>> getDocterBySpecialization(@PathVariable Specialization specialization ,@RequestHeader("Authorization") String jwt) throws Exception{
		Patient patient = patientService.getPatientByJwt(jwt);
		List<Docter> docters = docService.getDocterBySpecialization(specialization);
//		if(docters.isEmpty())
//			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(docters,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("{id}/cancel")
	public ResponseEntity<List<Appointment>> cancelAppointment(@PathVariable int id ,@RequestHeader("Authorization") String jwt) throws Exception{
		Patient patient = patientService.getPatientByJwt(jwt);
		
		if(patient == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		appService.changeAppointmentStatus(id, Status.CANCELLED_BY_PATIENT);
		List<Appointment> appointments = appService.getAppointmentByPatientId(patient.getId());
		return new ResponseEntity<>(appointments,HttpStatus.CREATED);
	}

}
