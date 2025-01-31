package com.ACMSystem.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSystem.dto.EmployeeDto;
import com.ACMSystem.dto.UserDTO;
import com.ACMSystem.entities.Employee;
import com.ACMSystem.entities.Role;
import com.ACMSystem.entities.User;
import com.ACMSystem.repository.EmployeeRepository;
import com.ACMSystem.repository.RoleRepository;
import com.ACMSystem.repository.UserRepository;

@Service
public class EmployeeService {
	
	@Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    // Get all employees
//    public List<EmployeeDto> getAllEmployees() {
//        return employeeRepository.findAll()
//        		.stream()
//                .map(employee -> new EmployeeDto(
//                        employee.getEid(),
//                        employee.getDoj(),
//                        employee.getRegno(),
//                        employee.getQualification(),
//                        new UserDTO(
//                                employee.getUser().getUname(),
//                                null, // Password should not be exposed
//                                employee.getUser().getFname(),
//                                employee.getUser().getLname(),
//                                employee.getUser().getDob(),
//                                employee.getUser().getAddress(),
//                                employee.getUser().getGender(),
//                                employee.getUser().getEmail(),
//                                employee.getUser().getRole().getRid()
//                        )
//                ))
//                .collect(Collectors.toList());
//    }
    public List<Employee> getAllEmployees(){
    	return employeeRepository.findAll();
    }
    
    public Optional<Employee> getEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    // Add Employee 
    public EmployeeDto addEmployee(EmployeeDto employeeDTO) {
        Role role = roleRepository.findById(employeeDTO.getUser().getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Create new User
        User user = new User();
        user.setUname(employeeDTO.getUser().getUname());
        user.setPassword(employeeDTO.getUser().getPassword());
        user.setFname(employeeDTO.getUser().getFname());
        user.setLname(employeeDTO.getUser().getLname());
        user.setDob(employeeDTO.getUser().getDob());
        user.setAddress(employeeDTO.getUser().getAddress());
        user.setGender(employeeDTO.getUser().getGender());
        user.setEmail(employeeDTO.getUser().getEmail());
        user.setRole(role);
        user = userRepository.save(user); // Auto-generate uid

        
        // Create Employee
        Employee employee = new Employee(user, employeeDTO.getDoj(), employeeDTO.getRegno(), employeeDTO.getQualification());
        employee = employeeRepository.save(employee); // Auto-generate eid

        return new EmployeeDto(
                employee.getEid(),
                employee.getDoj(),
                employee.getRegno(),
                employee.getQualification(),
                new UserDTO(
                        user.getUname(),
                        null, //password field
                        user.getFname(),
                        user.getLname(),
                        user.getDob(),
                        user.getAddress(),
                        user.getGender(),
                        user.getEmail(),
                        user.getRole().getRid()
                )
        );
    }
    
    public List<Employee> getEmployeeByFname(String fname) {
        return employeeRepository.findByUser_Fname(fname);  // Searching by fname in User
    }
    

    public Employee deleteEmployee(int id) {
    	Optional<Employee> opt = employeeRepository.findById(id);
    	if(!opt.isPresent()) {
    		throw new RuntimeException("No Employee found with id "+id);
    	}
    	Employee emp = opt.get();
    	employeeRepository.delete(emp);
    	return emp;
    }
    
}
