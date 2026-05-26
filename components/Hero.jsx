"use client";

import React, { useState, useEffect } from 'react';

const Hero = ({ heroData }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Calculate Sri Lanka time (UTC+5:30)
    const slUtc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const slDate = new Date(slUtc + (3600000 * 5.5));
    const h = slDate.getHours();
    const m = slDate.getMinutes();
    const s = slDate.getSeconds();

    return (
        <section className="hero" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div className="hero-slides-wrapper">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0
                    }}
                >
                    <source src="/hero2.mp4" type="video/mp4" />
                </video>

                {/* Dark overlay */}
                <div className="hero-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)',
                    zIndex: 1
                }} />
            </div>

            {/* Ancient Clock - Middle Right */}
            <div className="mobile-hide" style={{
                position: 'absolute',
                top: '50%',
                right: '40px',
                transform: 'translateY(-50%)',
                zIndex: 20,
                width: '130px',
                height: '130px',
                background: 'radial-gradient(circle, #e6d5a1 0%, #a27b40 100%)',
                borderRadius: '50%',
                border: '6px solid #5c3a21',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 10px 25px rgba(0,0,0,0.6), 0 0 0 3px #cca052',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 1.5s ease forwards'
            }}>
                {/* Clock Face Details */}
                <div style={{ position: 'absolute', inset: '4px', border: '1px dashed rgba(92, 58, 33, 0.4)', borderRadius: '50%' }}></div>
                
                {/* Roman Numerals */}
                {[12, 3, 6, 9].map((num, i) => (
                    <span key={i} style={{
                        position: 'absolute',
                        fontWeight: '900',
                        fontFamily: 'Georgia, serif',
                        color: '#3e2723',
                        fontSize: '16px',
                        textShadow: '1px 1px 0px rgba(255,255,255,0.3)',
                        transform: `rotate(${i * 90}deg) translateY(-42px) rotate(-${i * 90}deg)`
                    }}>
                        {['XII', 'III', 'VI', 'IX'][i]}
                    </span>
                ))}
                
                {/* Small ticks for all hours */}
                {[...Array(12)].map((_, i) => (
                    <div key={`tick-${i}`} style={{
                        position: 'absolute',
                        width: '2px',
                        height: '6px',
                        background: '#5c3a21',
                        transform: `rotate(${i * 30}deg) translateY(-52px)`
                    }}></div>
                ))}
                
                {/* Hour Hand */}
                <div style={{ 
                    position: 'absolute', width: '5px', height: '30px', background: '#2c1e16', 
                    bottom: '50%', transformOrigin: 'bottom center', 
                    transform: `rotate(${(h % 12) * 30 + m * 0.5}deg)`, 
                    borderRadius: '3px 3px 0 0', boxShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }} />
                
                {/* Minute Hand */}
                <div style={{ 
                    position: 'absolute', width: '3px', height: '42px', background: '#3e2723', 
                    bottom: '50%', transformOrigin: 'bottom center', 
                    transform: `rotate(${m * 6 + s * 0.1}deg)`, 
                    borderRadius: '2px 2px 0 0', boxShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }} />
                
                {/* Second Hand */}
                <div style={{ 
                    position: 'absolute', width: '1px', height: '48px', background: '#d32f2f', 
                    bottom: '50%', transformOrigin: 'bottom center', 
                    transform: `rotate(${s * 6}deg)`,
                    boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }} />
                <div style={{ 
                    position: 'absolute', width: '1px', height: '10px', background: '#d32f2f', 
                    top: '50%', transformOrigin: 'top center', 
                    transform: `rotate(${s * 6}deg)`
                }} />
                
                {/* Center dot */}
                <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#cca052', borderRadius: '50%', border: '2px solid #2c1e16', zIndex: 5 }} />

                {/* SL TIME Label */}
                <div style={{ position: 'absolute', bottom: '-30px', color: '#fff', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '3px', textShadow: '1px 1px 5px #000, 0 0 10px rgba(0,0,0,0.8)', whiteSpace: 'nowrap' }}>
                    SL TIME
                </div>
            </div>

            {/* Content */}
            <div className="container" style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: '90px' }}>
                <div className="hero-content" style={{ textAlign: 'right', maxWidth: '800px', width: '100%' }}>
                    <h1 className="reveal active" style={{ textAlign: 'right', fontSize: '4.5rem', marginBottom: '0' }}>
                        {(heroData?.title || 'Visit Sri Lanka').replace('Sri Lanka', 'Sri\u00A0Lanka')}
                    </h1>
                </div>
            </div>

            {/* Top Right Action Buttons & Subtitle */}
            <div className="hero-btns reveal active mobile-hide" style={{ 
                position: 'absolute', 
                top: '120px', 
                right: '50px', 
                zIndex: 20, 
                transitionDelay: '0.6s', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '15px'
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#packages" className="btn" style={{ 
                        backgroundColor: 'transparent', color: '#dcb81b', border: '2px solid #dcb81b', 
                        padding: '10px 24px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px'
                    }}>View Packages</a>
                    <a href="#destinations" className="btn" style={{ 
                        backgroundColor: '#dcb81b', color: '#111', 
                        padding: '10px 24px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px'
                    }}>Start Exploring</a>
                </div>
                
                {/* Animated Subtitle */}
                <div style={{ 
                    display: 'inline-block', border: '1px solid rgba(220, 184, 27, 0.4)', padding: '6px 18px', 
                    borderRadius: '4px', animation: 'slideLeftFade 1s 1s ease forwards', opacity: 0,
                    background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)'
                }}>
                    <span className="subtitle" style={{ 
                        color: '#dcb81b', margin: 0, display: 'block', textAlign: 'right', 
                        fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase' 
                    }}>
                        {heroData?.subtitle_tag || 'Premium Island Experiences'}
                    </span>
                </div>
            </div>

            {/* AI Watermark Cover - Sri Lankan Flag */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                width: '240px',
                height: '130px',
                zIndex: 20,
            }} title="Proudly Sri Lankan">
                {/* Silver Flagpole */}
                <div style={{ 
                    position: 'absolute', left: '-10px', top: '-35px', width: '10px', height: '190px', 
                    background: 'linear-gradient(to right, #666 0%, #eee 50%, #666 100%)', 
                    borderRadius: '5px', zIndex: 21, boxShadow: '4px 4px 10px rgba(0,0,0,0.6)' 
                }}></div>
                
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg" 
                    alt="Sri Lanka Flag" 
                    className="waving-flag"
                    style={{ 
                        width: '100%', height: '100%', objectFit: 'cover', 
                        transformOrigin: 'left center', 
                        borderRadius: '0 4px 4px 0', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        borderLeft: 'none', 
                        boxShadow: '5px 5px 15px rgba(0,0,0,0.6)' 
                    }}
                />
            </div>

            <style jsx>{`
                .hero-slides-wrapper {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                }

                .waving-flag {
                    animation: flutterFlag 2s ease-in-out infinite alternate;
                }

                @keyframes flutterFlag {
                    0% { transform: perspective(400px) rotateY(-10deg) skewY(-2deg); filter: brightness(0.9); }
                    100% { transform: perspective(400px) rotateY(30deg) skewY(3deg); filter: brightness(1.15); }
                }

                @media (max-width: 768px) {
                    .mobile-hide {
                        display: none !important;
                    }
                    .hero-slides-wrapper {
                        position: relative;
                        width: 100%;
                        margin-top: 20px;
                        aspect-ratio: 4 / 3;
                        height: auto;
                        min-height: auto;
                        border-radius: 0;
                        overflow: hidden;
                        order: 2;
                        box-shadow: none;
                    }
                    .container {
                        order: 1;
                    }
                    h1.reveal.active {
                        font-size: 2.8rem !important;
                        margin-bottom: 0 !important;
                        margin-top: 10px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
