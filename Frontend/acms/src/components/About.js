import React from "react";
import logo from "../images/Logo.png";
import treatments from "../images/Treatements.jpg";
import nature from "../images/homepageimages.webp";
import herbs from "../images/herbs.jpg";
import wellness from "../images/Wellness.jpeg";
import "../styles/About.css"

export default function About() {
    return (
        <div>
            <div className="about-container">
                <h1 className="about-header">About Us</h1>

                <div className="about-section">
                    <div className="image-container">
                        <img
                            src={logo}
                            alt="Sakshi Ayurveda Clinic"
                            className="clinic-logo"
                        />
                    </div>
                    <div className="about-text">
                        <p>
                            <strong>Sakshi Ayurveda</strong> is dedicated to bringing the ancient wisdom of Ayurveda into modern lives.
                            Our clinic management system ensures that both practitioners and patients experience holistic care with ease and efficiency.
                        </p>
                    </div>
                </div>

                <div className="about-section">
                    <div className="image-container">
                        <img
                            src={treatments}
                            alt="Ayurveda Treatments"
                            className="treatment-image"
                        />
                    </div>
                    <div className="about-text">
                        <p>
                            <strong>Sakshi Ayurveda & Naturopathy</strong> is an authentic Ayurveda & Naturopathy brand committed to delivering natural care to your body, mind, and soul.
                            Through the methodologies of ancient Ayurveda & Naturopathy, we aim to restore harmony and health.
                        </p>
                    </div>
                </div>

                <div className="about-section">
                    <div className="image-container">
                        <img
                            src={nature}
                            alt="Nature Healing"
                            className="nature-image"
                        />
                    </div>
                    <div className="about-text">
                        <p>
                            Sakshi Ayurveda has become a quintessential brand combining ancient knowledge with modern aesthetics.
                            We provide purifying remedies that enhance overall health and well-being, drawing from ancient practices while researching new ways to improve wellness.
                        </p>
                    </div>
                </div>

                <hr className="divider" />

                <h2 className="section-header">Our Philosophy</h2>

                <div className="about-section">
                    <div className="image-container">
                        <img
                            src={herbs}
                            alt="Ayurvedic Herbs"
                            className="herbs-image"
                        />
                    </div>
                    <div className="about-text">
                        <p>
                            At Sakshi Ayurveda Clinic, we specialize in a wide range of therapies based on ancient Ayurvedic principles, offering treatments that are customized to meet the individual needs of our patients.
                            From chronic conditions to digestive disorders, stress management, and skin care, our goal is to support natural healing and wellness.
                        </p>

                        <p>
                            We are proud to have a team of certified Ayurvedic doctors and therapists who work closely together to ensure the highest standards of care.
                            Our treatments use pure and authentic Ayurvedic herbs, oils, and therapies to help rejuvenate both body and mind.
                        </p>
                    </div>
                </div>

                <hr className="divider" />

                <h2 className="section-header">Our Mission</h2>

                <div className="about-section">
                    <div className="image-container">
                        <img
                            src={wellness}
                            alt="Wellness"
                            className="wellness-image"
                        />
                    </div>
                    <div className="about-text">
                        <p>
                            Our mission is to promote wellness through personalized treatments, focusing on prevention, cure, and overall well-being.
                            Experience a journey toward better health, vitality, and peace of mind, guided by the age-old wisdom of Ayurveda.
                        </p>

                        <p>
                            We are here to guide you on your path to natural healing, helping you achieve a healthier, more balanced lifestyle.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
