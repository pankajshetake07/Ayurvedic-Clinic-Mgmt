namespace Consult_Patient.Models
{
    public class DoctorProfileDto
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string DateOfBirth { get; set; } // Formatted as string
        public string Email { get; set; }
        public string Gender { get; set; }
        public string RegistrationNumber { get; set; }
        public string DateOfJoining { get; set; } // Formatted as string
        public string Qualification { get; set; }
    }
}
