package com.ACMSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.AppointmentResponse;
import com.ACMSystem.services.AppointmentResponseService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AppointmentResponseController {
	@Autowired
	private AppointmentResponseService appointmentResponseService;
	
	@GetMapping("/appointments")
	public ResponseEntity<List<AppointmentResponse>> getAllAppointments()
	{
		List<AppointmentResponse> appointments = appointmentResponseService.getAppointments();
		return ResponseEntity.ok(appointments);
	}
}
