package com.project.learn.Service;

import java.time.LocalDate;
import java.util.List;

import com.project.learn.Entities.Appointment;
import com.project.learn.Entities.Docter;
import com.project.learn.Entities.Patient;
import com.project.learn.Enum.Status;

public interface AppointmentService {

	public List<Appointment> getAllAppointment();
	public Appointment createAppointment(Appointment appointment,Patient patient,Docter docter) throws Exception;
	public List<Appointment> getAppointmentByDocterId(int id) throws Exception;
	public List<Appointment> getAppointmentByPatientId(int id) throws Exception;
	public Appointment updateAppointment(Appointment appointment) throws Exception;
	public List<Appointment> getAppointmentByDate(int id,LocalDate date) throws Exception;
	public List<Appointment> getAppointmentByDocterAndPatient(int docterId, int paitentId) throws Exception;
	public Appointment changeAppointmentStatus(int id ,Status status) throws Exception;
	public List<Appointment> getDoctorAppointmentByDateAndStatus(int id,LocalDate date, Status status) throws Exception;
	public List<Appointment> getAppointmentByDateAndStatus(LocalDate date, Status status) throws Exception;
	public List<Appointment> searchAppointmentByQuery(int id,String query);
}
