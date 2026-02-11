package com.project.learn.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.learn.Config.JwtProvider;
import com.project.learn.Entities.Patient;
import com.project.learn.Repo.PatientRepo;
import com.project.learn.Service.PatientService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {
	
	private final PatientRepo patientRepo;
	private final JwtProvider jwtProvider;

	@Override
	public List<Patient> getAllPatient() {

		return  patientRepo.findAll();
	}

	@Override
	public Patient createPatient(Patient patient) {
		
		return patientRepo.save(patient);
	}

	@Override
	public List<Patient> getPatientByQuery(String query) throws Exception {
		Optional<List<Patient>> patient = Optional.ofNullable(patientRepo.searchPatient(query));
		return patient.get();
	}

	@Override
	public Patient getPatientByJwt(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		Patient patient = getPatientByEmail(email);
		return patient;
	}

	@Override
	public Patient getPatientByEmail(String email) throws Exception {
		Optional<Patient> patient = Optional.ofNullable(patientRepo.findByEmail(email));
		if(patient.isEmpty())
			throw new Exception("patient not fount");
		return patient.get();
	}
}
