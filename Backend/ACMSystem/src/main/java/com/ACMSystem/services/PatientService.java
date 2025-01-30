package com.ACMSystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSystem.dto.PatientDTO;
import com.ACMSystem.entities.Patient;
import com.ACMSystem.entities.User;
import com.ACMSystem.repository.PatientRepository;
import com.ACMSystem.repository.UserRepository;

@Service
public class PatientService {
	
	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	UserRepository userRepository;
	
	//fetching all the patients from database
	public List<Patient> getAllPatient(){
		return patientRepository.findAll();
	}
	
	//adding new patient record
	public Patient addPatient(PatientDTO patientDto) {
		//fetch the appropriate user so that we can add the patient
		User user = userRepository.findById(patientDto.getUserid())
				.orElseThrow(()->new RuntimeException("User not found with id "+patientDto.getUserid()));
		Patient patient = new Patient(user);
		return patientRepository.save(patient);
	}
	
	//fetch all the patient by first name
	public List<Patient> findPatientByName(String name){
		List<Patient> patients = patientRepository.findPatientByName(name);
		if(patients.isEmpty()) {  //check if patient with given name present or not  
			throw new RuntimeException("No patient found with "+name);
		}
		return patients;
	}
	
}
