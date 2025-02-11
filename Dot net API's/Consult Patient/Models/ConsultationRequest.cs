public class ConsultationRequest
{
    public int PatientId { get; set; }
    public int AppointmentId { get; set; }
    public string Diagnosis { get; set; }
    public string TreatmentPlan { get; set; }
    public string PrescriptionDate { get; set; } // Date as string (e.g., "yyyy-MM-dd")
    public string DietDetails { get; set; }
    public string FoodRecommendations { get; set; }
    public string RoutineRecommendations { get; set; }
    public List<MedicineDto> Medicines { get; set; }
}

public class MedicineDto
{
    public int MedicineId { get; set; }
    public string Dosage { get; set; }
    public string Duration { get; set; }
}