package com.ACMSUserManagement.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.ACMSUserManagement.entities.Employee;
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	//Optional<Employee> findByUserUid(int uid); // Get employee by User ID
	List<Employee> findByUser_Fname(String fname);
	Employee findByUser_Uid(int uid);
	
}
