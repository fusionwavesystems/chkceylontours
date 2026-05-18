"use client";

import React, { useState, useEffect } from 'react';

const Navbar = ({ config }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                    <img 
                        src="/logo_full.png" 
                        alt="CHK Ceylon Tours Logo" 
                        className="navbar-logo-img"
                    />
                </a>

                <style jsx>{`
                    .navbar-logo-img {
                        height: 105px;
                        width: auto;
                        object-fit: contain;
                        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                        filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.15));
                    }
                    
                    :global(nav.scrolled) .navbar-logo-img {
                        height: 70px;
                    }
                    
                    @media (max-width: 768px) {
                        .navbar-logo-img {
                            height: 60px !important;
                        }
                        :global(nav.scrolled) .navbar-logo-img {
                            height: 48px !important;
                        }
                        :global(nav) {
                            padding: 10px 0 !important;
                        }
                        :global(nav.scrolled) {
                            padding: 6px 0 !important;
                        }
                    }
                `}</style>

                <div style={{ display: 'flex', alignItems: 'center', gap: scrolled ? '20px' : '40px' }}>
                    <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
                        <li><a href="/" onClick={() => setMobileOpen(false)}>Home</a></li>
                        <li><a href="/destinations" onClick={() => setMobileOpen(false)}>Destinations</a></li>
                        <li><a href="/packages" onClick={() => setMobileOpen(false)}>Tour Packages</a></li>
                        <li><a href="/activities" onClick={() => setMobileOpen(false)}>Activities</a></li>
                        <li><a href="/hotels" onClick={() => setMobileOpen(false)}>Hotels</a></li>
                        <li><a href="/gallery" onClick={() => setMobileOpen(false)}>Gallery</a></li>
                        <li><a href="/about-us" onClick={() => setMobileOpen(false)}>About Us</a></li>
                    </ul>

                    <div className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                        <i className={mobileOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
