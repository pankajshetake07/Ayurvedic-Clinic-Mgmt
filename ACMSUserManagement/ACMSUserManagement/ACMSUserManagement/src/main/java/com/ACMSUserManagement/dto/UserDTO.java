package com.ACMSUserManagement.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	
	private int uid;
    private String uname;
    private String password;
    private String fname;
    private String lname;
    private Date dob;
    private String address;
    private String gender;
    private String email;
    private int roleId;
    //private boolean status;

    public UserDTO() {}

	    public UserDTO(String uname, String password, String fname, String lname, Date dob, String address,
	            String gender, String email, int roleId) {
	 this.uname = uname;
	 this.password = password;
	 this.fname = fname;
	 this.lname = lname;
	 this.dob = dob;
	 this.address = address;
	 this.gender = gender;
	 this.email = email;
	 this.roleId = roleId;
	 //this.status = status;
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

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public int getRoleId() {
			return roleId;
		}

		public void setRoleId(int roleId) {
			this.roleId = roleId;
		}

	    
	
}
