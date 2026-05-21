"use client";

import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--dark)', color: 'white', padding: '60px 20px 30px' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div className="logo" style={{ justifyContent: 'center', marginBottom: '35px' }}>
                    <img 
                        src="/logo_full.png" 
                        alt="CHK Ceylon Tours Logo" 
                        style={{ 
                            height: '145px', 
                            width: 'auto', 
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.15))'
                        }} 
                    />
                </div>

                <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
                    <a href="https://web.facebook.com/profile.php?id=61567698557599&sk=followers" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem' }}><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/chkceylon?igsh=MXNldXFpd3h4bGNzeA==&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem' }}><i className="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UCFlor_kOoJYITY9bUN0EYpw" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem' }}><i className="fab fa-youtube"></i></a>
                    <a href="#" style={{ color: 'white', fontSize: '1.2rem' }}><i className="fab fa-tripadvisor"></i></a>
                </div>

                <div className="divider" style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '30px' }}></div>

                <div className="bottom-links" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', opacity: 0.6, fontSize: '0.9rem' }}>
                    <p>
                        © Software designed by{' '}
                        <a href="https://fusionwavesystems.com" target="_blank" rel="noopener noreferrer" style={{ 
                            background: 'linear-gradient(90deg, #00d4ff 0%, #0072ff 100%)', 
                            WebkitBackgroundClip: 'text', 
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '800',
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}>
                            Fusion Wave Systems (Pvt) Ltd
                        </a>{' '}
                        |{' '}
                        <a href="tel:+94718530500" style={{ color: 'white', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                            +94 71 8 530 500
                        </a>{' '}
                        /{' '}
                        <a href="tel:+94726530500" style={{ color: 'white', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                            +94 72 6 530 500
                        </a>
                    </p>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <a href="/admin/login" style={{ color: 'white' }} title="Admin Login"><i className="fas fa-lock"></i></a>
                        <a href="/about-us" style={{ color: 'white' }}>About Us</a>
                        <a href="#" style={{ color: 'white' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'white' }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
