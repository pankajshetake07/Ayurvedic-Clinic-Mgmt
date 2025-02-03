package com.ACMSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ACMSystem.entities.Patient;
import com.ACMSystem.entities.User;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
	
	//this query return user role based on the user name
	@Query("SELECT p FROM Patient p WHERE p.user.fname = :name AND p.user.role.rname = 'Patient'")
	public List<Patient> findPatientByName(String name);
	
	Optional<Patient> findByUser_Uid(int uid);
	
	@Query(value = "SELECT * FROM user WHERE uid = :uid", nativeQuery = true)
	User getPatientByUserId(int uid);
}

