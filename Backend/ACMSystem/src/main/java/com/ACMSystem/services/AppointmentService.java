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

    // Book an appointment
    public Appointment bookAppointment(Integer patientId, Integer slotId, LocalDate appDate, LocalTime appTime) {
    	// Get the patient
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> {
                System.out.println("Patient not found with ID: " + patientId);
                return new RuntimeException("Patient not found");
            });

        // Get the slot
        Slot slot = slotRepository.findById(slotId)
            .orElseThrow(() -> {
                System.out.println("Slot not found with ID: " + slotId);
                return new RuntimeException("Slot not found");
            });

        // Check if the slot is available
        if (!slot.isAvailable()) {
            System.out.println("Slot " + slotId + " is already booked");
            throw new RuntimeException("Slot is already booked");
        }

        // Mark the slot as unavailable
        slot.setAvailable(false);
        slotRepository.save(slot); // Save the updated slot

        // Create the appointment
        Appointment appointment = new Appointment(patient, slot, appDate, appTime, AppointmentStatus.BOOKED);
        return appointmentRepository.save(appointment); // Save the appointment
    }
}
