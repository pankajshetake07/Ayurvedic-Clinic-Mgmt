package com.ACMSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.EmployeeDto;
import com.ACMSystem.entities.Employee;
import com.ACMSystem.services.EmployeeService;

@RestController
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	//controller for fetching all the employee
	@GetMapping("/getAllEmployee")
	public List<Employee> getAllEmployee(){
		return employeeService.getAllEmployee();
	}
	
	//controller for adding new employee record
	@PostMapping("/insertEmployee")
	public Employee insertEmployee(@RequestBody EmployeeDto empDto) {
		return employeeService.insertEmployee(empDto);
	}
}//this is Employee controller
