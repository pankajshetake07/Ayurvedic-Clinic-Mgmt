package com.ACMSystem.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;

import com.ACMSystem.entities.Slot;
import com.ACMSystem.repository.SlotRepository;

import java.time.LocalDate;
import java.time.LocalTime;
public class SlotGeneratorService {
	@Autowired
    private SlotRepository slotRepository;

    private static final LocalTime SLOT_START = LocalTime.of(11, 0); // 11:00 AM
    private static final LocalTime SLOT_END = LocalTime.of(19, 0);  // 7:00 PM
    private static final int SLOT_INTERVAL_MINUTES = 30; // 30-minute intervals

    // Scheduled task to run every midnight and generate slots for the next day
    @Scheduled(cron = "0 0 0 * * ?")  // This will run at midnight every day
    public void generateSlotsForNewDay() {
        LocalDate currentDate = LocalDate.now();  // Get the current date

        // Check if slots already exist for today
        if (slotRepository.existsByDate(currentDate)) {
            return;  // If slots are already generated for today, do nothing
        }

        // Generate slots for today
        LocalTime currentTime = SLOT_START;
        while (!currentTime.isAfter(SLOT_END)) {
            Slot slot = new Slot(currentTime, true, currentDate);  // Mark as available
            slotRepository.save(slot);  // Save each slot to the database
            currentTime = currentTime.plusMinutes(SLOT_INTERVAL_MINUTES);  // Move to next time slot
        }
    }
}
