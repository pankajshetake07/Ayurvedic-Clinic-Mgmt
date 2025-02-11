using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Slot
    {
        public int SlotId { get; set; }
        public TimeOnly SlotTime { get; set; }
        public bool? IsAvailable { get; set; }
        public DateOnly Date { get; set; }
    }
}
