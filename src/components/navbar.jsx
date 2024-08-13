import React from 'react'
import './Navbar.css';
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiLineVertical } from "react-icons/pi";
import { Router } from 'react-router-dom';

const Navbar = () => {
    return (

        <div className="banner">
            <div className="banner-content">
                <span className="badge">ADVENTURE</span>
                <h1>Richird Norton photorealistic</h1>
                <h1> rendering as real photos</h1>
                <p>08.08.2021 — Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
            </div>
            <div className="nav-bar">
                <div className="logo">RUNO</div>
                <div className="banner-section">

                    <div className="menu">
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/article">Articles</a>
                        <a href="/contact">Contact Us</a>
                    </div>
                    <div className="social-icons">
                        <FaTwitter className='icons' />
                        <FaFacebook className='icons' />
                        <FaYoutube className='icons' />
                        <FaPinterest className='icons' />
                        <PiLineVertical className='icons' />
                        <IoSearch className='icons' />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Navbar