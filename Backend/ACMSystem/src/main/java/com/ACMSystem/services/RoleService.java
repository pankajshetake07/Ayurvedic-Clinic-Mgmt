package com.ACMSystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSystem.entities.Role;
import com.ACMSystem.repository.RoleRepository;

@Service
public class RoleService {
	
	@Autowired
	RoleRepository rRepo;
	
	//fetching all the roles from database
	public List<Role> getAllRoles(){
		return rRepo.findAll();
	}
}
