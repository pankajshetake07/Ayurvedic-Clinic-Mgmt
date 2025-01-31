package com.ACMSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ACMSystem.entities.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

}
