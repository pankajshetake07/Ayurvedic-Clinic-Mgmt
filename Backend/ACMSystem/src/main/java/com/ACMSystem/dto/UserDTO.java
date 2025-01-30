package com.ACMSystem.dto;

import java.sql.Date;

public class UserDTO {
	
	private String uname;
	private String password;
	private String fname;
	private String lname;
	private Date dob;
	private String address;
	private String gender;
	private boolean status;
	private int roleId;
	private String rname;
	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserDTO(String uname, String password, String fname, String lname, Date dob, String address, String gender,
			boolean status, int roleId, String rname) {
		super();
		this.uname = uname;
		this.password = password;
		this.fname = fname;
		this.lname = lname;
		this.dob = dob;
		this.address = address;
		this.gender = gender;
		this.status = status;
		this.roleId = roleId;
		this.rname = rname;
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
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public String getRname() {
		return rname;
	}
	public void setRname(String roleName) {
		this.rname = roleName;
	}
	
}
