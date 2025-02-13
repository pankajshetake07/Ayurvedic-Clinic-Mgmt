package com.ACMSUserManagement.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSUserManagement.dto.PatientDTO;
import com.ACMSUserManagement.dto.UserDTO;
import com.ACMSUserManagement.entities.Patient;
import com.ACMSUserManagement.entities.Role;
import com.ACMSUserManagement.entities.User;
import com.ACMSUserManagement.repository.PatientRepository;
import com.ACMSUserManagement.repository.RoleRepository;
import com.ACMSUserManagement.repository.UserRepository;

@Service
public class PatientService {
	
	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	//fetching all the patients from database
	public List<Patient> getAllPatient(){
		return patientRepository.findAll();
	}
	
//	//adding new patient record
//	public Patient addPatient(PatientDTO patientDto) {
//		//fetch the appropriate user so that we can add the patient
//		User user = userRepository.findById(patientDto.getUserid())
//				.orElseThrow(()->new RuntimeException("User not found with id "+patientDto.getUserid()));
//		Patient patient = new Patient(user);
//		return patientRepository.save(patient);
//	}
	
	//fetch all the patient by first name
	public List<Patient> findPatientByName(String name){
		List<Patient> patients = patientRepository.findPatientByName(name);
		if(patients.isEmpty()) {  //check if patient with given name present or not  
			throw new RuntimeException("No patient found with "+name);
		}
		return patients;
	}
	
	public User registerPatient(UserDTO userDTO) {
         //Get Role from database
        Role role = roleRepository.findById(5)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Create new User with Patient Role
        User newUser = new User(userDTO.getUname(), userDTO.getPassword(), userDTO.getFname(), userDTO.getLname(), 
                userDTO.getDob(), userDTO.getAddress(), userDTO.getGender(), userDTO.getEmail(), role);

        // Save User first
        User savedUser = userRepository.save(newUser);

        // Create Patient record using the same UID
        Patient patient = new Patient(savedUser);
        patientRepository.save(patient);

        return savedUser;
    }
	
	public Optional<Patient> findPatientById(int id) {
		return patientRepository.findById(id);
	}
	
}
