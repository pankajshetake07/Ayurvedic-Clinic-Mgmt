package com.ACMSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.LoginDto;
import com.ACMSystem.dto.UserDTO;
import com.ACMSystem.entities.Patient;
import com.ACMSystem.entities.Role;
import com.ACMSystem.entities.User;
import com.ACMSystem.services.RoleService;
import com.ACMSystem.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	
	@GetMapping("/getAllUsers")
	public List<User> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@GetMapping("/getAllRoles")
	public List<Role> getAllRoles(){
		return roleService.getAllRoles();
	}
	
	@PostMapping("/register")
	public Patient insertUserRecord(@RequestBody UserDTO userDto) {
	    return userService.insertUserRecord(userDto);
	}
	
	@PostMapping("/login")
	public User loginUser(@RequestBody LoginDto credentials) {
//		System.out.println("Username: " + credentials.getUname());
//	    System.out.println("Password: " + credentials.getPassword());
	    User user = userService.loginUser(credentials.getUname(), credentials.getPassword());
//	    System.out.println("Returned User: " + user);
	    return user;
	}
	
	@GetMapping("/getUserRole/{username}")
	public String getUserRole(@PathVariable String username) {
		return userService.getUserRole(username);
	}
	
	@DeleteMapping("/delete/patient/{fname}")
	public ResponseEntity<String> deletePatient(@PathVariable String fname) {
	    User deletedUser = userService.deletePatientByFname(fname);
	    return ResponseEntity.ok("User with first name '" + deletedUser.getFname() + "' has been deleted successfully.");
	}

}
