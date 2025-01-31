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
import com.ACMSystem.entities.User;
import com.ACMSystem.services.EmployeeService;
import com.ACMSystem.services.UserService;

@RestController
//@RequestMapping("/api/admin")
//@PreAuthorize("hasRole('ADMIN')") // Ensures only admin can access
public class AdminController {

//	@Autowired
//    private EmployeeService employeeService;
//
//    @GetMapping("/employees")
//    public List<Employee> getAllEmployees() {
//        return employeeService.getAllEmployees();
//    }
//	
//
//    @PostMapping("/addEmployee")
//    public EmployeeDto addEmployee(@RequestBody EmployeeDto employeeDTO) {
//        return employeeService.addEmployee(employeeDTO);
//    }
     

//    @DeleteMapping("/deleteEmployee/{eid}")
//    public String deleteEmployee(@PathVariable int eid) {
//        employeeService.deleteEmployee(eid);
//        return "Employee deleted successfully!";
//    }
}

