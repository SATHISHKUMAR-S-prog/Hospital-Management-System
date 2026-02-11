package com.project.learn.Controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.learn.Entities.Admin;
import com.project.learn.Entities.Appointment;
import com.project.learn.Entities.Docter;
import com.project.learn.Entities.Patient;
import com.project.learn.Entities.Prescription;
import com.project.learn.Enum.DoctorStatus;
import com.project.learn.Enum.Status;
import com.project.learn.Service.AdminService;
import com.project.learn.Service.AppointmentService;
import com.project.learn.Service.AuthService;
import com.project.learn.Service.DocterService;
import com.project.learn.Service.PatientService;
import com.project.learn.Service.PrescriptionService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminContoleer {
	
	private final PatientService patientService;
	private final DocterService docService;
	private final AppointmentService appService;
	private final PrescriptionService preService;
	private final AuthService authService;
	private final AdminService adminService;
	
	@GetMapping("patients")
	public ResponseEntity<List<Patient>> getAllPatients(@RequestHeader("Authorization") String jwt) throws Exception{
		 adminService.getAdminByJwt(jwt);
		List<Patient> patients =  patientService.getAllPatient();
		
		if(patients == null)
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<List<Patient>>(patients, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("docters")
	public ResponseEntity<List<Docter>> getAllDocters(@RequestHeader("Authorization") String jwt) throws Exception{
		 adminService.getAdminByJwt(jwt);
		List<Docter> docters = docService.getAllDocters();
		
		if(docters == null)
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<List<Docter>>(docters, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("appointments")
	public ResponseEntity<List<Appointment>> getAllAppointments(@RequestHeader("Authorization") String jwt) throws Exception{
		 adminService.getAdminByJwt(jwt);
		List<Appointment> appointments = appService.getAllAppointment();
		
		if(appointments == null)
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<List<Appointment>>(appointments, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("prescriptions")
	public ResponseEntity<List<Prescription>> getAllPrescription(@RequestHeader("Authorization") String jwt) throws Exception{
		 adminService.getAdminByJwt(jwt);
		List<Prescription> prescriptions = preService.getAllPrescriptions();
		
		if(prescriptions == null)
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<List<Prescription>>(prescriptions, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("addDocter")
	public ResponseEntity<String> addDocter(@RequestBody Docter docter,@RequestHeader("Authorization") String jwt) throws Exception{
		 adminService.getAdminByJwt(jwt);
		String status = authService.createDocter(docter);
		
		if(status != "success") {
			return new ResponseEntity<>("not created",HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(status,HttpStatus.CREATED);
	}
	
	@DeleteMapping("delete")
	public ResponseEntity<String> deleteDocter(@RequestParam String email,@RequestHeader("Authorization") String jwt) throws Exception{
		 adminService.getAdminByJwt(jwt);
		Docter docter = docService.getDocterByEmail(email);
		if(docter == null)
			return new ResponseEntity<String>("docter not found", HttpStatus.NOT_FOUND);
		
		docService.deleteDocter(docter.getId());
		
		return new ResponseEntity<String>("deleted", HttpStatus.ACCEPTED);
	}

	
	@GetMapping("profile")
	public ResponseEntity<Admin> getAdminByJwt(@RequestHeader("Authorization") String jwt) throws Exception{
		Admin admin = adminService.getAdminByJwt(jwt);
		return new ResponseEntity<Admin>(admin,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("{id}/status")
	public ResponseEntity<List<Docter>> updateStatus(@RequestBody DoctorStatus status,@PathVariable int id,@RequestHeader("Authorization") String jwt ) throws Exception{
		Admin admin = adminService.getAdminByJwt(jwt);
		if(admin != null) 
			docService.changeStatus(id, status);
		
		
		return new ResponseEntity<List<Docter>>(docService.getAllDocters(),HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/status")
	public ResponseEntity<List<Docter>> getDocterByStatus(@RequestParam DoctorStatus status,@RequestHeader("Authorization") String jwt ) throws Exception{
		Admin admin = adminService.getAdminByJwt(jwt);
		System.out.println(status);
		System.out.println(admin);
		if(admin == null)
			return new ResponseEntity<List<Docter>>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
		
			List<Docter> docters = docService.getDoctorsByStatus(status);
			System.out.println(docters);
			
		return new ResponseEntity<List<Docter>>(docters,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("appointments/{status}")
	public ResponseEntity<List<Appointment>> getAppointmentByDateAndStatus(@RequestParam(required = false) LocalDate date,@PathVariable Status status,@RequestHeader("Authorization") String jwt) throws Exception{
		Admin admin = adminService.getAdminByJwt(jwt);
		if(admin == null)
			return new ResponseEntity<List<Appointment>>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
		
		List<Appointment> appointments = appService.getAppointmentByDateAndStatus( date, status);
		return new ResponseEntity<>(appointments,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/search/doctor")
	public ResponseEntity<List<Docter>> getDoctor(@RequestParam(required = false) String query) throws Exception{
		List<Docter> doctors = docService.getDocterByQuery(query);
		return new  ResponseEntity<List<Docter>>(doctors,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/search/patient")
	public ResponseEntity<List<Patient>> getPatient(@RequestParam(required = false) String query) throws Exception{
		List<Patient> patients = patientService.getPatientByQuery(query);
		return new  ResponseEntity<List<Patient>>(patients,HttpStatus.ACCEPTED);
	}
	
}
