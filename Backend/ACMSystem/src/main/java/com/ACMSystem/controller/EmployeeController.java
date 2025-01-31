package com.ACMSystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.EmployeeDto;
import com.ACMSystem.entities.Employee;
import com.ACMSystem.services.EmployeeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmployeeController {
	
	@Autowired
    private EmployeeService employeeService;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
	

    @PostMapping("/addEmployee")
    public EmployeeDto addEmployee(@RequestBody EmployeeDto employeeDTO) {
        return employeeService.addEmployee(employeeDTO);
    }
    
    
 // Find employee by ID
    @GetMapping("/employee/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable int id) {
        return employeeService.getEmployeeById(id);
    }
    
    @GetMapping("/employee/fname/{fname}")
    public List<Employee> getEmployeeByFname(@PathVariable String fname) {
        return employeeService.getEmployeeByFname(fname);
    }
    
    @DeleteMapping("/employee/delete/{id}")
    public Employee deleteEmployee(@PathVariable int id) {
    	return employeeService.deleteEmployee(id);
    }
}
