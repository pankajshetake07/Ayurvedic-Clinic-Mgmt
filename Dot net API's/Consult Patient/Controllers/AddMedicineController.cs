using Consult_Patient.Models;
using Microsoft.AspNetCore.Mvc;

namespace Consult_Patient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddMedicineController : ControllerBase
    {
        private readonly p09_acmsdbContext _context;

        public AddMedicineController(p09_acmsdbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public IActionResult AddMedicine([FromBody] AddMedicineRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest("Invalid medicine data.");
            }

            // Create new Medicine entity from DTO
            var medicine = new Medicine
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                StockQuantity = request.StockQuantity
            };

            _context.Medicines.Add(medicine);
            _context.SaveChanges();

            return Ok("Medicine added successfully!");
        }
    }

    // DTO (Data Transfer Object) for adding medicine
    public class AddMedicineRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
    }
}
