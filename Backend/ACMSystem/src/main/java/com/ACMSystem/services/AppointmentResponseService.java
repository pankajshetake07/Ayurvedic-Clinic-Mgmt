package com.ACMSystem.services;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ACMSystem.dto.AppointmentResponse;
import com.ACMSystem.entities.Appointment;
import com.ACMSystem.repository.AppointmentRepository;
import com.ACMSystem.repository.PatientRepository;
import com.ACMSystem.repository.SlotRepository;
import com.ACMSystem.repository.UserRepository;

@Service
public class AppointmentResponseService {
	@Autowired
    private AppointmentRepository appointmentRepository;
	
	@Autowired
	UserRepository userRepository;
	
		
	 @Autowired
	    private SlotRepository slotRepository;
	 
	 @Autowired
	    private PatientRepository patientRepository;
	 
	 public List<AppointmentResponse> getAppointments()
	 {
		 List<AppointmentResponse> responseList = new ArrayList();
		 List<Appointment> appointments = appointmentRepository.findAllWithDateGreaterthanorEqualTo();
		 for(Appointment appointment: appointments)
		 {
			 AppointmentResponse response = new AppointmentResponse();
			 response.setAppId(appointment.getAid());
			 response.setAppDate(appointment.getAppDate());
			 response.setAppTime(appointment.getAppTime());
			 response.setFname(appointment.getPatient().getUser().getFname());
			 response.setLname(appointment.getPatient().getUser().getLname());
			 response.setDob(appointment.getPatient().getUser().getDob());
			 response.setGender(appointment.getPatient().getUser().getGender());
			 response.setEmail(appointment.getPatient().getUser().getEmail());
			 
			 responseList.add(response);
			 
		 }
		 return responseList;
	 }

}
