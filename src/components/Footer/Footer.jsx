import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Contact the Publisher</h3>
                    <p>mike@runo.com</p>
                    <p>+944 450 904 505</p>
                </div>
                <div className="footer-column">
                    <h3>Explore</h3>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#partners">Partners</a></li>
                        <li><a href="#jobs">Job Opportunities</a></li>
                        <li><a href="#advertise">Advertise</a></li>
                        <li><a href="#membership">Membership</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Headquarter</h3>
                    <p>191 Middleville Road,</p>
                    <p>NY 1001, Sydney</p>
                    <p>Australia</p>
                </div>
                <div className="footer-column">
                    <h3>Connections</h3>
                    <div className="social-icons">
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-pinterest"></i>
                        <i className="fab fa-behance"></i>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>2021 | RUNO Publisher Studio</p>
                <a href="#subscribe" className="subscribe-link">Subscribe Now</a>
            </div>
        </footer>
    );
};

export default Footer;
