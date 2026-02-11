package com.project.learn.Service;

import java.util.List;

import com.project.learn.Entities.Prescription;

public interface PrescriptionService {

	public List<Prescription> getAllPrescriptions();
	public List<Prescription> getPrescriptionByDoctor(int id) throws Exception;
	public List<Prescription> getPrescriptionByPatient(int id) throws Exception;
	public Prescription createPrescription(Prescription prescription);
}
