package com.ACMSUserManagement.services;

import org.springframework.stereotype.Service;

import com.ACMSUserManagement.entities.User;
import com.ACMSUserManagement.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ForgotPasswordService {
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public boolean processForgotPassword(String uname) {
        User user = userRepository.findByUname(uname);
        if (user == null) {
            return false; // User not found
        }

        // Send email with user's original password
        String subject = "Your Requested Password";
        String body = "Hello " + user.getFname() + ",\n\n" +
                      "Your password is: " + user.getPassword() + "\n\n" +
                      "Please keep it secure.";

        emailService.sendEmail(user.getEmail(), subject, body);
        return true;
    }
}
