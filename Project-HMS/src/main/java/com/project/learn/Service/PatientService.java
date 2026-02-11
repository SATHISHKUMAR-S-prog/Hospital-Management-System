package com.project.learn.Service;

import java.util.List;

import com.project.learn.Entities.Patient;

public interface PatientService {

	public List<Patient> getAllPatient();
	public Patient createPatient(Patient patient);
	public List<Patient> getPatientByQuery(String query) throws Exception;
	public Patient getPatientByJwt(String jwt) throws Exception;
	public Patient getPatientByEmail(String email) throws Exception;
}
