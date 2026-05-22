"use client";

import React, { useState, useEffect } from 'react';

const slides = [
    { image: '/herosigiriya.jpg', label: 'Premium Island Experiences' },
    { image: '/hero2.jpg', label: 'Coastal Beauty' },
    { image: '/hero3.jpg', label: 'Ancient Wonders' },
    { image: '/hero4.jpg', label: 'Highland Serenity' },
];

const Hero = ({ heroData }) => {
    const [current, setCurrent] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % slides.length);
                setFading(false);
            }, 600);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    const goTo = (idx) => {
        if (idx === current) return;
        setFading(true);
        setTimeout(() => {
            setCurrent(idx);
            setFading(false);
        }, 600);
    };

    return (
        <section className="hero" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
            <div className="hero-slides-wrapper">
                {/* Slides */}
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url('${slide.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'opacity 0.8s ease',
                            opacity: idx === current ? (fading ? 0 : 1) : 0,
                            zIndex: 0,
                        }}
                    />
                ))}

                {/* Dark overlay */}
                <div className="hero-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
                    zIndex: 1
                }} />

                {/* Left / Right Arrows */}
                {['left', 'right'].map(dir => (
                    <button
                        key={dir}
                        className="hero-arrow mobile-hide"
                        onClick={() => {
                            const next = dir === 'left'
                                ? (current - 1 + slides.length) % slides.length
                                : (current + 1) % slides.length;
                            goTo(next);
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            [dir]: '15px',
                            transform: 'translateY(-50%)',
                            zIndex: 20,
                            background: 'rgba(0,0,0,0.4)',
                            border: '2px solid var(--neon-yellow)',
                            color: 'var(--neon-yellow)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            boxShadow: 'var(--neon-glow)',
                        }}
                    >
                        <i className={`fas fa-chevron-${dir === 'left' ? 'left' : 'right'}`} />
                    </button>
                ))}
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

                    {/* Dot Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
                        {slides.map((slide, idx) => (
                            <button
                                key={idx}
                                onClick={() => goTo(idx)}
                                title={slide.label}
                                style={{
                                    width: idx === current ? '36px' : '12px',
                                    height: '12px',
                                    borderRadius: '6px',
                                    border: '2px solid var(--neon-yellow)',
                                    background: idx === current ? 'var(--neon-yellow)' : 'transparent',
                                    boxShadow: idx === current ? 'var(--neon-glow)' : 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'all 0.4s ease',
                                }}
                            />
                        ))}
                    </div>

                    {/* Slide label */}
                    <p style={{
                        marginTop: '10px',
                        fontSize: '0.8rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color: 'var(--neon-yellow)',
                        textShadow: 'var(--neon-glow)',
                        textAlign: 'center',
                        opacity: fading ? 0 : 1,
                        transition: 'opacity 0.4s ease',
                    }}>
                        {slides[current].label}
                    </p>
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
