using Consult_Patient.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Consult_Patient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly p09_acmsdbContext _context;

        public DoctorController(p09_acmsdbContext context)
        {
            _context = context;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetDoctorProfile()
        {
            try
            {
                var doctor = await _context.Employees
                    .Include(e => e.UidNavigation)
                        .ThenInclude(u => u.RidNavigation)
                    .FirstOrDefaultAsync(e => e.UidNavigation.RidNavigation.Rname == "Doctor");

                if (doctor == null || doctor.UidNavigation == null || doctor.UidNavigation.RidNavigation == null)
                {
                    return NotFound("Doctor profile not found.");
                }

                var doctorProfile = new DoctorProfileDto
                {
                    Username = doctor.UidNavigation.Uname,
                    FirstName = doctor.UidNavigation.Fname,
                    LastName = doctor.UidNavigation.Lname,
                    Address = doctor.UidNavigation.Address,
                    DateOfBirth = doctor.UidNavigation.Dob.ToString("yyyy-MM-dd"), // Handle nullable DateTime
                    Email = doctor.UidNavigation.Email,
                    Gender = doctor.UidNavigation.Gender,
                    RegistrationNumber = doctor.Regno,
                    DateOfJoining = doctor.Doj.ToString("yyyy-MM-dd"), // Assuming Doj is not nullable
                    Qualification = doctor.Qualification
                };

                return Ok(doctorProfile);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the doctor profile.");
            }
        }
    }
}