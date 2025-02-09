package com.ACMSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ACMSystem.entities.Feedback;
import com.ACMSystem.services.FeedbackService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {
	
	@Autowired
	FeedbackService feedbackService;
	
	@PostMapping("/addfeedback")
	public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
	    Feedback savedFeedback = feedbackService.addFeedback(feedback.getContent(), feedback.getRating());
	    return ResponseEntity.ok(savedFeedback);
	}
	
	@GetMapping("/feedback/getAll")
	public List<Feedback> getAllFeedbacks(){
		return feedbackService.getAllFeedbacks();
	}

}
