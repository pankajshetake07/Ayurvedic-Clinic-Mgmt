using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class MedicineForm
    {
        public MedicineForm()
        {
            Medicines = new HashSet<Medicine>();
        }

        public int FormId { get; set; }
        public string FormName { get; set; } = null!;

        public virtual ICollection<Medicine> Medicines { get; set; }
    }
}
