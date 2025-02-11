using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Employee
    {
        public int Eid { get; set; }
        public int Uid { get; set; }
        public string Regno { get; set; } = null!;
        public DateOnly Doj { get; set; }
        public string Qualification { get; set; } = null!;

        public virtual User UidNavigation { get; set; } = null!;
    }
}
