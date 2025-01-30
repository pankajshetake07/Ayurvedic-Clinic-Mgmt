package com.ACMSystem.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uid;        //user id
	private String uname;	//user name
	private String password;	//password
	private String fname;	//first name
	private String lname; 	//last name
	private Date dob;		//data of birth
	private String address;		//Address
	private String gender;		//Gender
	private boolean status; 		//Whether the patient is active or not
	
	//mapped with the role table
//	@ManyToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name="rid")
//	private Role role;
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "rid", nullable = false)
	private Role role;
	
	//mapped with the user table
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("user")
	private Employee employee;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("user")
	private Patient patient;
	
	public User() {
		super();		
	}

	public User(int uid, String uname, String password, String fname, String lname, Date dob, String address,
			String gender, boolean status, Role role, Employee employee) {
		super();
		this.uid = uid;
		this.uname = uname;
		this.password = password;
		this.fname = fname;
		this.lname = lname;
		this.dob = dob;
		this.address = address;
		this.gender = gender;
		this.role = role;
		this.status = status;
		this.employee = employee;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	public boolean getStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
}
