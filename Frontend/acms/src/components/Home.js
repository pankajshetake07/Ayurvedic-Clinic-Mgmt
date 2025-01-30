import React from "react";
import '../styles/Home.css';


export default function Home() {
    return (
        <div className="interactive-container">
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Sakshi Ayurveda Panchakarma Clinic</h1>
                    <p className="hero-subtitle">
                        Discover ancient Ayurvedic wisdom combined with modern convenience.
                    </p>
                    <button className="cta-button">Learn More</button>
                </div>
            </header>

            <main className="content">
                <section className="intro">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <p className="section-description">
                        At Sakshi Ayurveda, we aim to provide seamless clinic management,
                        ensuring a holistic experience for both practitioners and patients.
                    </p>
                    <div className="card-grid">
                        <div className="card">
                            <h3>Streamlined Clinic Operations</h3>
                            <p>
                                Manage appointments, patient records, billing, and inventory—all in one place.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Personalized Patient Care</h3>
                            <p>
                                Keep detailed patient histories and treatment plans for a truly personalized approach.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Ayurvedic Expertise</h3>
                            <p>
                                Built specifically for Ayurvedic clinics, our system integrates traditional practices with modern technology.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2 className="cta-title">Ready to Elevate Your Clinic?</h2>
                    <p className="cta-description">
                        Contact us today to get started with Sakshi Ayurveda Clinic Management
                        System.
                    </p>
                    <button className="cta-button">Get Started</button>
                </section>
            </main>
        </div>
    );
};
