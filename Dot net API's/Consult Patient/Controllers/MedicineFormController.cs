using Consult_Patient.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Consult_Patient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineFormController : ControllerBase
    {
        private readonly p09_acmsdbContext _context;

        public MedicineFormController(p09_acmsdbContext context)
        {
            _context = context;
        }

        [HttpGet("getAll")]
        public IActionResult GetAllMedicineForms()
        {
            var forms = _context.MedicineForms.ToList();
            return Ok(forms);
        }
    }
}
