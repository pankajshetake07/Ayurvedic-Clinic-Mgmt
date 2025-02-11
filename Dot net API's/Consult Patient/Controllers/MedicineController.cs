using Consult_Patient.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class MedicineController : ControllerBase
{
    private readonly p09_acmsdbContext _context;

    public MedicineController(p09_acmsdbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Medicine>>> GetAllMedicines()
    {
        return await _context.Medicines.ToListAsync();
    }
}
