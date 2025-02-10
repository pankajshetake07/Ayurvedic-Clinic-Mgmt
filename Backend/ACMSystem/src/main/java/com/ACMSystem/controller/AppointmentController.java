package com.ACMSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.AppointmentRequest;
import com.ACMSystem.entities.Appointment;
import com.ACMSystem.entities.Slot;
import com.ACMSystem.services.AppointmentService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@RestController
@RequestMapping("/service2/appointments")
//@CrossOrigin(origins = "http://localhost:3000")
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
    
    @GetMapping("/booked")
    public List<Appointment> getAllBookedAppointments() {
        return appointmentService.getAllBookedAppointments();
    }
    
    @PutMapping("/cancel/{id}")  
    public ResponseEntity<String> cancelAppointment(@PathVariable("id") Integer appointmentId) {
        try {
            boolean isCancelled = appointmentService.cancelAppointment(appointmentId);
            return isCancelled 
                ? ResponseEntity.ok("Appointment cancelled successfully.") 
                : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while cancelling the appointment.");
        }
    }


}
