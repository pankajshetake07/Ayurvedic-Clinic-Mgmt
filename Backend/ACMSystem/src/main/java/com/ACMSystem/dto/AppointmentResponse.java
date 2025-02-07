package com.ACMSystem.dto;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentResponse {
	private LocalDate appDate;
    private LocalTime appTime;
    private String fname;	//first name
	private String lname; 	//last name
	private Date dob;
	private String gender;
	private String email;
	private Integer appId;
	
	public Integer getAppId() {
		return appId;
	}
	public void setAppId(Integer appId) {
		this.appId = appId;
	}
	public AppointmentResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AppointmentResponse(LocalDate appDate, LocalTime appTime, String fname, String lname, Date dob,
			String gender, String email) {
		super();
	
		this.appDate = appDate;
		this.appTime = appTime;
		this.fname = fname;
		this.lname = lname;
		this.dob = dob;
		this.gender = gender;
		this.email = email;
	}
	
	public LocalDate getAppDate() {
		return appDate;
	}
	public void setAppDate(LocalDate appDate) {
		this.appDate = appDate;
	}
	public LocalTime getAppTime() {
		return appTime;
	}
	public void setAppTime(LocalTime appTime) {
		this.appTime = appTime;
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
