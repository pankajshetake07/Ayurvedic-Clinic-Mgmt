package com.ACMSystem.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequest {
	private int userId;
	private int slotId;
	private LocalDate appDate;
	private LocalTime appTime;
}
