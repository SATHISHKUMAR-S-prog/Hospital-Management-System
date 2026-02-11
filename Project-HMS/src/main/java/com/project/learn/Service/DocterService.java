package com.project.learn.Service;

import java.util.List;

import com.project.learn.Entities.Docter;
import com.project.learn.Enum.DoctorStatus;
import com.project.learn.Enum.Specialization;

public interface DocterService {

	public List<Docter> getAllDocters();
	public Docter createDocter(Docter docter) throws Exception;
	public void deleteDocter(int id) throws Exception;
	public List<Docter> getDocterBySpecialization(Specialization specialization) throws Exception;
	public Docter getDocterByEmail(String email) throws Exception;
	public List<Docter> getDocterByQuery(String query) throws Exception;
	public Docter getDocterById(int id) throws Exception;
	public Docter getDocterByJwt(String jwt) throws Exception;
	public Docter changeStatus(int id, DoctorStatus status) throws Exception;
	public List<Docter> getDoctorsByStatus(DoctorStatus status) throws Exception;
}
