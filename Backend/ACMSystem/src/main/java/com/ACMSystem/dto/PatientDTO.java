package com.ACMSystem.dto;

public class PatientDTO {
	
	private int userid;

	public PatientDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PatientDTO(int userid) {
		super();
		this.userid = userid;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}
	
}
