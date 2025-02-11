using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Consult
    {
        public int Cid { get; set; }
        public int Pid { get; set; }
        public int Aid { get; set; }
        public string? Diagnosis { get; set; }
        public string? TreatmentPlan { get; set; }
        public DateOnly ConsultDate { get; set; }

        public virtual Appointment AidNavigation { get; set; } = null!;
        public virtual Patient PidNavigation { get; set; } = null!;
        public virtual DietPlan? DietPlan { get; set; }
        public virtual Prescription? Prescription { get; set; }
    }
}
