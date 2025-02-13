package com.ACMSUserManagement.dto;

public class ForgotPasswordResponse {
	private boolean success;
    private String message;

    // Constructor
    public ForgotPasswordResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // Getters & Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
