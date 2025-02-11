using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class User
    {
        public User()
        {
            Employees = new HashSet<Employee>();
            Patients = new HashSet<Patient>();
        }

        public int Uid { get; set; }
        public string Uname { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Fname { get; set; } = null!;
        public string Lname { get; set; } = null!;
        public DateOnly Dob { get; set; }
        public string Address { get; set; } = null!;
        public int Rid { get; set; }
        public string Gender { get; set; } = null!;
        public sbyte? Status { get; set; }
        public string? Email { get; set; }

        public virtual Role RidNavigation { get; set; } = null!;
        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<Patient> Patients { get; set; }
    }
}
