package com.ACMSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ACMSystem.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	//this query returns if the username and password is correct or not
	//JPQL
	@Query("select u from User u where uname=:uname and password =:password")
	public Optional<User> loginUser(String uname, String password);
	
	//this query returns the role based on the user name
	//native query
	@Query(value="select r.rname from role r join user u where r.rid = u.uid and u.uname = ?",nativeQuery = true)
	public String getUserRole(String username);
	
	
	public Optional<User> findByFname(String fname);
}
