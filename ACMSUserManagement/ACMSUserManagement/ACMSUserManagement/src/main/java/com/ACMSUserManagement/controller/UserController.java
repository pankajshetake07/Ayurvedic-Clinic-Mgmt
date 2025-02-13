package com.ACMSUserManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSUserManagement.dto.LoginDto;
import com.ACMSUserManagement.dto.UserDTO;
import com.ACMSUserManagement.entities.Patient;
import com.ACMSUserManagement.entities.Role;
import com.ACMSUserManagement.entities.User;
import com.ACMSUserManagement.services.RoleService;
import com.ACMSUserManagement.services.UserService;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	
//	@GetMapping("/getAllUsers")
//	public List<User> getAllUsers(){
//		return userService.getAllUsers();
//	}
//	
//	@GetMapping("/getAllRoles")
//	public List<Role> getAllRoles(){
//		return roleService.getAllRoles();
//	}
	
	@PostMapping("/auth/register")
	public Patient insertUserRecord(@RequestBody UserDTO userDto) {
	    return userService.insertUserRecord(userDto);
	}
	
	@PostMapping("/auth/login")
	public User loginUser(@RequestBody LoginDto credentials) {
	    User user = userService.loginUser(credentials.getUname(), credentials.getPassword());
	    return user;
	}
	
//	@GetMapping("/getUserRole/{username}")
//	public String getUserRole(@PathVariable String username) {
//		return userService.getUserRole(username);
//	}
//	
//	@DeleteMapping("/delete/patient/{fname}")
//	public ResponseEntity<String> deletePatient(@PathVariable String fname) {
//	    User deletedUser = userService.deletePatientByFname(fname);
//	    return ResponseEntity.ok("User with first name '" + deletedUser.getFname() + "' has been deleted successfully.");
//	}
//	
//	@PutMapping("/user/update/{id}")
//	public User updateUser(@PathVariable int id, @RequestBody UserDTO userDTO) {
//        return userService.updateUser(id, userDTO);
//    }

}
