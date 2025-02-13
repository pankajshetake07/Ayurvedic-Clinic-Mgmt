package com.ACMSUserManagement.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSUserManagement.dto.ForgotPasswordRequest;
import com.ACMSUserManagement.dto.ForgotPasswordResponse;
import com.ACMSUserManagement.services.ForgotPasswordService;

@RestController 
public class ForgotPasswordController {

	@Autowired
	private ForgotPasswordService forgotPasswordService;
	
	@PostMapping("/auth/forgot-password")
	public ResponseEntity<ForgotPasswordResponse> forgotPassword(@RequestBody ForgotPasswordRequest request) {
	    String uname = request.getUname();

	    boolean success = forgotPasswordService.processForgotPassword(uname);
	    if (!success) {
	        return ResponseEntity.status(404).body(new ForgotPasswordResponse(false, "User not found"));
	    }
	    return ResponseEntity.ok(new ForgotPasswordResponse(true, "Password sent to registered email"));
	}
}
