package com.ACMSystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ACMSystem.entities.Appointment;
import com.ACMSystem.entities.Patient;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
	// Find appointments by date
    List<Appointment> findByAppDate(LocalDate appDate);
    // Find appointments by patient
    List<Appointment> findByPatient(Patient patient);
}
