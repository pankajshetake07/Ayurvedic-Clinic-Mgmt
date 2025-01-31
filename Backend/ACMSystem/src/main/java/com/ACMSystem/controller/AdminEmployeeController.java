package com.ACMSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.dto.EmployeeDto;
import com.ACMSystem.entities.Employee;
import com.ACMSystem.services.EmployeeService;

@RestController
@RequestMapping("/api/admin/employees")
public class AdminEmployeeController {
	@Autowired
    private EmployeeService employeeService;

//    @GetMapping("/all")
//    public List<EmployeeDto> getAllEmployees() {
//        return employeeService.getAllEmployees();
//    }
//
//    @PostMapping("/add/{userId}")
//    public Employee addEmployee(@PathVariable int userId, @RequestBody Employee employee) {
//        return employeeService.insertEmployee(employee, userId);
//    }
//
//    @DeleteMapping("/delete/{eid}")
//    public String deleteEmployee(@PathVariable int eid) {
//        employeeService.deleteEmployee(eid);
//        return "Employee deleted successfully!";
//    }

}
