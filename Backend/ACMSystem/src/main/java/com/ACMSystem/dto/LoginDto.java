package com.ACMSystem.dto;

public class LoginDto {
	
	private String uname;  //user name
	private String password;  //password
	public LoginDto() {
		super();
	}
	public LoginDto(String uname, String password) {
		super();
		this.uname = uname;
		this.password = password;
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
	
	
}
