package com.ACMSystem.dto;

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
	
}
