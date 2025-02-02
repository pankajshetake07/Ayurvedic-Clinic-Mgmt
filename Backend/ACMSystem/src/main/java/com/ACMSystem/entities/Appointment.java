package com.ACMSystem.entities;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aid; // Appointment ID (auto-incremented)

    @ManyToOne
    @JoinColumn(name = "pid")  // Patient ID (foreign key)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "slot_id")  // Slot ID (foreign key to Slot table)
    private Slot slot;  // Reference to Slot entity
    
    @Column(name="app_date")
    private LocalDate appDate;  // Appointment Date
    @Column(name="app_time")
    private LocalTime appTime;  // Appointment Time

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;  // Status (PENDING, BOOKED, CANCELLED)

    
    public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}

	// Constructor
    public Appointment(Patient patient, Slot slot, LocalDate appDate, LocalTime appTime, AppointmentStatus status) {
        this.patient = patient;
        this.slot = slot;
        this.appDate = appDate;
        this.appTime = appTime;
        this.status = status;
    }

    // Getters and Setters
    public int getAid() {
        return aid;
    }

    public void setAid(int aid) {
        this.aid = aid;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Slot getSlot() {
        return slot;
    }

    public void setSlot(Slot slot) {
        this.slot = slot;
    }

    public LocalDate getAppDate() {
        return appDate;
    }

    public void setAppDate(LocalDate appDate) {
        this.appDate = appDate;
    }

    public LocalTime getAppTime() {
        return appTime;
    }

    public void setAppTime(LocalTime appTime) {
        this.appTime = appTime;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }
}
