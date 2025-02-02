package com.ACMSystem.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="slot_id")
    private int id; // Slot ID (auto-incremented)

    @Column(name="slot_time")
    private LocalTime slotTime; // Time for the slot (e.g., 11:00:00)
    
    @Column(name="is_available")
    private boolean isAvailable; // Availability of the slot (TRUE = available, FALSE = booked)
    private LocalDate date; // Date for the slot (e.g., '2025-02-05')

    public Slot() {
    	super();
    }
    // Constructor
    public Slot(LocalTime slotTime, boolean isAvailable, LocalDate date) {
        this.slotTime = slotTime;
        this.isAvailable = isAvailable;
        this.date = date;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalTime getSlotTime() {
        return slotTime;
    }

    public void setSlotTime(LocalTime slotTime) {
        this.slotTime = slotTime;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
