package com.ACMSUserManagement.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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
	private String regno; //registration number
	private Date doj; //date of joining
	//private String gender;  //gender
	private String qualification;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="uid", referencedColumnName = "uid", nullable = false)
	@JsonIgnoreProperties("employee")
	private User user;

	public Employee() {
		super();
	}

	public Employee(int eid, String regno, Date doj, String qualification, User user) {
		super();
		this.eid = eid;
		this.regno = regno;
		this.doj = doj;
		//this.gender = gender;
		this.qualification = qualification;
		this.user = user;
	}
	public Employee(User user, Date doj, String regno, String qualification) {
        this.user = user;
        this.doj = doj;
        this.regno = regno;
        this.qualification = qualification;
    }

	public int getEid() {
		return eid;
	}

	public void setEid(int eid) {
		this.eid = eid;
	}

	public String getRegno() {
		return regno;
	}

	public void setRegno(String regno) {
		this.regno = regno;
	}

	public Date getDoj() {
		return doj;
	}

	public void setDoj(Date doj) {
		this.doj = doj;
	}


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
