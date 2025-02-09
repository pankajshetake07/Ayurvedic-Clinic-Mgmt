package com.ACMSystem.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fid;

    @Column(nullable = false, length = 500)
    private String content;

    private int rating;

//    @OneToOne
//    @JoinColumn(name = "pid", referencedColumnName = "pid", nullable = false, unique = true)
//    private Patient patient;

    public Feedback() {
        super();
    }

    public Feedback(int fid, String content, int rating) {
        super();
        this.fid = fid;
        this.content = content;
        this.rating = rating;
        //this.patient = patient;
    }

    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

//    public Patient getPatient() {
//        return patient;
//    }
//
//    public void setPatient(Patient patient) {
//        this.patient = patient;
//    }
}
