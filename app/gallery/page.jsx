"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import WhatsAppButton from '@/components/WhatsAppButton';
import FlagCircle from '@/components/FlagCircle';
import TrustedMap from '@/components/TrustedMap';
import StatsCounter from '@/components/StatsCounter';

export default function GalleryPage() {
    useEffect(() => {
        document.title = "Travel Gallery | CHK Ceylon Tours - Moments in Sri Lanka";

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const observeReveals = () => {
            const reveals = document.querySelectorAll('.reveal:not(.active)');
            reveals.forEach(el => observer.observe(el));
        };

        observeReveals();

        const mutationObserver = new MutationObserver(() => {
            observeReveals();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return (
        <div className="app-main" style={{ background: '#000000', minHeight: '100vh' }}>
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-video-wrapper">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="hero-video"
                    >
                        <source src="/hero3.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="hero-content">
                    <h1 className="reveal active hero-title" style={{ textShadow: '2px 2px 15px rgba(0, 0, 0, 0.9), var(--neon-glow)' }}>Visual Journey</h1>
                    <p className="hero-subtitle" style={{ color: 'var(--neon-yellow)', textTransform: 'uppercase', textShadow: '1px 1px 5px rgba(0,0,0,0.8)' }}>Capturing the Essence of Sri Lanka</p>
                </div>
            </section>
            
            <div style={{ background: '#000000' }}>
                <div className="reveal" style={{ paddingTop: '40px' }}>
                    <FlagCircle />
                </div>
                <div className="reveal">
                    <TrustedMap />
                </div>
                <div className="reveal">
                    <StatsCounter />
                </div>
                <Gallery />
            </div>

            <Footer />
            <WhatsAppButton />

            <style jsx>{`
                .app-main {
                    overflow-x: hidden;
                }
                .hero {
                    height: 100vh;
                    min-height: 600px;
                    justify-content: center;
                    align-items: flex-end;
                    padding: 0;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }
                .hero-video-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }
                .hero-video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .hero-content {
                    z-index: 10;
                    padding: 0 20px;
                    padding-bottom: 4vh;
                    text-align: center;
                    max-width: 100%;
                    position: relative;
                }
                .hero-title {
                    font-size: clamp(2.5rem, 8vw, 5rem);
                }
                .hero-subtitle {
                    font-size: 1.2rem;
                    margin-top: 10px;
                    letter-spacing: 3px;
                }
                @media (max-width: 768px) {
                    .hero {
                        height: auto;
                        min-height: auto;
                        flex-direction: column;
                    }
                    .hero-video-wrapper {
                        position: relative;
                        width: 100%;
                        aspect-ratio: 4 / 3;
                        height: auto;
                        order: 1;
                    }
                    .hero-content {
                        order: 2;
                        padding: 40px 20px 20px 20px;
                        background: #000;
                    }
                    .hero-title {
                        font-size: 2.8rem;
                        line-height: 1.2;
                    }
                    .hero-subtitle {
                        font-size: 1rem;
                        letter-spacing: 2px;
                    }
                }
            `}</style>
        </div>
    );
}
