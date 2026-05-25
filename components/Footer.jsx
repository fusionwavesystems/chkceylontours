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

                <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '35px' }}>
                    <a href="https://web.facebook.com/profile.php?id=61567698557599&sk=followers" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2', fontSize: '2.2rem', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}><i className="fab fa-facebook"></i></a>
                    <a href="https://www.instagram.com/chkceylon?igsh=MXNldXFpd3h4bGNzeA==&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.2rem', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}><i className="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UCFlor_kOoJYITY9bUN0EYpw" target="_blank" rel="noopener noreferrer" style={{ color: '#FF0000', fontSize: '2.2rem', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}><i className="fab fa-youtube"></i></a>
                    <a href="#" style={{ color: '#34E0A1', fontSize: '2.2rem', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}><i className="fab fa-tripadvisor"></i></a>
                </div>

                <div className="divider" style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '30px' }}></div>

                <div className="bottom-links" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px', opacity: 0.8, fontSize: '0.9rem' }}>
                    <div className="dev-credit-gradient-wrapper" style={{
                        padding: '1.5px',
                        background: 'linear-gradient(90deg, #00d4ff 0%, #0072ff 100%)',
                        borderRadius: '30px',
                        display: 'inline-flex',
                        boxShadow: '0 4px 20px rgba(0, 114, 255, 0.3)',
                        margin: '0 auto'
                    }}>
                        <div className="dev-credit-box" style={{
                            padding: '12px 24px',
                            background: '#151515', // Dark background to cover the gradient inside
                            borderRadius: '29px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: '8px',
                        }}>
                        <span>© Software designed by</span>
                        <a href="https://fusionwavesystems.com" target="_blank" rel="noopener noreferrer" style={{ 
                            background: 'linear-gradient(90deg, #00d4ff 0%, #0072ff 100%)', 
                            WebkitBackgroundClip: 'text', 
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '800',
                            textDecoration: 'none',
                            display: 'inline-block',
                            whiteSpace: 'nowrap'
                        }}>
                            Fusion Wave Systems (Pvt) Ltd
                        </a>
                        <span style={{ opacity: 0.5 }}>|</span>
                        <span style={{ whiteSpace: 'nowrap' }}>
                            <a href="tel:+94718530500" style={{ color: 'white', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                                +94 71 8 530 500
                            </a>
                            <span style={{ margin: '0 6px', opacity: 0.5 }}>/</span>
                            <a href="tel:+94726530500" style={{ color: 'white', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                                +94 72 6 530 500
                            </a>
                        </span>
                    </div>
                    </div>
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
