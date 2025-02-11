using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class PrescriptionMedicine
    {
        public int PrescriptionMedicineId { get; set; }
        public int PrescriptionId { get; set; }
        public int MedicineId { get; set; }
        public string Dosage { get; set; } = null!;
        public string Duration { get; set; } = null!;

        public virtual Medicine? Medicine { get; set; }
        public virtual Prescription Prescription { get; set; } = null!;
    }
}
