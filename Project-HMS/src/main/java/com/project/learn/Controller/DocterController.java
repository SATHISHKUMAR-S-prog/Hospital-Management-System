package com.project.learn.Controller;

import java.time.LocalDate;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.learn.Entities.Appointment;
import com.project.learn.Entities.Docter;
import com.project.learn.Entities.Patient;
import com.project.learn.Entities.Prescription;
import com.project.learn.Enum.Status;
import com.project.learn.Service.AppointmentService;
import com.project.learn.Service.DocterService;
import com.project.learn.Service.PatientService;
import com.project.learn.Service.PrescriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/docter")
public class DocterController {
	
	private final AppointmentService appService;
	private final PrescriptionService preService;
	private final PatientService patientServicet;
	private final DocterService docterService;
	
	@GetMapping("prescriptions")
	public ResponseEntity<List<Prescription>> getAllPrescription(@RequestHeader("Authorization") String jwt) throws Exception{
		Docter docter = docterService.getDocterByJwt(jwt);
		
		if(docter == null)
			return new ResponseEntity<>(new ArrayList<>(),HttpStatus.NOT_FOUND);
		
		List<Prescription> prescriptions = preService.getPrescriptionByDoctor(docter.getId());
		
		if(prescriptions == null)
			return new ResponseEntity<>(new ArrayList<>(),HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<List<Prescription>>(prescriptions, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("appointments")
	public ResponseEntity<List<Appointment>> getAllAppointments(@RequestHeader("Authorization") String jwt) throws Exception{
		Docter docter = docterService.getDocterByJwt(jwt);
		if(docter == null)
			return new ResponseEntity<>(new ArrayList<>(),HttpStatus.NOT_FOUND);
		
		List<Appointment> appointments = appService.getAppointmentByDocterId(docter.getId());
		
		
		
		if(appointments == null)
			return new ResponseEntity<>(new ArrayList<>(),HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<>(appointments, HttpStatus.ACCEPTED);
	}
	

	
	@GetMapping("profile")
	public ResponseEntity<Docter> getDoctor(@RequestHeader("Authorization") String jwt) throws Exception {
		Docter docter = docterService.getDocterByJwt(jwt);
		return new ResponseEntity<Docter>(docter,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("update/appointment")
	public ResponseEntity<List<Appointment>> updateAppointment(@RequestBody Appointment appointment,@RequestHeader("Authorization") String jwt) throws Exception{
		Docter doctor = docterService.getDocterByJwt(jwt);
		
		if(doctor == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		appService.updateAppointment(appointment);
		List<Appointment> appointments = appService.getAppointmentByDocterId(doctor.getId());
		return new ResponseEntity<>(appointments,HttpStatus.CREATED);
	}
	
	@PutMapping("{id}/cancel")
	public ResponseEntity<List<Appointment>> cancelAppointment(@PathVariable("id") int id ,@RequestHeader("Authorization") String jwt) throws Exception{
		Docter doctor = docterService.getDocterByJwt(jwt);
		
		if(doctor == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		appService.changeAppointmentStatus(id, Status.CANCELLED_BY_DOCTER);
		List<Appointment> appointments = appService.getAppointmentByDocterId(doctor.getId());
		return new ResponseEntity<>(appointments,HttpStatus.CREATED);
	}
	
	@PostMapping("{id}/addPrescription")
	public ResponseEntity<String> addPrescription(@PathVariable int id,@RequestBody Prescription prescription,@RequestHeader("Authorization") String jwt) throws Exception{
		docterService.getDocterByJwt(jwt);
		appService.changeAppointmentStatus(id, Status.PRESCRIBED);
		preService.createPrescription(prescription);
		return new ResponseEntity<String>("created",HttpStatus.CREATED);
	}
	
	@GetMapping("appointments/{status}")
	public ResponseEntity<List<Appointment>> getAppointmentByDateAndStatus(@RequestParam(required = false) LocalDate date,@PathVariable Status status,@RequestHeader("Authorization") String jwt) throws Exception{
		Docter docter = docterService.getDocterByJwt(jwt);
		List<Appointment> appointments = appService.getDoctorAppointmentByDateAndStatus(docter.getId(), date, status);
		return new ResponseEntity<>(appointments,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/search/appointment")
	public ResponseEntity<List<Appointment>> getPatient(@RequestParam(required = false) String query,@RequestHeader("Authorization") String jwt) throws Exception{
		Docter doctor = docterService.getDocterByJwt(jwt);
		
		if(doctor == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		List<Appointment> apps = appService.searchAppointmentByQuery(doctor.getId(), query);
		return new  ResponseEntity<List<Appointment>>(apps,HttpStatus.ACCEPTED);
	}

}
