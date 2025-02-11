using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Prescription
    {
        public Prescription()
        {
            PrescriptionMedicines = new HashSet<PrescriptionMedicine>();
        }

        public int PrescriptionId { get; set; }
        public int Pid { get; set; }
        public int Cid { get; set; }
        public DateOnly PrescriptionDate { get; set; }
        public string? Notes { get; set; }

        public virtual Consult CidNavigation { get; set; } = null!;
        public virtual Patient PidNavigation { get; set; } = null!;
        public virtual ICollection<PrescriptionMedicine> PrescriptionMedicines { get; set; }
    }
}
