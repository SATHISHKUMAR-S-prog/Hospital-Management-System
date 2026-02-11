package com.project.learn.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.learn.Config.JwtProvider;
import com.project.learn.Entities.Docter;
import com.project.learn.Enum.DoctorStatus;
import com.project.learn.Enum.Specialization;
import com.project.learn.Repo.DocterRepo;
import com.project.learn.Service.DocterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DocterServiceImpl implements DocterService {
	
	private final DocterRepo docRepo;
	private final JwtProvider jwtProvider;

	@Override
	public List<Docter> getAllDocters() {
		List<Docter> docters = docRepo.findAll();
		return docters;
	}
	
	@Override
	public Docter createDocter(Docter docter) {
		Docter newDocter = docRepo.save(docter);
		return newDocter;
	}

	@Override
	public void deleteDocter(int id) {
		
			docRepo.deleteById(id);
	}
	
	@Override
	public List<Docter> getDocterBySpecialization(Specialization specialization) throws Exception {
		
		Optional<List<Docter>> docters = Optional.ofNullable( docRepo.findBySpecialization(specialization));
		
		return docters.get();
	}
	
	@Override
	public Docter getDocterByEmail(String email) throws Exception {
		Optional<Docter> docter = Optional.ofNullable(docRepo.findByEmail(email));
		if(docter.isEmpty())
			throw new Exception("docter not found with this id " + email);
		
		return docter.get();
	}

	@Override
	public List<Docter> getDocterByQuery(String query) throws Exception {
		Optional<List<Docter>> docters = Optional.ofNullable( docRepo.searchDoctor(query));
		
		return docters.get();
	}

	@Override
	public Docter getDocterById(int id) throws Exception {
		Optional<Docter> docter = Optional.ofNullable(docRepo.findById(id).get());
		if(docter.isEmpty())
			throw new Exception("docter not found with this id " + id);
		
		return docter.get();
	}

	@Override
	public Docter getDocterByJwt(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		Docter docter = getDocterByEmail(email);
		if(!docter.getStatus().equals(DoctorStatus.ACTIVE))
			throw new Exception("Doctor may be suspended or terminated");
		return docter;
	}

	@Override
	public Docter changeStatus(int id, DoctorStatus status) throws Exception {
		Docter docter = getDocterById(id);
		docter.setStatus(status);
		return docRepo.save(docter);
	}

	@Override
	public List<Docter> getDoctorsByStatus(DoctorStatus status) throws Exception {
		
		List<Docter> docters = (status == DoctorStatus.ALL) ? docRepo.findAll() : docRepo.findByStatus(status); 
		return docters;
	}

}
