package com.ACMSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.PatientDTO;
import com.ACMSystem.entities.Patient;
import com.ACMSystem.services.PatientService;

@RestController
public class PatientController {

	
	@Autowired
	PatientService patientService;
	
	//controller for fetching all the patients 
	@GetMapping("/getAllPatients")
	public List<Patient> getAllPatients(){
		return patientService.getAllPatient();
	}
	
	//controller for adding new patient recordt
	@PostMapping("/addPatient")
	public Patient insertPatientRecord(@RequestBody PatientDTO patientDto) {
		return patientService.addPatient(patientDto);
	}
	
	//controller for searching patients based on the user name provided by user
	@GetMapping("/patients/by-name/{name}")
	public List<Patient> findPatientByName(@PathVariable String name){
		return patientService.findPatientByName(name);
	}
	
	
	
}
