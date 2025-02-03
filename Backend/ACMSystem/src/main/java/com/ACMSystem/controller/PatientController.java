package com.ACMSystem.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.UserDTO;
import com.ACMSystem.entities.Patient;
import com.ACMSystem.entities.User;
import com.ACMSystem.services.PatientService;
import com.ACMSystem.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
	
	//find patient by patient_ID
	@GetMapping("/patient/by-id/{id}")
	public Optional<Patient> findPatientById(@PathVariable int id){
		return patientService.findPatientById(id);
	}
	
	//This API for fetching patient all information by userID
	@GetMapping("/patient/by-uid/{uid}")
    public User getPatientByUserId(@PathVariable int uid) {
        return patientService.getPatientByUserId(uid);
    }
	
	//This is API for update patient information
	@PatchMapping("/update/{uid}")
    public User updatePatient(@PathVariable int uid, @RequestBody Map<String, Object> updates) {
        return patientService.updatePatientFields(uid, updates);
    }
	
}
