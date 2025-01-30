package com.ACMSystem.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="patient")
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pid;  //patient Id
	
	@OneToOne
	@JoinColumn(name="uid", referencedColumnName = "uid", nullable = false)
	private User user;

	public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Patient(int pid, User user) {
		super();
		this.pid = pid;
		this.user = user;
	}
	
	public Patient(User user) {
		this.user = user;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
