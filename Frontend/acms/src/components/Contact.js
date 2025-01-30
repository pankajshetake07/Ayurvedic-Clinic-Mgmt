import React from "react";
import "../styles/Contact.css";

export default function Contact() {
    return (
        <div className="contact-container">
            {/* Image Section with Text Overlay */}
            <div className="image-section">
                <div className="text-overlay">Feel free to reach out to us</div>
            </div>

            {/* Additional Contact Information */}
            <div className="contact-info">
                <h1>Contact Us</h1>
                <p>
                    If you have any questions or would like to book an appointment, feel free to reach out.
                    We're here to help you on your journey to holistic health and wellness.
                </p>
                <p>
                    You can contact us via phone, email, or by using the following details:
                </p>
            </div>

            {/* Contact Details */}
            <div className="contact-details">
                <h1>Have Any Query? Let's Connect</h1>
                <p><strong>Showroom No:</strong> 22, Shivaji Nagar, near FC Road Deccan, Pune</p>
                <p><strong>Email:</strong> abcd2202@gmail.com</p>
                <p><strong>Contact No:</strong> 8793229227</p>
            </div>
        </div>
    );
}
