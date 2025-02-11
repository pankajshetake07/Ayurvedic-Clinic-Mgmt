using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Medicine
    {
        public Medicine()
        {
            PrescriptionMedicines = new HashSet<PrescriptionMedicine>();
            Forms = new HashSet<MedicineForm>();
        }

        public int MedicineId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }

        public virtual ICollection<PrescriptionMedicine> PrescriptionMedicines { get; set; }

        public virtual ICollection<MedicineForm> Forms { get; set; }
    }
}
