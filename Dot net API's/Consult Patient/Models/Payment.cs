using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Payment
    {
        public int BillNo { get; set; }
        public int Pid { get; set; }
        public int Amount { get; set; }
        public DateOnly PDate { get; set; }

        public virtual Patient PidNavigation { get; set; } = null!;
    }
}
