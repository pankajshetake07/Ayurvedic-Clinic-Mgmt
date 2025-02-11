using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Appointment
    {
        public int Aid { get; set; }
        public int Pid { get; set; }
        public DateOnly AppDate { get; set; }
        public TimeOnly AppTime { get; set; }
        public string Status { get; set; } = null!;
        public int? SlotId { get; set; }

        public virtual Patient PidNavigation { get; set; } = null!;
        public virtual Consult? Consult { get; set; }
    }
}
