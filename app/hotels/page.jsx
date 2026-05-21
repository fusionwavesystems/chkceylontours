"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';

const fallbackHotelsData = [
    {
        id: 'fallback-1',
        name: "Heritance Kandalama",
        location: "Dambulla",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
        tag: "Eco Luxury",
        description: "A luxury hotel built into the rock face, offering breathtaking views of the Kandalama tank."
    },
    {
        id: 'fallback-2',
        name: "Shangri-La Colombo",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
        tag: "City View",
        description: "Modern luxury in the heart of the capital, with world-class dining and views of the Indian Ocean."
    },
    {
        id: 'fallback-3',
        name: "Anantara Peace Haven",
        location: "Tangalle",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
        tag: "Beachfront",
        description: "A secluded beach paradise nestled in a coconut plantation on the southern coast."
    },
    {
        id: 'fallback-4',
        name: "Cinnamon Wild",
        location: "Yala",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
        tag: "Safari Lodge",
        description: "Experience the wild in luxury, located right on the edge of Yala National Park."
    }
];

export default function Hotels() {
    const [hotelsData, setHotelsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                document.title = "Luxury Hotels & Stays in Sri Lanka | CHK Ceylon Tours";
                const { data, error } = await supabase.from('hotels').select('*');
                if (error) throw error;

                if (data && data.length > 0) {
                    setHotelsData(data);
                } else {
                    setHotelsData(fallbackHotelsData);
                }
            } catch (err) {
                console.error('Error fetching hotels:', err);
                setHotelsData(fallbackHotelsData);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    if (loading) return (
        <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--neon-green)', fontSize: '1.5rem', fontWeight: 'bold' }}>Loading Hotels...</div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', position: 'relative' }}>

            {/* Hero Section */}
            <section className="hero" style={{
                height: '60vh',
                minHeight: '400px',
                backgroundImage: "url('/hotel_bg_new.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }}></div>
                <div className="hero-content" style={{ zIndex: 10, padding: '80px 20px 0 20px', textAlign: 'center', maxWidth: '100%', position: 'relative' }}>
                    <h1 className="reveal active" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textShadow: '2px 2px 15px rgba(0, 0, 0, 0.9), var(--neon-glow)' }}>Luxury Stays</h1>
                </div>
            </section>

            <Navbar />

            <div className="container" style={{ padding: '80px 20px 100px 20px', position: 'relative', zIndex: 10 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '40px',
                    justifyContent: 'center',
                    maxWidth: '1300px',
                    margin: '0 auto'
                }}>
                    {hotelsData.map((hotel) => (
                        <div key={hotel.id} className="custom-hotel-card" style={{
                            background: '#0c0c0c',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '520px',
                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                            position: 'relative'
                        }}>
                            {/* Floating Location Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                backgroundColor: 'rgba(0, 0, 0, 0.82)',
                                color: 'var(--neon-green)',
                                border: '1px solid var(--neon-green)',
                                padding: '6px 14px',
                                borderRadius: '20px',
                                fontSize: '0.78rem',
                                fontWeight: '800',
                                zIndex: 10,
                                textTransform: 'uppercase',
                                letterSpacing: '0.6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 0 12px rgba(15, 118, 110, 0.4)'
                            }}>
                                <i className="fas fa-map-marker-alt" style={{ fontSize: '0.75rem' }}></i>
                                {hotel.location}
                            </div>

                             {/* Photo Container */}
                            <div style={{ position: 'relative', height: '285px', overflow: 'hidden' }}>
                                <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)' }} className="hotel-card-img" />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '60%',
                                    background: 'linear-gradient(to top, rgba(12, 12, 12, 0.95) 0%, rgba(12, 12, 12, 0.4) 50%, transparent 100%)',
                                    zIndex: 2
                                }}></div>
                                <h3 style={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    left: '25px',
                                    right: '25px',
                                    fontSize: '1.45rem',
                                    color: '#fff',
                                    margin: 0,
                                    fontWeight: '800',
                                    fontFamily: 'var(--font-accent)',
                                    zIndex: 5,
                                    textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                                }}>
                                    {hotel.name ? hotel.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : ''}
                                </h3>
                            </div>

                            {/* Separate Description Box at the bottom (Description + Button) */}
                            <div style={{
                                marginTop: 'auto',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                padding: '20px 25px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                                flexGrow: 1,
                                justifyContent: 'space-between'
                            }}>
                                <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.86rem', margin: 0, lineHeight: '1.6', fontWeight: '500', fontFamily: 'var(--font-main)' }}>
                                    {hotel.description}
                                </p>
                                <a
                                    href={hotel.website_link || `https://wa.me/94771234567?text=I'm interested in booking ${hotel.name} in ${hotel.location}`}
                                    target={hotel.website_link ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="custom-hotel-btn"
                                    style={{
                                        width: '100%',
                                        borderColor: 'var(--neon-yellow)',
                                        color: 'var(--neon-yellow)',
                                        background: 'rgba(255,240,31,0.05)',
                                        border: '1px solid var(--neon-yellow)',
                                        textAlign: 'center',
                                        display: 'block',
                                        padding: '11px 0',
                                        borderRadius: '30px',
                                        fontWeight: '700',
                                        fontSize: '0.88rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {hotel.website_link ? 'Visit Website' : 'Book Now'}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                :global(.custom-hotel-card):hover {
                    transform: translateY(-10px) scale(1.02);
                    border-color: var(--neon-yellow) !important;
                    box-shadow: 0 20px 40px rgba(255, 240, 31, 0.15) !important;
                }
                :global(.custom-hotel-card):hover .hotel-card-img {
                    transform: scale(1.08);
                }
                :global(.custom-hotel-btn):hover {
                    background: var(--neon-yellow) !important;
                    color: #000 !important;
                    box-shadow: 0 0 15px rgba(255, 240, 31, 0.3);
                }
            `}</style>

            <Footer />
        </div>
    );
}
