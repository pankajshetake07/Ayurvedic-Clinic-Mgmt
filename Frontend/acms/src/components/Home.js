import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
    const navigate = useNavigate();

    const handleBookAppointment = () => {
        const isRegistered = localStorage.getItem("userRegistered");
        if (isRegistered) {
            navigate("/login");
        } else {
            navigate("/register");
        }
    };

    return (
        <div className="home-container">
            <header className="hero">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="hero-title" >Welcome to PrakritiSync</h1>
                        <p className="hero-subtitle">
                            Experience holistic healing through ancient Ayurvedic practices combined with modern technology.
                        </p>
                        <button className="cta-button" onClick={handleBookAppointment}>Book Appointment</button>
                    </div>
                </div>
            </header>

            <main className="content">
                <section className="about">
                    <h2>Why Choose PrakritiSync?</h2>
                    <p>
                        We specialize in natural healing, personalized treatment plans, and seamless healthcare management.
                    </p>
                    <div className="card-container">
                        <div className="card">
                            <h3>Advanced Clinic Management</h3>
                            <p>Effortless appointment scheduling, patient records, and role-based access for clinic staff.</p>
                        </div>
                        <div className="card">
                            <h3>Personalized Ayurvedic Care</h3>
                            <p>Tailored treatment plans based on your health history and body constitution.</p>
                        </div>
                        <div className="card">
                            <h3>Expert Practitioners</h3>
                            <p>Our experienced Ayurvedic doctors provide holistic solutions for better well-being.</p>
                        </div>
                    </div>
                </section>

                <section className="testimonials">
                    <h2>What Our Patients Say</h2>
                    <div className="testimonial">
                        <p>"The Ayurvedic treatments have transformed my health. The online booking system makes everything so convenient!"</p>
                        <span>- Rahul Sharma</span>
                    </div>
                    <div className="testimonial">
                        <p>"Sakshi Ayurveda provides a perfect blend of traditional healing and modern efficiency. Highly recommended!"</p>
                        <span>- Priya Desai</span>
                    </div>
                </section>

                <section className="cta-section">
                    <h2>Begin Your Healing Journey</h2>
                    <p>Schedule an appointment today and experience the benefits of Ayurveda.</p>
                    <button className="cta-button" onClick={handleBookAppointment}>Get Started</button>
                </section>
            </main>
        </div>
    );
};
