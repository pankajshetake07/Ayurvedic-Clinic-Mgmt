package com.ACMSystem.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ACMSystem.entities.Appointment;
import com.ACMSystem.entities.AppointmentStatus;
import com.ACMSystem.entities.Patient;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
	// Find appointments by date
    List<Appointment> findByAppDate(LocalDate appDate);
    // Find appointments by patient
    List<Appointment> findByPatient(Patient patient);
    
 // Check if an appointment already exists for a given patient and time
    boolean existsByPatientAndAppDateAndAppTime(Patient patient, LocalDate appDate, LocalTime appTime);
    boolean existsByPatient(Patient patient);
    
    List<Appointment> findByStatus(AppointmentStatus status);
    
	boolean existsByPatientAndAppDate(Patient patient, LocalDate appDate);
	
	// Appointment Repository for view Appointments
    @Query("select a from Appointment a where a.appDate >= CURRENT_DATE and a.status != 'CANCELED'")
	public List<Appointment> findAllWithDateGreaterthanorEqualTo();
	
	
	
}
