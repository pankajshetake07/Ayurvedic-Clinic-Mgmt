package com.ACMSUserManagement.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSUserManagement.dto.UserDTO;
import com.ACMSUserManagement.entities.Patient;
import com.ACMSUserManagement.entities.Role;
import com.ACMSUserManagement.entities.User;
import com.ACMSUserManagement.repository.PatientRepository;
import com.ACMSUserManagement.repository.RoleRepository;
import com.ACMSUserManagement.repository.UserRepository;

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
		user.setEmail(userdto.getEmail());	
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
	
	public User updateUser(int id, UserDTO userDTO) { //fetching user by userID
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        existingUser.setUname(userDTO.getUname());
        existingUser.setPassword(userDTO.getPassword());
        existingUser.setFname(userDTO.getFname());
        existingUser.setLname(userDTO.getLname());
        existingUser.setDob(userDTO.getDob());
        existingUser.setAddress(userDTO.getAddress());
        existingUser.setGender(userDTO.getGender());
        existingUser.setEmail(userDTO.getEmail());
        //existingUser.setStatus(userDTO.getStatus());

        return userRepository.save(existingUser);
    }
	
	
}
