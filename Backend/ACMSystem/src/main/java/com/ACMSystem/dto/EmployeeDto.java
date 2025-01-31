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
	
	
}
