using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Consult_Patient.Models
{
    public partial class p09_acmsdbContext : DbContext
    {
        public p09_acmsdbContext()
        {
        }

        public p09_acmsdbContext(DbContextOptions<p09_acmsdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Appointment> Appointments { get; set; } = null!;
        public virtual DbSet<Consult> Consults { get; set; } = null!;
        public virtual DbSet<DietPlan> DietPlans { get; set; } = null!;
        public virtual DbSet<Employee> Employees { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<Medicine> Medicines { get; set; } = null!;
        public virtual DbSet<MedicineForm> MedicineForms { get; set; } = null!;
        public virtual DbSet<Patient> Patients { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Prescription> Prescriptions { get; set; } = null!;
        public virtual DbSet<PrescriptionMedicine> PrescriptionMedicines { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Slot> Slots { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p09_acmsdb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.Aid)
                    .HasName("PRIMARY");

                entity.ToTable("appointment");

                entity.HasIndex(e => e.Pid, "pid");

                entity.HasIndex(e => e.SlotId, "slot_id");

                entity.Property(e => e.Aid).HasColumnName("aid");

                entity.Property(e => e.AppDate).HasColumnName("app_date");

                entity.Property(e => e.AppTime)
                    .HasColumnType("time")
                    .HasColumnName("app_time");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.Property(e => e.SlotId).HasColumnName("slot_id");

                entity.Property(e => e.Status)
                    .HasColumnType("enum('AVAILABLE','BOOKED','CANCELED')")
                    .HasColumnName("status")
                    .HasDefaultValueSql("'AVAILABLE'");

                entity.HasOne(d => d.PidNavigation)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.Pid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("appointment_ibfk_1");
            });

            modelBuilder.Entity<Consult>(entity =>
            {
                entity.HasKey(e => e.Cid)
                    .HasName("PRIMARY");

                entity.ToTable("consult");

                entity.HasIndex(e => e.Aid, "aid")
                    .IsUnique();

                entity.HasIndex(e => e.Pid, "pid");

                entity.Property(e => e.Cid).HasColumnName("cid");

                entity.Property(e => e.Aid).HasColumnName("aid");

                entity.Property(e => e.ConsultDate).HasColumnName("consult_date");

                entity.Property(e => e.Diagnosis)
                    .HasColumnType("text")
                    .HasColumnName("diagnosis");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.Property(e => e.TreatmentPlan)
                    .HasColumnType("text")
                    .HasColumnName("treatment_plan");

                entity.HasOne(d => d.AidNavigation)
                    .WithOne(p => p.Consult)
                    .HasForeignKey<Consult>(d => d.Aid)
                    .HasConstraintName("consult_ibfk_2");

                entity.HasOne(d => d.PidNavigation)
                    .WithMany(p => p.Consults)
                    .HasForeignKey(d => d.Pid)
                    .HasConstraintName("consult_ibfk_1");
            });

            modelBuilder.Entity<DietPlan>(entity =>
            {
                entity.HasKey(e => e.DietId)
                    .HasName("PRIMARY");

                entity.ToTable("diet_plan");

                entity.HasIndex(e => e.Cid, "cid")
                    .IsUnique();

                entity.Property(e => e.DietId).HasColumnName("diet_id");

                entity.Property(e => e.Cid).HasColumnName("cid");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.DietDetails)
                    .HasColumnType("text")
                    .HasColumnName("diet_details");

                entity.Property(e => e.FoodRecommendations)
                    .HasColumnType("text")
                    .HasColumnName("food_recommendations");

                entity.Property(e => e.RoutineRecommendations)
                    .HasColumnType("text")
                    .HasColumnName("routine_recommendations");

                entity.HasOne(d => d.CidNavigation)
                    .WithOne(p => p.DietPlan)
                    .HasForeignKey<DietPlan>(d => d.Cid)
                    .HasConstraintName("diet_plan_ibfk_1");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Eid)
                    .HasName("PRIMARY");

                entity.ToTable("employee");

                entity.HasIndex(e => e.Uid, "uid");

                entity.Property(e => e.Eid).HasColumnName("eid");

                entity.Property(e => e.Doj).HasColumnName("doj");

                entity.Property(e => e.Qualification)
                    .HasMaxLength(255)
                    .HasColumnName("qualification");

                entity.Property(e => e.Regno)
                    .HasMaxLength(50)
                    .HasColumnName("regno");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.Uid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employee_ibfk_1");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasKey(e => e.Fid)
                    .HasName("PRIMARY");

                entity.ToTable("feedback");

                entity.Property(e => e.Fid).HasColumnName("fid");

                entity.Property(e => e.Content)
                    .HasColumnType("text")
                    .HasColumnName("content");

                entity.Property(e => e.Rating).HasColumnName("rating");
            });

            modelBuilder.Entity<Medicine>(entity =>
            {
                entity.ToTable("medicine");

                entity.HasIndex(e => e.Name, "name")
                    .IsUnique();

                entity.Property(e => e.MedicineId).HasColumnName("medicine_id");

                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasColumnName("description");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Price)
                    .HasPrecision(10, 2)
                    .HasColumnName("price");

                entity.Property(e => e.StockQuantity).HasColumnName("stock_quantity");

                entity.HasMany(d => d.Forms)
                    .WithMany(p => p.Medicines)
                    .UsingEntity<Dictionary<string, object>>(
                        "MedicineFormMapping",
                        l => l.HasOne<MedicineForm>().WithMany().HasForeignKey("FormId").HasConstraintName("medicine_form_mapping_ibfk_2"),
                        r => r.HasOne<Medicine>().WithMany().HasForeignKey("MedicineId").HasConstraintName("medicine_form_mapping_ibfk_1"),
                        j =>
                        {
                            j.HasKey("MedicineId", "FormId").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                            j.ToTable("medicine_form_mapping");

                            j.HasIndex(new[] { "FormId" }, "form_id");

                            j.IndexerProperty<int>("MedicineId").HasColumnName("medicine_id");

                            j.IndexerProperty<int>("FormId").HasColumnName("form_id");
                        });
            });

            modelBuilder.Entity<MedicineForm>(entity =>
            {
                entity.HasKey(e => e.FormId)
                    .HasName("PRIMARY");

                entity.ToTable("medicine_form");

                entity.HasIndex(e => e.FormName, "form_name")
                    .IsUnique();

                entity.Property(e => e.FormId).HasColumnName("form_id");

                entity.Property(e => e.FormName)
                    .HasMaxLength(100)
                    .HasColumnName("form_name");
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.Pid)
                    .HasName("PRIMARY");

                entity.ToTable("patient");

                entity.HasIndex(e => e.Uid, "uid");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Patients)
                    .HasForeignKey(d => d.Uid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("patient_ibfk_1");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.BillNo)
                    .HasName("PRIMARY");

                entity.ToTable("payment");

                entity.HasIndex(e => e.Pid, "pid");

                entity.Property(e => e.BillNo).HasColumnName("bill_no");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.PDate).HasColumnName("p_date");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.HasOne(d => d.PidNavigation)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Pid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("payment_ibfk_1");
            });

            modelBuilder.Entity<Prescription>(entity =>
            {
                entity.ToTable("prescription");

                entity.HasIndex(e => e.Cid, "cid")
                    .IsUnique();

                entity.HasIndex(e => e.Pid, "pid");

                entity.Property(e => e.PrescriptionId).HasColumnName("prescription_id");

                entity.Property(e => e.Cid).HasColumnName("cid");

                entity.Property(e => e.Notes)
                    .HasColumnType("text")
                    .HasColumnName("notes");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.Property(e => e.PrescriptionDate).HasColumnName("prescription_date");

                entity.HasOne(d => d.CidNavigation)
                    .WithOne(p => p.Prescription)
                    .HasForeignKey<Prescription>(d => d.Cid)
                    .HasConstraintName("prescription_ibfk_2");

                entity.HasOne(d => d.PidNavigation)
                    .WithMany(p => p.Prescriptions)
                    .HasForeignKey(d => d.Pid)
                    .HasConstraintName("prescription_ibfk_1");
            });

            modelBuilder.Entity<PrescriptionMedicine>(entity =>
            {
                entity.ToTable("prescription_medicine");

                entity.HasIndex(e => e.MedicineId, "medicine_id");

                entity.HasIndex(e => e.PrescriptionId, "prescription_id");

                entity.Property(e => e.PrescriptionMedicineId).HasColumnName("prescription_medicine_id");

                entity.Property(e => e.Dosage)
                    .HasMaxLength(50)
                    .HasColumnName("dosage");

                entity.Property(e => e.Duration)
                    .HasMaxLength(50)
                    .HasColumnName("duration");

                entity.Property(e => e.MedicineId).HasColumnName("medicine_id");

                entity.Property(e => e.PrescriptionId).HasColumnName("prescription_id");

                entity.HasOne(d => d.Medicine)
                    .WithMany(p => p.PrescriptionMedicines)
                    .HasForeignKey(d => d.MedicineId)
                    .HasConstraintName("prescription_medicine_ibfk_2");

                entity.HasOne(d => d.Prescription)
                    .WithMany(p => p.PrescriptionMedicines)
                    .HasForeignKey(d => d.PrescriptionId)
                    .HasConstraintName("prescription_medicine_ibfk_1");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Rid)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.HasIndex(e => e.Rname, "rname")
                    .IsUnique();

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Rname).HasColumnName("rname");
            });

            modelBuilder.Entity<Slot>(entity =>
            {
                entity.ToTable("slot");

                entity.Property(e => e.SlotId).HasColumnName("slot_id");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.IsAvailable)
                    .HasColumnName("is_available")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.SlotTime)
                    .HasColumnType("time")
                    .HasColumnName("slot_time");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Uid)
                    .HasName("PRIMARY");

                entity.ToTable("user");

                entity.HasIndex(e => e.Rid, "rid");

                entity.HasIndex(e => e.Uname, "uname")
                    .IsUnique();

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");

                entity.Property(e => e.Dob).HasColumnName("dob");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Fname)
                    .HasMaxLength(255)
                    .HasColumnName("fname");

                entity.Property(e => e.Gender)
                    .HasColumnType("enum('Male','Female','Other')")
                    .HasColumnName("gender");

                entity.Property(e => e.Lname)
                    .HasMaxLength(255)
                    .HasColumnName("lname");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Uname).HasColumnName("uname");

                entity.HasOne(d => d.RidNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Rid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("user_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
