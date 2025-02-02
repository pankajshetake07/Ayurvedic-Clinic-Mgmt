package com.ACMSystem.dto;

public class AppointmentRequest {
	private Integer patientId;
    private Integer slotId;
    private String appDate;
    private String appTime;

    // Getters and Setters
    public Integer getPatientId() { return patientId; }
    public void setPatientId(Integer patientId) { this.patientId = patientId; }
    
    public Integer getSlotId() { return slotId; }
    public void setSlotId(Integer slotId) { this.slotId = slotId; }
    
    public String getAppDate() { return appDate; }
    public void setAppDate(String appDate) { this.appDate = appDate; }
    
    public String getAppTime() { return appTime; }
    public void setAppTime(String appTime) { this.appTime = appTime; }
}
