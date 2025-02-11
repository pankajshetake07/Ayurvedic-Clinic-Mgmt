using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Consult_Patient.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly p09_acmsdbContext _context;

        public PatientController(p09_acmsdbContext context)
        {
            _context = context;
        }

        [HttpGet("ids")]
        public async Task<IActionResult> GetAllPatientIds()
        {
            try
            {
                // Calculate the number of items to skip
                //int skip = (page - 1) * pageSize;

                // Query the database with pagination
                var patientIds = await _context.Patients
                    .OrderBy(p => p.Pid) // Order by patient ID (or another column)
                    //.Skip(skip)
                    //.Take(pageSize)
                    .Select(p => p.Pid)
                    .ToListAsync();

                // Return the list of patient IDs
                return Ok(patientIds);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving patient IDs.");
            }
        }

        // GET: api/patient/ids
        [HttpGet("getPatientId/{uid}")]
        public async Task<IActionResult> GetPatientId(int uid)
        {
            var patient = await _context.Patients
                .Where(p => p.Uid == uid)
                .Select(p => new { p.Pid }) // Fetch only pid
                .FirstOrDefaultAsync();

            if (patient == null)
                return NotFound(new { message = "Patient not found" });

            return Ok(patient);
        }
    }
}
