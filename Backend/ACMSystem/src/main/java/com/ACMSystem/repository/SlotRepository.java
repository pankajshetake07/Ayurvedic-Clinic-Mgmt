package com.ACMSystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ACMSystem.entities.Slot;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Integer> {
	// Find available slots for a specific date
    List<Slot> findByDateAndIsAvailable(LocalDate date, boolean isAvailable);
    List<Slot> findByDate(LocalDate date);
    
    // Check if slots exist for a specific date
    boolean existsByDate(LocalDate date);
}
