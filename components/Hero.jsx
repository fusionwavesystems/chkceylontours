"use client";

import React, { useState, useEffect } from 'react';

const Hero = ({ heroData }) => {

    return (
        <section className="hero" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
            <div className="hero-slides-wrapper">
                <video
                    src="/hero.mp4"
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
                />

                {/* Dark overlay */}
                <div className="hero-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
                    zIndex: 1
                }} />
            </div>

            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="hero-content">
                    <div className="mobile-hide" style={{ display: 'inline-block', border: '1px solid var(--neon-red)', padding: '5px 15px', borderRadius: '4px', boxShadow: 'var(--neon-glow-red)', marginBottom: '15px' }}>
                        <span className="subtitle" style={{ color: 'var(--neon-red)', margin: 0, textShadow: 'var(--neon-glow-red)', display: 'block', textAlign: 'center', fontSize: '0.8rem', letterSpacing: '3px' }}>
                            {heroData?.subtitle_tag || 'Premium Island Experiences'}
                        </span>
                    </div>
                    <h1 className="reveal active" style={{ textAlign: 'center' }}>
                        {(heroData?.title || 'Visit Sri Lanka').replace('Sri Lanka', 'Sri\u00A0Lanka')}
                    </h1>
                    <div className="hero-btns reveal active mobile-hide" style={{ transitionDelay: '0.6s', justifyContent: 'center' }}>
                        <a href="#destinations" className="btn btn-primary">Start Exploring</a>
                        <a href="#packages" className="btn btn-outline" style={{ marginLeft: '20px' }}>View Packages</a>
                    </div>
                </div>
            </div>


            <style jsx>{`
                .hero-slides-wrapper {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }
                @media (max-width: 768px) {
                    .mobile-hide {
                        display: none !important;
                    }
                    .hero-slides-wrapper {
                        position: relative;
                        width: 100%;
                        margin-top: 20px;
                        aspect-ratio: 4 / 3; /* Matches standard landscape photo, minimizing horizontal cropping */
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
                    .hero-arrow {
                        width: 35px !important;
                        height: 35px !important;
                        font-size: 0.9rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
