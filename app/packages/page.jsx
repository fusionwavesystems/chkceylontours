"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';

const fallbackPackagesData = [
    {
        id: 1,
        name: "Heritage Legend",
        duration: "7 Days / 6 Nights",
        price: "850",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800&auto=format&fit=crop",
        tag: "Cultural",
        color: "var(--neon-yellow)",
        features: ["Sigiriya Rock Fortress", "Temple of the Tooth", "Dambulla Cave Temple", "Village Tour", "Luxury Transports"]
    },
    {
        id: 2,
        name: "Wild Spirit",
        duration: "10 Days / 9 Nights",
        price: "1200",
        image: "https://images.unsplash.com/photo-15809654154fa1-2558aa488f72?q=80&w=800&auto=format&fit=crop",
        tag: "Wildlife",
        color: "var(--neon-green)",
        features: ["Yala Safari", "Udawalawe Elephants", "Whale Watching", "Leopard Tracking", "Glamping Experience"]
    },
    {
        id: 3,
        name: "Island Romance",
        duration: "14 Days / 13 Nights",
        price: "2500",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
        tag: "Honeymoon",
        color: "var(--neon-yellow)",
        features: ["Private Villa", "Candlelight Dinner", "Couple Spa", "Bentota Beach", "Dedicated Driver"]
    },
    {
        id: 4,
        name: "Tea Trail Explorer",
        duration: "5 Days / 4 Nights",
        price: "650",
        image: "https://images.unsplash.com/photo-1528642463363-d4ca3361a293?q=80&w=800&auto=format&fit=crop",
        tag: "Nature",
        color: "var(--neon-green)",
        features: ["Nuwara Eliya Hills", "Tea Factory Visit", "Ella Train Ride", "Horton Plains", "Waterfalls Tour"]
    },
    {
        id: 5,
        name: "Southern Charm",
        duration: "6 Days / 5 Nights",
        price: "720",
        image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop",
        tag: "Coastal",
        color: "var(--neon-yellow)",
        features: ["Galle Fort", "Mirissa Surfing", "Unawatuna Beach", "Stilt Fishing", "Seafood Fiesta"]
    },
    {
        id: 6,
        name: "Grand Sri Lanka",
        duration: "21 Days / 20 Nights",
        price: "3800",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
        tag: "Full Tour",
        color: "var(--neon-green)",
        features: ["Full Island Circle", "All UNESCO Sites", "North to South", "East Coast Beaches", "Cultural Immersion"]
    }
];

const getFeatureIcon = (feature, color) => {
    if (!feature || typeof feature !== 'string') return null;
    const text = feature.toLowerCase();
    let iconClass = "fa-solid fa-circle-check"; // Default check
    
    if (text.includes('culture') || text.includes('site') || text.includes('temple') || text.includes('heritage') || text.includes('unesco') || text.includes('fortress') || text.includes('fort') || text.includes('ancient')) {
        iconClass = "fa-solid fa-landmark-dome";
    } else if (text.includes('driver') || text.includes('car') || text.includes('transfer') || text.includes('transport') || text.includes('private')) {
        iconClass = "fa-solid fa-car-rear";
    } else if (text.includes('hotel') || text.includes('resort') || text.includes('stay') || text.includes('accommodation') || text.includes('luxury') || text.includes('villa') || text.includes('glamping')) {
        iconClass = "fa-solid fa-hotel";
    } else if (text.includes('safari') || text.includes('wild') || text.includes('jungle') || text.includes('animal') || text.includes('leopard') || text.includes('elephant')) {
        iconClass = "fa-solid fa-paw";
    } else if (text.includes('beach') || text.includes('coast') || text.includes('sea') || text.includes('whale') || text.includes('surf') || text.includes('fishing')) {
        iconClass = "fa-solid fa-umbrella-beach";
    } else if (text.includes('hike') || text.includes('trek') || text.includes('mountain') || text.includes('climb') || text.includes('hill') || text.includes('plain')) {
        iconClass = "fa-solid fa-mountain-sun";
    } else if (text.includes('honeymoon') || text.includes('romance') || text.includes('decor') || text.includes('love') || text.includes('couple')) {
        iconClass = "fa-solid fa-heart";
    } else if (text.includes('dinner') || text.includes('meal') || text.includes('food') || text.includes('drink') || text.includes('fiesta') || text.includes('seafood')) {
        iconClass = "fa-solid fa-utensils";
    } else if (text.includes('inclusive') || text.includes('guide') || text.includes('tour') || text.includes('all') || text.includes('immersion') || text.includes('explorer')) {
        iconClass = "fa-solid fa-star";
    }

    return <i className={iconClass} style={{ color: color, marginRight: '12px', fontSize: '1.05rem', filter: `drop-shadow(0 0 3px ${color}77)` }}></i>;
};

export default function TourPackages() {
    const [packagesData, setPackagesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data, error } = await supabase.from('packages').select('*');
                if (error) throw error;

                if (data && data.length > 0) {
                    const sanitizedData = data.map(pkg => ({
                        ...pkg,
                        color: pkg.color || 'var(--neon-green)',
                        features: Array.isArray(pkg.features) ? pkg.features : []
                    }));
                    setPackagesData(sanitizedData);
                } else {
                    setPackagesData(fallbackPackagesData);
                }
            } catch (err) {
                console.error('Error fetching packages:', err);
                setPackagesData(fallbackPackagesData);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) return (
        <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--neon-yellow)', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-accent)', textShadow: 'var(--neon-glow)' }}>Loading Journeys...</div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', position: 'relative', overflowX: 'hidden' }}>
            <title>Premium Tour Packages | Sri Lanka Travel - CHK Ceylon Tours</title>
            <meta name="description" content="Explore our curated Sri Lankan tour packages. Whether you're seeking a romantic honeymoon, a wild adventure, or a cultural deep-dive, we have the perfect itinerary for you." />

            {/* Hero Section with Beautiful Glassmorphic Off-White Title Card */}
            <section className="hero" style={{
                height: '55vh',
                minHeight: '400px',
                backgroundImage: "url('/tour_bg_new.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)', zIndex: 1 }}></div>
                <div className="hero-content" style={{ zIndex: 10, padding: '0 20px', textAlign: 'center', maxWidth: '100%', position: 'relative' }}>
                    <h1 className="reveal active" style={{ 
                        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
                        textShadow: '2px 2px 20px rgba(0, 0, 0, 0.95), var(--neon-glow)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '800',
                        textTransform: 'none'
                    }}>Curated Journeys</h1>
                    <p style={{ 
                        color: 'rgba(255, 255, 255, 0.9)', 
                        fontSize: '1.1rem', 
                        fontWeight: '600', 
                        marginTop: '15px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-accent)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                    }}>Discover the Magic of Sri Lanka with CHK Ceylon Tours</p>
                    <p style={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        fontSize: '0.95rem', 
                        fontWeight: '500', 
                        marginTop: '12px',
                        maxWidth: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontFamily: 'var(--font-main)',
                        textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                        lineHeight: '1.6'
                    }}>
                        Prices in these packages may change due to fluctuations in the dollar and fuel prices around the world. <span style={{ color: 'var(--neon-green)', fontWeight: '700', textShadow: '0 0 10px rgba(57,255,20,0.3)' }}>There are no hidden fees.</span>
                    </p>
                </div>
            </section>

            {/* Background blobs for visual flair */}
            <div className="bg-blob" style={{ top: '30%', left: '-10%', width: '800px', height: '800px' }}></div>
            <div className="bg-blob" style={{ top: '60%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s', background: 'radial-gradient(circle, rgba(57, 255, 20, 0.05) 0%, transparent 70%)' }}></div>

            <Navbar />

            <div className="container" style={{ padding: '80px 20px 100px 20px', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <span className="subtitle" style={{ 
                        color: 'var(--neon-yellow)', 
                        textShadow: 'var(--neon-glow)',
                        letterSpacing: '4px',
                        fontWeight: '700',
                        display: 'block',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-main)',
                        fontSize: '1.05rem'
                    }}>Exclusive Packages</span>
                    <h2 style={{ 
                        color: '#fff', 
                        fontSize: '2.5rem', 
                        marginTop: '10px',
                        fontFamily: 'var(--font-accent)',
                        fontWeight: '800',
                        textTransform: 'none'
                    }}>Most Common Tour Packages</h2>
                    <div style={{ width: '80px', height: '4px', background: 'var(--gradient-vibrant)', margin: '15px auto 0 auto', borderRadius: '2px' }}></div>
                </div>

                <div className="packages-grid">
                    {packagesData.map((pkg, index) => {
                        const discounts = [10, 15, 15, 20, 25, 30];
                        const discountPercent = discounts[index % discounts.length];
                        const originalPrice = parseFloat(pkg.price);
                        const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));

                        return (
                            <div key={pkg.id} className="custom-pkg-card reveal active" style={{
                                border: `2px solid ${pkg.color}`,
                                position: 'relative'
                            }}>
                                {/* Floating Discount Badge at the top of the box */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-14px',
                                    left: '20px',
                                    background: 'rgba(220, 38, 38, 0.95)',
                                    color: '#fff',
                                    padding: '4px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.78rem',
                                    fontWeight: '900',
                                    fontFamily: 'var(--font-accent)',
                                    boxShadow: '0 0 12px rgba(220, 38, 38, 0.5)',
                                    zIndex: 10,
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase'
                                }}>
                                    {discountPercent}% OFF SPECIAL
                                </div>

                                {/* Modern Top Header for Package Title */}
                                <div style={{ 
                                    padding: '22px 28px', 
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '15px',
                                    borderTopLeftRadius: '22px',
                                    borderTopRightRadius: '22px'
                                }}>
                                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                                        <h3 style={{ 
                                            fontSize: '1.4rem', 
                                            color: '#fff', 
                                            margin: '0 0 8px 0',
                                            fontWeight: '800',
                                            fontFamily: 'var(--font-accent)',
                                            lineHeight: '1.25'
                                        }}>{pkg.name}</h3>
                                        <span style={{
                                            background: `${pkg.color}15`,
                                            border: `1px solid ${pkg.color}44`,
                                            color: pkg.color,
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.68rem',
                                            fontWeight: '800',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            display: 'inline-block'
                                        }}>
                                            {pkg.tag || 'Sri Lanka'}
                                        </span>
                                    </div>
                                    {/* Glowing Badge for Duration on the Top-Right Corner - Solid & Readable */}
                                    <div style={{
                                        background: pkg.color,
                                        borderRadius: '12px',
                                        padding: '6px 14px',
                                        color: '#000',
                                        fontSize: '0.75rem',
                                        fontWeight: '900',
                                        fontFamily: 'var(--font-accent)',
                                        whiteSpace: 'nowrap',
                                        boxShadow: `0 4px 15px ${pkg.color}44`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        <i className="fa-regular fa-clock" style={{ color: '#000' }}></i>
                                        {pkg.duration}
                                    </div>
                                </div>

                                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                                    <img src={pkg.image} alt={pkg.name} className="custom-pkg-img" />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '60%',
                                        background: 'linear-gradient(to top, rgba(12, 12, 12, 1) 0%, transparent 100%)',
                                        zIndex: 1
                                    }}></div>
                                </div>

                                <div style={{ padding: '25px 30px 30px 30px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', gap: '15px' }}>
                                        <p style={{ 
                                            color: pkg.color === 'var(--neon-yellow)' ? '#ffcc00' : pkg.color, 
                                            fontWeight: '700', 
                                            margin: 0, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '8px',
                                            fontSize: '0.88rem',
                                            fontFamily: 'var(--font-accent)',
                                            letterSpacing: '0.5px'
                                        }}>
                                            <i className="fa-regular fa-clock" style={{ fontSize: '0.95rem' }}></i>
                                            {pkg.duration}
                                        </p>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            {/* Actual Price Cut */}
                                            <span style={{ 
                                                textDecoration: 'line-through', 
                                                color: 'rgba(255,255,255,0.4)', 
                                                fontSize: '1.05rem', 
                                                marginRight: '8px',
                                                fontWeight: '600',
                                                fontFamily: 'var(--font-accent)'
                                            }}>
                                                ${originalPrice}
                                            </span>
                                            {/* Highlighted Current Price */}
                                            <span style={{ 
                                                color: '#39ff14', 
                                                fontSize: '1.8rem', 
                                                fontWeight: '950', 
                                                fontFamily: 'var(--font-accent)', 
                                                textShadow: '0 0 15px rgba(57, 255, 20, 0.4)' 
                                            }}>
                                                ${discountedPrice}
                                            </span>
                                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'block', fontWeight: '500', fontFamily: 'var(--font-main)' }}>Per Person</span>
                                        </div>
                                    </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {pkg.features.map((feature, index) => (
                                        <li key={index} style={{ 
                                            color: 'rgba(255,255,255,0.7)', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            fontSize: '0.92rem',
                                            fontWeight: '500',
                                            fontFamily: 'var(--font-main)'
                                        }}>
                                            {getFeatureIcon(feature, pkg.color)}
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a href={`https://wa.me/94771234567?text=I'm interested in the ${pkg.name} package`}
                                    className="custom-pkg-btn"
                                    style={{
                                        background: `linear-gradient(135deg, ${pkg.color} 0%, ${pkg.color === 'var(--neon-green)' ? '#15b300' : '#ffb300'} 100%)`,
                                        color: '#000',
                                        boxShadow: `0 4px 15px ${pkg.color}33`
                                    }}>
                                    Enquire Now
                                    <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.85rem', transition: 'transform 0.3s ease' }}></i>
                                </a>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .packages-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 40px;
                    justify-content: center;
                    max-width: 1300px;
                    margin: 0 auto;
                }

                /* Modern Styled Card */
                .custom-pkg-card {
                    background: linear-gradient(135deg, rgba(12, 12, 12, 0.98) 0%, rgba(3, 3, 3, 1) 100%);
                    border-radius: 24px;
                    overflow: visible;
                    display: flex;
                    flex-direction: column;
                    min-height: 560px;
                    height: 100%;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                }

                .custom-pkg-card:hover {
                    transform: translateY(-12px) scale(1.025);
                }

                /* Dynamic Yellow Glow on Hover */
                .custom-pkg-card[style*="var(--neon-yellow)"]:hover {
                    border-color: var(--neon-yellow) !important;
                    box-shadow: 0 25px 50px rgba(255, 240, 31, 0.25),
                                0 0 30px rgba(255, 240, 31, 0.12) !important;
                }

                /* Dynamic Green Glow on Hover */
                .custom-pkg-card[style*="var(--neon-green)"]:hover {
                    border-color: var(--neon-green) !important;
                    box-shadow: 0 25px 50px rgba(57, 255, 20, 0.25),
                                0 0 30px rgba(57, 255, 20, 0.12) !important;
                }

                .custom-pkg-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .custom-pkg-card:hover .custom-pkg-img {
                    transform: scale(1.08);
                }

                /* Floating glassmorphic tag */
                .floating-tag {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    backdrop-filter: blur(10px);
                    padding: 5px 15px;
                    border-radius: 50px;
                    font-size: 0.72rem;
                    font-weight: 800;
                    font-family: var(--font-accent);
                    letter-spacing: 0.8px;
                    z-index: 2;
                    text-transform: uppercase;
                }

                /* Custom Premium Buttons */
                .custom-pkg-btn {
                    width: 100%;
                    text-align: center;
                    border-radius: 50px;
                    margin-top: auto;
                    font-size: 0.85rem;
                    font-weight: 800;
                    font-family: var(--font-accent);
                    padding: 13px 0;
                    letter-spacing: 0.8px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .custom-pkg-btn:hover {
                    transform: translateY(-2px) scale(1.02);
                }

                .custom-pkg-card[style*="var(--neon-yellow)"] .custom-pkg-btn:hover {
                    box-shadow: 0 8px 20px rgba(255, 240, 31, 0.4) !important;
                }

                .custom-pkg-card[style*="var(--neon-green)"] .custom-pkg-btn:hover {
                    box-shadow: 0 8px 20px rgba(57, 255, 20, 0.4) !important;
                }

                .custom-pkg-btn:hover i {
                    transform: translateX(4px) translateY(-2px);
                }

                @media (max-width: 768px) {
                    .custom-pkg-card {
                        min-height: auto;
                    }
                }
            `}</style>
        </div>
    );
}
