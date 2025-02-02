package com.ACMSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ACMSystem.dto.AppointmentRequest;
import com.ACMSystem.entities.Appointment;
import com.ACMSystem.entities.Slot;
import com.ACMSystem.services.AppointmentService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
	@Autowired
    private AppointmentService appointmentService;

    // Endpoint to get available slots for a given date
    @GetMapping("/available-slots")
    public List<Slot> getAvailableSlots(@RequestParam("appDate") String appDate) {
        LocalDate date = LocalDate.parse(appDate);  // Convert string to LocalDate
        return appointmentService.getAvailableSlots(date);
    }

    // Endpoint to book an appointment
    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody AppointmentRequest request) {
    	Integer id = request.getPatientId();
    	System.out.println("patiend id "+id);
        LocalDate date = LocalDate.parse(request.getAppDate());
        LocalTime time = LocalTime.parse(request.getAppTime());
        return appointmentService.bookAppointment(request.getPatientId(), request.getSlotId(), date, time);
    }

}
