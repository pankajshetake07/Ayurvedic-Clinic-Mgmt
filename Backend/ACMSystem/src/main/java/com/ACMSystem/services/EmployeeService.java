package com.ACMSystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSystem.dto.EmployeeDto;
import com.ACMSystem.entities.Employee;
import com.ACMSystem.entities.User;
import com.ACMSystem.repository.EmployeeRepository;
import com.ACMSystem.repository.UserRepository;

@Service
public class EmployeeService {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	UserRepository userRepository;
	
	//fetching all the employees from database
	public List<Employee> getAllEmployee(){
		return employeeRepository.findAll();
	}
	
	
	//adding new employee
	public Employee insertEmployee(EmployeeDto empDto) {
		User user = userRepository.findById(empDto.getUserId())
				.orElseThrow(()->new RuntimeException("user not found with ID : "+empDto.getUserId()));
		Employee employee = new Employee();
		employee.setRegno(empDto.getRegno());
		employee.setDoj(empDto.getDoj());
		employee.setQualification(empDto.getQualification());
		employee.setUser(user);
		return employeeRepository.save(employee);
	}
}
