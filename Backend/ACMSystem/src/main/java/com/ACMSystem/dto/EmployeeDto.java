package com.ACMSystem.dto;

import java.sql.Date;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class EmployeeDto {
//	
//	private int eid; // Needed for retrieval but ignored when adding
//    private Date doj;
//    private String regno;
//    private String qualification;
//    private UserDTO user; // Embedded UserDTO
//
//    public EmployeeDto() {}
//
//    public EmployeeDto(int eid, Date doj, String regno, String qualification, UserDTO user) {
//        this.eid = eid;
//        this.doj = doj;
//        this.regno = regno;
//        this.qualification = qualification;
//        this.user = user;
//    }
//	
//	
//}

public class EmployeeDto {
	
	private int eid; // Needed for retrieval but ignored when adding
    private Date doj;
    private String regno;
    private String qualification;
    private UserDTO user; // Embedded UserDTO

    public EmployeeDto() {}

    public EmployeeDto(int eid, Date doj, String regno, String qualification, UserDTO user) {
        this.eid = eid;
        this.doj = doj;
        this.regno = regno;
        this.qualification = qualification;
        this.user = user;
    }

	public int getEid() {
		return eid;
	}

	public void setEid(int eid) {
		this.eid = eid;
	}

	public Date getDoj() {
		return doj;
	}

	public void setDoj(Date doj) {
		this.doj = doj;
	}

	public String getRegno() {
		return regno;
	}

	public void setRegno(String regno) {
		this.regno = regno;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	
	
}

