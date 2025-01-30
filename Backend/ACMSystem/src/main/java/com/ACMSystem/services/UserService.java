package com.ACMSystem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSystem.dto.UserDTO;
import com.ACMSystem.entities.Patient;
import com.ACMSystem.entities.Role;
import com.ACMSystem.entities.User;
import com.ACMSystem.repository.PatientRepository;
import com.ACMSystem.repository.RoleRepository;
import com.ACMSystem.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PatientRepository patientRepository;

	// fetching all the users from the database
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	// adding new user record
	public Patient insertUserRecord(UserDTO userdto) {
		User user = new User();
		user.setUname(userdto.getUname());
		user.setPassword(userdto.getPassword());
		user.setFname(userdto.getFname());
		user.setLname(userdto.getLname());
		user.setDob(userdto.getDob());
		user.setAddress(userdto.getAddress());
		user.setGender(userdto.getGender());
		user.setStatus(true);
		
		Role role = roleRepository.findByRname("Patient")
	            .orElseThrow(() -> new RuntimeException("Role not found with ID: " + userdto.getRoleId()));
	    user.setRole(role);

	    // Save User to the database
	    User savedUser = userRepository.save(user);

	    //Create a Patient linked to the newly created User
	    Patient patient = new Patient();
	    patient.setUser(savedUser); 
	    return patientRepository.save(patient);
	}

	// check for the login credentials
	public User loginUser(String uname, String password) {
		User u;
		Optional<User> opt = userRepository.loginUser(uname, password);
		try {
			u = opt.get();
		} catch (Exception e) {
			u = null;
		}
		return u;
	}

	// getting user role based on the user name
	public String getUserRole(String username) {
		return userRepository.getUserRole(username);
	}
	
	@Transactional
	public User deletePatientByFname(String fname) {
		Optional<User> opt = userRepository.findByFname(fname);
	    if (!opt.isPresent()) {
	        throw new RuntimeException("No user found with the first name: " + fname);
	    }
	    User user = opt.get();
	    userRepository.delete(user);
	    return user;
	}
}
