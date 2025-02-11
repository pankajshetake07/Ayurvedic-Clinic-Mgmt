using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Consult_Patient.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Consult_Patient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        private readonly p09_acmsdbContext _context;

        public TreatmentController(p09_acmsdbContext context)
        {
            _context = context;
        }

        [HttpGet("treatment/{patientId}")]
        public async Task<IActionResult> GetPatientTreatment(int patientId)
        {
            var consultations = await _context.Consults
                .Where(c => c.Pid == patientId)
                .Include(c => c.Prescription)
                    .ThenInclude(p => p.PrescriptionMedicines)
                        .ThenInclude(pm => pm.Medicine)
                .Include(c => c.DietPlan)
                .OrderByDescending(c => c.ConsultDate)
                .Select(c => new
                {
                    ConsultationId = c.Cid,
                    Diagnosis = c.Diagnosis,
                    TreatmentPlan = c.TreatmentPlan,
                    ConsultDate = c.ConsultDate,

                    Prescription = c.Prescription != null ? new
                    {
                        //PrescriptionDate = c.Prescription.PrescriptionDate,
                        Notes = c.Prescription.Notes,
                        Medicines = c.Prescription.PrescriptionMedicines.Select(pm => new
                        {
                            MedicineId = pm.MedicineId,
                            MedicineName = pm.Medicine != null ? pm.Medicine.Name : "Unknown Medicine", // Handle null
                            Dosage = pm.Dosage,
                            Duration = pm.Duration
                        }).ToList()
                    } : null,

                    DietPlan = c.DietPlan != null ? new
                    {
                        DietDetails = c.DietPlan.DietDetails,
                        FoodRecommendations = c.DietPlan.FoodRecommendations,
                        RoutineRecommendations = c.DietPlan.RoutineRecommendations
                    } : null
                })
                .ToListAsync();

            if (consultations == null || consultations.Count == 0)
                return NotFound(new { message = "No treatment records found for this patient." });

            return Ok(consultations);
        }

    }
}
