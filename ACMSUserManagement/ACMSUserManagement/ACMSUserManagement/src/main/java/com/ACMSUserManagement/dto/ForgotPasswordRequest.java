package com.ACMSUserManagement.dto;

public class ForgotPasswordRequest {
	private String uname;

    // Constructor
    public ForgotPasswordRequest() {}

    public ForgotPasswordRequest(String uname) {
        this.uname = uname;
    }

    // Getter & Setter
    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }
}
