package com.ACMSystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.ACMSystem.entities.Slot;
import com.ACMSystem.repository.SlotRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class SlotGeneratorService {

    @Autowired
    private SlotRepository slotRepository;

    private static final LocalTime SLOT_START = LocalTime.of(11, 0); // 11:00 AM
    private static final LocalTime SLOT_END = LocalTime.of(19, 0);  // 7:00 PM
    private static final int SLOT_INTERVAL_MINUTES = 30; // 30-minute intervals
    private static final int DAYS_AHEAD = 7; // Generate slots for 7 days ahead

    
    @Scheduled(cron = "0 0 0 ? * SUN") // Runs every Sunday at 12:00 AM
    public void generateSlotsForNextWeek() {
        System.out.println("Running weekly slot generation...");

        for (int i = 0; i < DAYS_AHEAD; i++) {
            LocalDate targetDate = LocalDate.now().plusDays(i);

            
            List<Slot> existingSlots = slotRepository.findByDate(targetDate);
            if (!existingSlots.isEmpty()) {
                System.out.println("Slots already exist for: " + targetDate);
                continue;
            }

            System.out.println("Generating slots for: " + targetDate);

            
            LocalTime currentTime = SLOT_START;
            while (!currentTime.isAfter(SLOT_END)) {
                Slot slot = new Slot(currentTime, true, targetDate);
                slotRepository.save(slot);
                currentTime = currentTime.plusMinutes(SLOT_INTERVAL_MINUTES);
            }

            System.out.println("Slots successfully created for: " + targetDate);
        }
    }
}
