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
            <section className="hero" style={{
                height: '100vh',
                minHeight: '600px',
                justifyContent: 'center',
                alignItems: 'flex-end',
                padding: '0',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0
                    }}
                >
                    <source src="/hero3.mp4" type="video/mp4" />
                </video>
                <div className="hero-content" style={{ zIndex: 10, padding: '0 20px', paddingBottom: '4vh', textAlign: 'center', maxWidth: '100%', position: 'relative' }}>
                    <h1 className="reveal active" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textShadow: '2px 2px 15px rgba(0, 0, 0, 0.9), var(--neon-glow)' }}>Visual Journey</h1>
                    <p style={{ color: 'var(--neon-yellow)', fontSize: '1.2rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '3px', textShadow: '1px 1px 5px rgba(0,0,0,0.8)' }}>Capturing the Essence of Sri Lanka</p>
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
            `}</style>
        </div>
    );
}
