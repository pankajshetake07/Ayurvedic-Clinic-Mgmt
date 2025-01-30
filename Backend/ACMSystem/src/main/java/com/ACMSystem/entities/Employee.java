package com.ACMSystem.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="employee")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int eid;  //employee id
	private int regno; //registration number
	private Date doj; //date of joining
	//private String gender;  //gender
	private String qualification;
	
	@OneToOne
	@JoinColumn(name="uid", referencedColumnName = "uid", nullable = false)
	@JsonIgnoreProperties("employee")
	private User user;

	public Employee() {
		super();
	}

	public Employee(int eid, int regno, Date doj, String qualification, User user) {
		super();
		this.eid = eid;
		this.regno = regno;
		this.doj = doj;
		//this.gender = gender;
		this.qualification = qualification;
		this.user = user;
	}

	public int getEid() {
		return eid;
	}

	public void setEid(int eid) {
		this.eid = eid;
	}

	public int getRegno() {
		return regno;
	}

	public void setRegno(int regno) {
		this.regno = regno;
	}

	public Date getDoj() {
		return doj;
	}

	public void setDoj(Date doj) {
		this.doj = doj;
	}

//	public String getGender() {
//		return gender;
//	}
//
//	public void setGender(String gender) {
//		this.gender = gender;
//	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
}
