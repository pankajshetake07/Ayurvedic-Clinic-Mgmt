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

    //Get available slots for a given date
    @GetMapping("/available-slots")
    public List<Slot> getAvailableSlots(@RequestParam("appDate") String appDate) {
        LocalDate date = LocalDate.parse(appDate);  // Convert string to LocalDate
        return appointmentService.getAvailableSlots(date);
    }

    //Book an appointment
    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody AppointmentRequest request) {
        int userId = request.getUserId(); // User ID sent from frontend
        int slotId = request.getSlotId();
        LocalDate appDate = request.getAppDate();
        LocalTime appTime = request.getAppTime();
        //System.out.println(userId+"\n"+slotId+"\n"+appDate+"\n"+appTime);
        if (userId == 0) {
            throw new RuntimeException("Invalid User ID: " + userId); 
        }

        
        return appointmentService.bookAppointment(userId, slotId, appDate, appTime);
    }

}
