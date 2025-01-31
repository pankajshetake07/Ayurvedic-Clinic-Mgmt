package com.ACMSystem.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="aid")
    private int id; // Appointment ID

//    @ManyToOne
//    @JoinColumn(name = "doctor_id", nullable = false)
//    private User doctor; // Reference to Doctor (User table)

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private User patient; // Reference to Patient (nullable if not booked)

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate; // Date of the appointment

    @Column(name = "appointment_time", nullable = false)
    private LocalTime appointmentTime; // Time of the appointment (11:00 AM - 7:00 PM)

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status; // Status (AVAILABLE / BOOKED / CANCELED)

    public Appointment() {}

    public Appointment(LocalDate appointmentDate, LocalTime appointmentTime, AppointmentStatus status) {
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

//    public User getDoctor() {
//        return doctor;
//    }
//
//    public void setDoctor(User doctor) {
//        this.doctor = doctor;
//    }

    public User getPatient() {
        return patient;
    }

    public void setPatient(User patient) {
        this.patient = patient;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }
}
