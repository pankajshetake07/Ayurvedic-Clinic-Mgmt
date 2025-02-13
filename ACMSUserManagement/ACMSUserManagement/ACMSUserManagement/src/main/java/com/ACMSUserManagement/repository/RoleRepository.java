package com.ACMSUserManagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ACMSUserManagement.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

	public Optional<Role> findByRname(String rname);
}
