package com.ACMSystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSystem.entities.Feedback;
import com.ACMSystem.repository.FeedbackRepository;
import com.ACMSystem.repository.PatientRepository;

@Service
public class FeedbackService {
	
	@Autowired
	FeedbackRepository feedbackRepository;
	
	PatientRepository patientRepository;
	
	// Add Feedback for a Patient
    public Feedback addFeedback(String content, int rating) {
//        Optional<Patient> optionalPatient = patientRepository.findById(pid);
//        if (optionalPatient.isEmpty()) {
//            throw new RuntimeException("Patient not found with ID: " + pid);
//        }

        // Check if the patient has already given feedback
//        if (feedbackRepository.existsByPatientPid(pid)) {
//            throw new RuntimeException("Feedback already exists for patient ID: " + pid);
//        }

        Feedback feedback = new Feedback();
        feedback.setContent(content);
        feedback.setRating(rating);
        //feedback.setPatient(optionalPatient.get());

        return feedbackRepository.save(feedback);
    }
   
    public List<Feedback> getAllFeedbacks(){
    	return feedbackRepository.findAll();
    }
}
