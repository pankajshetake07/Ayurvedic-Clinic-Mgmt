using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Patient
    {
        public Patient()
        {
            Appointments = new HashSet<Appointment>();
            Consults = new HashSet<Consult>();
            Payments = new HashSet<Payment>();
            Prescriptions = new HashSet<Prescription>();
        }

        public int Pid { get; set; }
        public int Uid { get; set; }

        public virtual User UidNavigation { get; set; } = null!;
        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<Consult> Consults { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Prescription> Prescriptions { get; set; }
    }
}
