package com.ACMSystem.dto;

import java.sql.Date;

public class EmployeeDto {
	
	private int regno;   //registration number
	private Date doj;		//date of joining
	private String gender;
	private String qualification;
	private int userId;
	public EmployeeDto() {
		super();
	}
	public EmployeeDto(int regno, Date doj, String gender, String qualification, int userId) {
		super();
		
		this.regno = regno;
		this.doj = doj;
		this.gender = gender;
		this.qualification = qualification;
		this.userId = userId;
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	
}
