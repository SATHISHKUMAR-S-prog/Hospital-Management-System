package com.project.learn.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.learn.Entities.Prescription;
import com.project.learn.Repo.PrescriptionRepo;
import com.project.learn.Service.PrescriptionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService{


	private final PrescriptionRepo presRepo;

	@Override
	public List<Prescription> getAllPrescriptions() {
		return  presRepo.findAllByOrderByDateDesc();
	}

	@Override
	public List<Prescription> getPrescriptionByDoctor(int id) throws Exception {
		Optional<List<Prescription>> prescriptions = Optional.ofNullable(presRepo.findByDocterIdOrderByDateDesc(id));
		if(prescriptions.isEmpty())
			throw new Exception("prescription not found");
		return prescriptions.get();
	}

	@Override
	public List<Prescription> getPrescriptionByPatient(int id)  throws Exception {
		Optional<List<Prescription>> prescriptions = Optional.ofNullable(presRepo.findByPatientIdOrderByDateDesc(id));
		if(prescriptions.isEmpty())
			throw new Exception("prescription not found");
		return prescriptions.get();
	}

	@Override
	public Prescription createPrescription(Prescription prescription) {
	
		return presRepo.save(prescription);
	}
}
