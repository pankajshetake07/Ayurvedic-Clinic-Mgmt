using System;
using System.Collections.Generic;

namespace Consult_Patient.Models
{
    public partial class DietPlan
    {
        public int DietId { get; set; }
        public int Cid { get; set; }
        public string DietDetails { get; set; } = null!;
        public string? FoodRecommendations { get; set; }
        public string? RoutineRecommendations { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual Consult CidNavigation { get; set; } = null!;
    }
}
