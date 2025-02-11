using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class Feedback
    {
        public int Fid { get; set; }
        public string Content { get; set; } = null!;
        public int Rating { get; set; }
    }
}
