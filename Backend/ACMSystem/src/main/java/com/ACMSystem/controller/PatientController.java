package com.ACMSystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.PatientDTO;
import com.ACMSystem.dto.UserDTO;
import com.ACMSystem.entities.Patient;
import com.ACMSystem.entities.User;
import com.ACMSystem.repository.UserRepository;
import com.ACMSystem.services.PatientService;
import com.ACMSystem.services.UserService;

@RestController
public class PatientController {

	
	@Autowired
	PatientService patientService;
	
	@Autowired
	UserService userService;
	
	//controller for fetching all the patients 
	@GetMapping("/getAllPatients")
	public List<Patient> getAllPatients(){
		return patientService.getAllPatient();
	}
	
	//controller for adding new patient record
	@PostMapping("/register-patient")
	public User registerPatient(@RequestBody UserDTO userDTO) {
	    return patientService.registerPatient(userDTO);
	}

	
	//controller for searching patients based on the user name provided by user
	@GetMapping("/patients/by-name/{name}")
	public List<Patient> findPatientByName(@PathVariable String name){
		return patientService.findPatientByName(name);
	}
	
	@GetMapping("/patient/by-id/{id}")
	public Optional<Patient> findPatientById(@PathVariable int id){
		return patientService.findPatientById(id);
	}
	
}
