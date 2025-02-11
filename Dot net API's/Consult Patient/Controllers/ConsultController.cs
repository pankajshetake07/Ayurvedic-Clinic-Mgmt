using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Consult_Patient.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Consult_Patient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultController : ControllerBase
    {
        private readonly p09_acmsdbContext _context;

        public ConsultController(p09_acmsdbContext context)
        {
            _context = context;
        }

        [HttpPost("prescribe")]
        public async Task<IActionResult> PrescribePatient([FromBody] PrescriptionRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Step 1: Create and save the Consultation
                var consultation = new Consult
                {
                    Pid = request.PatientId,
                    Aid = request.AppointmentId,
                    Diagnosis = request.Diagnosis,
                    TreatmentPlan = request.TreatmentPlan,
                    ConsultDate = DateOnly.FromDateTime(DateTime.UtcNow)
                };
                _context.Consults.Add(consultation);
                await _context.SaveChangesAsync();

                // Step 2: Create and save the Prescription
                var prescription = new Prescription
                {
                    Pid = request.PatientId,
                    Cid = consultation.Cid,
                    PrescriptionDate = DateOnly.Parse(request.PrescriptionDate),
                    Notes = "Prescribed by doctor"
                };
                _context.Prescriptions.Add(prescription);
                await _context.SaveChangesAsync();

                // Step 3: Create and save the Diet Plan
                var dietPlan = new DietPlan
                {
                    Cid = consultation.Cid,
                    DietDetails = request.DietDetails,
                    FoodRecommendations = request.FoodRecommendations,
                    RoutineRecommendations = request.RoutineRecommendations,
                    CreatedAt = DateTime.UtcNow
                };
                _context.DietPlans.Add(dietPlan);
                await _context.SaveChangesAsync();

                // Step 4: Add prescribed medicines
                foreach (var med in request.Medicines)
                {
                    var prescriptionMedicine = new PrescriptionMedicine
                    {
                        PrescriptionId = prescription.PrescriptionId,
                        MedicineId = med.MedicineId,
                        Dosage = med.Dosage,
                        Duration = med.Duration
                    };
                    _context.PrescriptionMedicines.Add(prescriptionMedicine);
                }
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return Ok(new { message = "Prescription created successfully!", consultation.Cid });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new
                {
                    error = "An error occurred while processing the request.",
                    details = ex.InnerException?.Message ?? ex.Message
                });
            }
        }
    }

    // DTO to receive prescription request
    public class PrescriptionRequest
    {
        public int PatientId { get; set; }
        public int AppointmentId { get; set; }
        public string Diagnosis { get; set; }
        public string TreatmentPlan { get; set; }
        public string PrescriptionDate { get; set; }
        public string DietDetails { get; set; }
        public string FoodRecommendations { get; set; }
        public string RoutineRecommendations { get; set; }
        public MedicineRequest[] Medicines { get; set; }
    }

    public class MedicineRequest
    {
        public int MedicineId { get; set; }
        public string Dosage { get; set; }
        public string Duration { get; set; }
    }
}
