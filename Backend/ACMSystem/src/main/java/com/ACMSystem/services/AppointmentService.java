package com.ACMSystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSystem.entities.Appointment;
import com.ACMSystem.entities.AppointmentStatus;
import com.ACMSystem.entities.Patient;
import com.ACMSystem.entities.Slot;
import com.ACMSystem.repository.AppointmentRepository;
import com.ACMSystem.repository.PatientRepository;
import com.ACMSystem.repository.SlotRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;

	@Autowired
	private SlotRepository slotRepository;

	@Autowired
	private PatientRepository patientRepository;

	// Fetch available slots for a given date
	public List<Slot> getAvailableSlots(LocalDate date) {
		// Fetch all slots for the date that are available
		return slotRepository.findByDateAndIsAvailable(date, true);
	}

	// Getting patientId from userId
	public Integer getPatientIdFromUserId(int userId) {
		System.out.println("Received userId: " + userId); // Log userId

		if (userId == 0) {
			throw new RuntimeException("Invalid User ID: " + userId);
		}

		Patient patient = patientRepository.findByUser_Uid(userId)
				.orElseThrow(() -> new RuntimeException("Patient not found for User ID: " + userId));

		return patient.getPid();
	}

	// Book an appointment
	public Appointment bookAppointment(int userId, int slotId, LocalDate appDate, LocalTime appTime) {

		Integer patientId = getPatientIdFromUserId(userId);

		// Get the patient
		Patient patient = patientRepository.findById(patientId)
				.orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));

		// Check if the patient already has an appointment on this date
		if (appointmentRepository.existsByPatientAndAppDate(patient, appDate)) {
			throw new RuntimeException("You already have an appointment booked on this date.");
		}

		// Get the slot
		Slot slot = slotRepository.findById(slotId)
				.orElseThrow(() -> new RuntimeException("Slot not found with ID: " + slotId));

		// Check if the slot is available
		if (!slot.isAvailable()) {
			throw new RuntimeException("Slot is already booked.");
		}

		// Mark the slot as unavailable
		slot.setAvailable(false);
		slotRepository.save(slot);

		// Create the appointment
		Appointment appointment = new Appointment(patient, slot, appDate, appTime, AppointmentStatus.BOOKED);
		return appointmentRepository.save(appointment);
	}

	public List<Appointment> getAllBookedAppointments() {
		return appointmentRepository.findByStatus(AppointmentStatus.BOOKED);
	}
	
	public boolean cancelAppointment(Integer appointmentId) {
		
		Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);
        
        if (appointmentOptional.isPresent()) 
        {
            Appointment appointment = appointmentOptional.get();
            appointment.setStatus(AppointmentStatus.CANCELED);
            appointmentRepository.save(appointment);
            return true;
        }
		return false;
	}

}
