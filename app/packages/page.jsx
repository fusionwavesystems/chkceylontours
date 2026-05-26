"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RouteMap from '../../components/RouteMap';
import { supabase } from '../../lib/supabase';

const cleanFeatures = (features) => {
    if (!features || !Array.isArray(features)) return [];
    
    // If stored as a single string, split by newline. Do NOT split by comma to avoid breaking sentences.
    const flattenedFeatures = features.flatMap(f => {
        if (typeof f !== 'string') return [f];
        return f.split('\n').map(s => s.trim()).filter(s => s);
    });

    return flattenedFeatures.filter(f => f && typeof f === 'string');
};

const getHexColor = (color) => {
    if (!color) return '#fff01f';
    if (color === 'var(--neon-green)') return '#39ff14';
    if (color === 'var(--neon-yellow)') return '#fff01f';
    return color;
};

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

const getFeatureIcon = (feature, color, isDark = false) => {
    if (!feature || typeof feature !== 'string') return null;
    const text = feature.toLowerCase();
    let iconClass = "fa-solid fa-location-dot"; // Default travel bullet (no tick-box)
    
    if (text.includes('culture') || text.includes('site') || text.includes('temple') || text.includes('heritage') || text.includes('unesco') || text.includes('fortress') || text.includes('fort') || text.includes('ancient') || text.includes('museum')) {
        iconClass = "fa-solid fa-landmark-dome";
    } else if (text.includes('driver') || text.includes('car') || text.includes('transfer') || text.includes('transport') || text.includes('private') || text.includes('comfort') || text.includes('vehicle') || text.includes('chauffeur') || text.includes('air cond')) {
        iconClass = "fa-solid fa-car-rear";
    } else if (text.includes('hotel') || text.includes('resort') || text.includes('stay') || text.includes('accommodation') || text.includes('luxury') || text.includes('villa') || text.includes('glamping') || text.includes('saty')) {
        iconClass = "fa-solid fa-hotel";
    } else if (text.includes('safari') || text.includes('wild') || text.includes('jungle') || text.includes('animal') || text.includes('leopard') || text.includes('elephant') || text.includes('yala') || text.includes('national park')) {
        iconClass = "fa-solid fa-paw";
    } else if (text.includes('beach') || text.includes('coast') || text.includes('sea') || text.includes('whale') || text.includes('surf') || text.includes('fishing') || text.includes('ocean')) {
        iconClass = "fa-solid fa-umbrella-beach";
    } else if (text.includes('hike') || text.includes('trek') || text.includes('mountain') || text.includes('climb') || text.includes('hill') || text.includes('plain')) {
        iconClass = "fa-solid fa-mountain-sun";
    } else if (text.includes('honeymoon') || text.includes('romance') || text.includes('decor') || text.includes('love') || text.includes('couple')) {
        iconClass = "fa-solid fa-heart";
    } else if (text.includes('dinner') || text.includes('meal') || text.includes('food') || text.includes('drink') || text.includes('fiesta') || text.includes('seafood') || text.includes('breakfast') || text.includes('lunch')) {
        iconClass = "fa-solid fa-utensils";
    } else if (text.includes('tax') || text.includes('taxes') || text.includes('vat') || text.includes('charge') || text.includes('government') || text.includes('fee')) {
        iconClass = "fa-solid fa-file-invoice-dollar";
    } else if (text.includes('guide') || text.includes('chauffeur') || text.includes('guid') || text.includes('speaking') || text.includes('chaufer')) {
        iconClass = "fa-solid fa-user-tie";
    } else if (text.includes('inclusive') || text.includes('tour') || text.includes('all') || text.includes('immersion') || text.includes('explorer')) {
        iconClass = "fa-solid fa-star";
    }

    const hexColor = getHexColor(color);
    const iconColor = isDark ? (hexColor === '#39ff14' ? '#0f766e' : '#b45309') : hexColor;
    const shadowFilter = isDark ? 'none' : `drop-shadow(0 0 3px ${hexColor}77)`;

    return <i className={iconClass} style={{ color: iconColor, marginRight: '12px', fontSize: '1.05rem', filter: shadowFilter }}></i>;
};

export default function TourPackages() {
    const [packagesData, setPackagesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enlargedMapPkg, setEnlargedMapPkg] = useState(null);
    const [showMapIntro, setShowMapIntro] = useState(false);

    const openMapModal = (pkg) => {
        setEnlargedMapPkg(pkg);
        setShowMapIntro(true);
        setTimeout(() => {
            setShowMapIntro(false);
        }, 3000); // 3 second intro with fade off
    };

    const closeMapModal = () => {
        setEnlargedMapPkg(null);
        setShowMapIntro(false);
    };

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                document.title = "Premium Tour Packages | Sri Lanka Travel - CHK Ceylon Tours";
                const peraheraOfferPackage = {
                    id: 'perahera-special-offer',
                    name: "Esala Perahera Special Offer",
                    duration: "10 Days / 9 Nights",
                    price: "1800",
                    image: "/Activites/perahera.png",
                    tag: "Special Offer",
                    color: "#dc2626",
                    features: [
                        "Exclusive Perahera Front Row Seats",
                        "Luxury Heritage Stays in Kandy",
                        "Full Cultural Triangle Guided Tour",
                        "Private English Speaking Driver",
                        "Temple of the Tooth Relic Tour",
                        "All Entrance Tickets Included"
                    ]
                };

                const { data, error } = await supabase.from('packages').select('*');
                if (error) throw error;

                if (data && data.length > 0) {
                    const sanitizedData = data.map(pkg => ({
                        ...pkg,
                        color: pkg.color || 'var(--neon-green)',
                        features: Array.isArray(pkg.features) ? pkg.features : []
                    }));
                    setPackagesData([peraheraOfferPackage, ...sanitizedData]);
                } else {
                    setPackagesData([peraheraOfferPackage, ...fallbackPackagesData]);
                }
            } catch (err) {
                console.error('Error fetching packages:', err);
                const fallbackPerahera = {
                    id: 'perahera-special-offer',
                    name: "Esala Perahera Special Offer",
                    duration: "10 Days / 9 Nights",
                    price: "1800",
                    image: "/Activites/perahera.png",
                    tag: "Special Offer",
                    color: "#dc2626",
                    features: [
                        "Exclusive Perahera Front Row Seats",
                        "Luxury Heritage Stays in Kandy",
                        "Full Cultural Triangle Guided Tour",
                        "Private English Speaking Driver",
                        "Temple of the Tooth Relic Tour",
                        "All Entrance Tickets Included"
                    ]
                };
                setPackagesData([fallbackPerahera, ...fallbackPackagesData]);
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

    const dbSpecialOffers = packagesData.filter(pkg => pkg.is_special_offer === true);
    
    // If we have dynamic special offers in the DB, use them; otherwise fall back to the Perahera special offer
    const specialOfferPackages = dbSpecialOffers.length > 0 
        ? dbSpecialOffers 
        : packagesData.filter(pkg => pkg.id === 'perahera-special-offer');

    const regularPackages = packagesData.filter(pkg => !pkg.is_special_offer && pkg.id !== 'perahera-special-offer');

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', position: 'relative', overflowX: 'hidden' }}>

            {/* Hero Section with Beautiful Glassmorphic Off-White Title Card */}
            <section className="hero" style={{
                height: 'auto',
                minHeight: '65vh',
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
                <div className="hero-content" style={{ zIndex: 10, padding: '100px 20px 60px 20px', textAlign: 'center', maxWidth: '100%', position: 'relative' }}>
                    <h1 className="reveal active" style={{ 
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
                        textShadow: '1px 1px 12px rgba(0, 0, 0, 0.8)',
                        fontFamily: 'var(--font-main)',
                        fontWeight: '700',
                        textTransform: 'none',
                        letterSpacing: '0.5px'
                    }}>Tour Packages</h1>
                    <p style={{ 
                        color: 'var(--neon-yellow)', 
                        fontSize: '1.2rem', 
                        fontWeight: '700', 
                        marginTop: '10px',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-accent)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                    }}>Discover the Magic of Sri Lanka</p>
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
                    
                    {/* Highlighted Before Booking Notice */}
                    <div style={{
                        marginTop: '25px',
                        background: 'rgba(255, 204, 0, 0.1)',
                        border: '1px solid var(--neon-yellow)',
                        borderRadius: '12px',
                        padding: '15px 25px',
                        maxWidth: '850px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        textAlign: 'left',
                        boxShadow: '0 0 20px rgba(255, 204, 0, 0.15)'
                    }}>
                        <p style={{ margin: 0, color: 'var(--neon-yellow)', fontWeight: '800', fontFamily: 'var(--font-accent)', marginBottom: '8px', fontSize: '1.05rem', textTransform: 'uppercase' }}>
                            <i className="fa-solid fa-circle-info" style={{ marginRight: '8px' }}></i> Before Booking
                        </p>
                        <p style={{ margin: 0, color: '#fff', fontSize: '0.95rem', lineHeight: '1.7', fontFamily: 'var(--font-main)' }}>
                            If you make a request:<br/>
                            <span style={{ color: 'var(--neon-yellow)' }}>01.</span> You can customize your tour itinerary as you wish.<br/>
                            <span style={{ color: 'var(--neon-yellow)' }}>02.</span> The itinerary can be changed according to this package.<br/>
                            <span style={{ color: 'var(--neon-yellow)' }}>03.</span> Prices may also change during those changes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Background blobs for visual flair */}
            <div className="bg-blob" style={{ top: '30%', left: '-10%', width: '800px', height: '800px' }}></div>
            <div className="bg-blob" style={{ top: '60%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s', background: 'radial-gradient(circle, rgba(57, 255, 20, 0.05) 0%, transparent 70%)' }}></div>

            <Navbar />

            <div className="container" style={{ padding: '80px 20px 100px 20px', position: 'relative', zIndex: 10 }}>

                {/* Dedicated Row for Seasonal Special Offers */}
                <div style={{ marginBottom: '80px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                        <span className="subtitle" style={{ 
                            color: '#ef4444', 
                            textShadow: '0 0 15px rgba(220, 38, 38, 0.35)',
                            letterSpacing: '4px',
                            fontWeight: '800',
                            display: 'block',
                            marginBottom: '10px',
                            fontFamily: 'var(--font-main)',
                            fontSize: '1.05rem',
                            textTransform: 'uppercase'
                        }}>Limited seasonal offer</span>
                        <h2 style={{ 
                            color: '#fff', 
                            fontSize: '2.5rem', 
                            marginTop: '10px',
                            fontFamily: 'var(--font-accent)',
                            fontWeight: '900',
                            textTransform: 'none'
                        }}>Seasonal Special Offers</h2>
                        <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #dc2626 0%, #f97316 100%)', margin: '15px auto 0 auto', borderRadius: '2px' }}></div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', width: '100%' }}>
                        {specialOfferPackages.map(pkg => {
                            const isPerahera = pkg.id === 'perahera-special-offer';
                            const originalPrice = isPerahera ? parseFloat(pkg.price) : (pkg.actual_price || pkg.price);
                            const discountedPrice = isPerahera ? Math.round(originalPrice * 0.5) : pkg.price;
                            const discountPercent = isPerahera ? 50 : (pkg.offer_percentage || 0);
                            return (
                                <div key={pkg.id} className="fire-border-wrapper" style={{
                                    padding: '7.5px',
                                    borderRadius: '24px',
                                    background: 'linear-gradient(90deg, #dc2626, #000000, #ef4444, #000000, #dc2626)',
                                    backgroundSize: '300% 300%',
                                    position: 'relative',
                                    maxWidth: '420px',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div className="custom-pkg-card" style={{
                                        border: 'none',
                                        margin: 0,
                                        height: '100%',
                                        borderRadius: '20px',
                                        overflow: 'visible',
                                        position: 'relative'
                                    }}>
                                        {/* Floating Discount Badge Sitting Perfectly on top of border */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '-18px',
                                            left: '20px',
                                            background: '#dc2626',
                                            border: '2.5px solid #ffffff',
                                            color: '#ffffff',
                                            padding: '5px 14px',
                                            borderRadius: '8px',
                                            fontSize: '0.85rem',
                                            fontWeight: '950',
                                            fontFamily: 'var(--font-accent)',
                                            boxShadow: '0 0 15px rgba(220, 38, 38, 0.8)',
                                            zIndex: 20,
                                            letterSpacing: '0.5px',
                                            textTransform: 'uppercase'
                                        }}>
                                            {discountPercent}% OFF SPECIAL
                                        </div>

                                        {/* Floating Gold Star Badge in the Top Right Corner */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                                            color: '#000',
                                            width: '34px',
                                            height: '34px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)',
                                            zIndex: 20,
                                            border: '2px solid #ffffff'
                                        }}>
                                            <i className="fa-solid fa-star" style={{ fontSize: '1rem', color: '#000' }}></i>
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
                                            borderTopLeftRadius: '20px',
                                            borderTopRightRadius: '20px'
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
                                                    background: 'rgba(220, 38, 38, 0.15)',
                                                    border: '1px solid rgba(220, 38, 38, 0.4)',
                                                    color: '#ef4444',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.68rem',
                                                    fontWeight: '800',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    display: 'inline-block'
                                                }}>
                                                    {pkg.tag}
                                                </span>
                                            </div>
                                            {/* Glowing Badge for Duration */}
                                            <div style={{
                                                background: '#dc2626',
                                                borderRadius: '12px',
                                                padding: '6px 14px',
                                                color: '#fff',
                                                fontSize: '0.75rem',
                                                fontWeight: '900',
                                                fontFamily: 'var(--font-accent)',
                                                whiteSpace: 'nowrap',
                                                boxShadow: `0 4px 15px rgba(220, 38, 38, 0.3)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                <i className="fa-regular fa-clock" style={{ color: '#fff' }}></i>
                                                {pkg.duration}
                                            </div>
                                        </div>

                                        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                                            <img src={pkg.image} alt={pkg.name} className="custom-pkg-img" loading="lazy" decoding="async" />
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

                                        <div style={{ 
                                            padding: '25px 30px 30px 30px', 
                                            flexGrow: 1, 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            backgroundColor: '#ffffff',
                                            borderBottomLeftRadius: '20px',
                                            borderBottomRightRadius: '20px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', gap: '15px' }}>
                                                <p style={{ 
                                                    color: '#dc2626', 
                                                    fontWeight: '800', 
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
                                                    <span style={{ 
                                                        textDecoration: 'line-through', 
                                                        color: '#9ca3af', 
                                                        fontSize: '1.05rem', 
                                                        marginRight: '8px',
                                                        fontWeight: '600',
                                                        fontFamily: 'var(--font-accent)'
                                                    }}>
                                                        ${originalPrice}
                                                    </span>
                                                    <span style={{ 
                                                        color: '#dc2626', 
                                                        fontSize: '1.8rem', 
                                                        fontWeight: '950', 
                                                        fontFamily: 'var(--font-accent)'
                                                    }}>
                                                        ${discountedPrice}
                                                    </span>
                                                    <span style={{ color: '#6b7280', fontSize: '0.75rem', display: 'block', fontWeight: '600', fontFamily: 'var(--font-main)' }}>Per Person</span>
                                                </div>
                                            </div>

                                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {cleanFeatures(pkg.features).map((feature, index) => (
                                                    <li key={index} style={{ 
                                                        color: '#1f2937', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        fontSize: '0.92rem',
                                                        fontWeight: '600',
                                                        fontFamily: 'var(--font-main)'
                                                    }}>
                                                        {getFeatureIcon(feature, '#dc2626', true)}
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {pkg.destinations && (
                                                    <button onClick={() => openMapModal(pkg)} className="custom-pkg-btn" style={{ background: '#111', color: '#dc2626', border: '1px solid #dc2626', boxShadow: '0 4px 15px rgba(220, 38, 38, 0.15)' }}>
                                                        <i className="fa-solid fa-map-location-dot" style={{ fontSize: '1rem', marginRight: '6px' }}></i> View Route on Map
                                                    </button>
                                                )}
                                                <a href={`https://wa.me/94776981971?text=I'm interested in the ${pkg.name} package`}
                                                    className="custom-pkg-btn"
                                                    style={{
                                                        background: `linear-gradient(135deg, #dc2626 0%, #991b1b 100%)`,
                                                        color: '#fff',
                                                        boxShadow: `0 4px 15px rgba(220, 38, 38, 0.3)`
                                                    }}>
                                                    Enquire Now
                                                    <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.85rem', transition: 'transform 0.3s ease' }}></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

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
                    {regularPackages.map((pkg, index) => {
                        return (
                            <div key={pkg.id} className="custom-pkg-card reveal active" style={{
                                border: `2px solid ${pkg.color}`,
                                position: 'relative',
                                overflow: 'visible'
                            }}>
                                {pkg.actual_price && pkg.offer_percentage && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-18px',
                                        left: '20px',
                                        background: '#dc2626',
                                        border: '2.5px solid #ffffff',
                                        color: '#ffffff',
                                        padding: '5px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        fontWeight: '950',
                                        fontFamily: 'var(--font-accent)',
                                        boxShadow: '0 0 15px rgba(220, 38, 38, 0.8)',
                                        zIndex: 20,
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase'
                                    }}>
                                        -{pkg.offer_percentage}% OFF
                                    </div>
                                )}
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
                                        boxShadow: `0 4px 15px ${getHexColor(pkg.color)}44`,
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
                                    <img src={pkg.image} alt={pkg.name} className="custom-pkg-img" loading="lazy" decoding="async" />
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

                                <div style={{ 
                                    padding: '25px 30px 30px 30px', 
                                    flexGrow: 1, 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    backgroundColor: '#ffffff',
                                    borderBottomLeftRadius: '22px',
                                    borderBottomRightRadius: '22px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', gap: '15px' }}>
                                        <p style={{ 
                                            color: pkg.color === 'var(--neon-yellow)' ? '#b45309' : (pkg.color === '#dc2626' ? '#dc2626' : '#0f766e'), 
                                            fontWeight: '800', 
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
                                            {/* Highlighted Current Price */}
                                            {pkg.actual_price && pkg.offer_percentage ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                    <span style={{ color: '#6b7280', fontSize: '0.9rem', textDecoration: 'line-through', fontFamily: 'var(--font-accent)', fontWeight: 'bold' }}>
                                                        ${pkg.actual_price}
                                                    </span>
                                                    <span style={{ 
                                                        color: '#dc2626', 
                                                        fontSize: '1.8rem', 
                                                        fontWeight: '950', 
                                                        fontFamily: 'var(--font-accent)',
                                                        lineHeight: '1.1'
                                                    }}>
                                                        ${pkg.price}
                                                    </span>
                                                    <span style={{
                                                        background: 'rgba(220, 38, 38, 0.1)',
                                                        color: '#dc2626',
                                                        padding: '1px 6px',
                                                        borderRadius: '4px',
                                                        fontSize: '0.68rem',
                                                        fontWeight: '800',
                                                        fontFamily: 'var(--font-accent)',
                                                        marginTop: '2px',
                                                        display: 'inline-block'
                                                    }}>-{pkg.offer_percentage}% OFF</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span style={{ 
                                                        color: '#16a34a', 
                                                        fontSize: '1.8rem', 
                                                        fontWeight: '950', 
                                                        fontFamily: 'var(--font-accent)'
                                                    }}>
                                                        ${pkg.price}
                                                    </span>
                                                    <span style={{ color: '#6b7280', fontSize: '0.75rem', display: 'block', fontWeight: '600', fontFamily: 'var(--font-main)' }}>Per Person</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {cleanFeatures(pkg.features).map((feature, index) => (
                                        <li key={index} style={{ 
                                            color: '#1f2937', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            fontSize: '0.92rem',
                                            fontWeight: '600',
                                            fontFamily: 'var(--font-main)'
                                        }}>
                                            {getFeatureIcon(feature, pkg.color, true)}
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {pkg.destinations && (
                                        <button onClick={() => openMapModal(pkg)} className="custom-pkg-btn" style={{ background: '#111', color: pkg.color, border: `1px solid ${getHexColor(pkg.color)}`, boxShadow: `0 4px 15px ${getHexColor(pkg.color)}33` }}>
                                            <i className="fa-solid fa-map-location-dot" style={{ fontSize: '1rem', marginRight: '6px' }}></i> View Route on Map
                                        </button>
                                    )}
                                    <a href={`https://wa.me/94776981971?text=I'm interested in the ${pkg.name} package`}
                                        className="custom-pkg-btn"
                                        style={{
                                            background: `linear-gradient(135deg, ${pkg.color} 0%, ${pkg.color === 'var(--neon-green)' ? '#15b300' : (pkg.color === '#dc2626' ? '#991b1b' : '#ffb300')} 100%)`,
                                            color: pkg.color === '#dc2626' ? '#fff' : '#000',
                                            boxShadow: `0 4px 15px ${getHexColor(pkg.color)}33`
                                        }}>
                                        Enquire Now
                                        <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.85rem', transition: 'transform 0.3s ease' }}></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>

            {/* Enlarged Route Map Modal */}
            {enlargedMapPkg && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(15px)'
                }} onClick={closeMapModal}>
                    <div style={{
                        position: 'relative', width: '95%', maxWidth: '1000px', maxHeight: '90vh',
                        background: '#111', borderRadius: '24px', padding: showMapIntro ? '0' : '30px',
                        border: `1px solid ${getHexColor(enlargedMapPkg.color)}`,
                        boxShadow: `0 10px 40px ${getHexColor(enlargedMapPkg.color)}44`,
                        overflow: 'hidden',
                        display: 'flex', flexDirection: 'column'
                    }} onClick={(e) => e.stopPropagation()}>
                        
                        {!showMapIntro && (
                            <button onClick={closeMapModal} style={{
                                position: 'absolute', top: '15px', right: '15px',
                                background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                                fontSize: '1.2rem', cursor: 'pointer', zIndex: 10,
                                width: '40px', height: '40px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 0.3s ease'
                            }}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        )}
                        
                        {showMapIntro ? (
                            <div className="map-intro-screen" style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                height: '500px', width: '100%',
                                animation: 'introFadeOut 0.5s 2.5s forwards'
                            }}>
                                <img src="/logo.png" alt="CHK Ceylon Tours Logo" style={{ width: '130px', marginBottom: '20px', animation: 'zoomInFade 1s ease forwards' }} />
                                
                                <h1 style={{
                                    background: 'linear-gradient(90deg, #ff0000 0%, #ffff00 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: '3.2rem',
                                    fontFamily: 'var(--font-accent)',
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    margin: '0 0 10px 0',
                                    animation: 'slideUpFade 1s 0.3s ease forwards',
                                    opacity: 0,
                                    filter: 'drop-shadow(0 0 15px rgba(255,0,0,0.3))'
                                }}>
                                    CHK Ceylon Tours
                                </h1>
                                
                                <h2 style={{ 
                                    color: 'var(--neon-yellow)', fontSize: '1.8rem', fontFamily: 'var(--font-primary)',
                                    textTransform: 'uppercase', letterSpacing: '4px', textAlign: 'center',
                                    animation: 'slideUpFade 1s 0.6s ease forwards', opacity: 0,
                                    textShadow: '0 0 15px rgba(255,240,31,0.5)', fontWeight: '400'
                                }}>
                                    Welcome to Sri Lanka
                                </h2>
                                <p style={{ 
                                    color: '#fff', fontSize: '1.2rem', marginTop: '15px',
                                    animation: 'slideUpFade 1s 1s ease forwards', opacity: 0
                                }}>
                                    Mapping your perfect journey...
                                </p>
                                <div style={{ 
                                    width: '200px', height: '4px', background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '10px', marginTop: '40px', overflow: 'hidden',
                                    animation: 'fadeIn 1s 1.2s forwards', opacity: 0
                                }}>
                                    <div style={{ 
                                        height: '100%', background: 'var(--neon-yellow)',
                                        animation: 'loadingBar 2.5s ease-in-out forwards'
                                    }}></div>
                                </div>
                            </div>
                        ) : (
                            <div className="map-modal-flex" style={{ display: 'flex', gap: '30px', flex: 1, overflowY: 'auto', animation: 'fadeIn 0.5s ease-out forwards' }}>
                                <div className="map-modal-left" style={{ flex: 2 }}>
                                    <h3 style={{ 
                                        color: '#fff', textAlign: 'center', marginBottom: '20px', 
                                        fontSize: '1.8rem', fontFamily: 'var(--font-accent)' 
                                    }}>
                                        {enlargedMapPkg.name} Route Map
                                    </h3>
                                    
                                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <RouteMap destinationsString={enlargedMapPkg.destinations} isLarge={true} />
                                    </div>
                                </div>

                                <div className="map-modal-right" style={{ flex: 1, padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ color: enlargedMapPkg.color || 'var(--neon-yellow)', fontSize: '1.3rem', fontFamily: 'var(--font-accent)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                                        <i className="fa-solid fa-route" style={{ marginRight: '10px' }}></i> Destinations
                                    </h4>
                                    
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {enlargedMapPkg.destinations.split(',').map(d => d.trim()).filter(d => d).map((dest, i) => (
                                            <li key={i} style={{ 
                                                display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.6)', 
                                                padding: '12px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
                                                animation: `slideLeftFade 0.6s ${0.8 + (i * 1.5)}s ease forwards`, opacity: 0
                                            }}>
                                                <span style={{ 
                                                    background: enlargedMapPkg.color || 'var(--neon-yellow)', color: '#000', 
                                                    width: '28px', height: '28px', borderRadius: '50%', display: 'flex', 
                                                    alignItems: 'center', justifyContent: 'center', fontWeight: '800', 
                                                    marginRight: '15px', fontSize: '0.9rem', flexShrink: 0
                                                }}>{i + 1}</span>
                                                <span style={{ color: '#fff', fontWeight: '600', fontSize: '1.05rem' }}>{dest}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

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

                /* Firing Special Offer Permanent Flame Flicker */
                .fire-border-wrapper {
                    animation: fire-border-running 2.5s linear infinite, fire-flicker 0.9s infinite ease-in-out !important;
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
                }

                .fire-border-wrapper:hover {
                    transform: translateY(-15px) scale(1.035) !important;
                    box-shadow: 0 25px 60px rgba(249, 115, 22, 0.5), 
                                0 0 45px rgba(220, 38, 38, 0.3) !important;
                }

                @keyframes fire-border-running {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes fire-flicker {
                    0%, 100% {
                        box-shadow: 0 0 35px rgba(220, 38, 38, 0.85), 
                                    0 -12px 40px rgba(249, 115, 22, 0.6), 
                                    0 12px 25px rgba(0, 0, 0, 0.6) !important;
                    }
                    25% {
                        box-shadow: 0 0 45px rgba(220, 38, 38, 0.95), 
                                    0 -20px 50px rgba(234, 179, 8, 0.7), 
                                    0 12px 25px rgba(0, 0, 0, 0.6) !important;
                    }
                    50% {
                        box-shadow: 0 0 32px rgba(220, 38, 38, 0.75), 
                                    0 -10px 35px rgba(249, 115, 22, 0.5), 
                                    0 12px 25px rgba(0, 0, 0, 0.6) !important;
                    }
                    75% {
                        box-shadow: 0 0 50px rgba(220, 38, 38, 0.98), 
                                    0 -25px 65px rgba(249, 115, 22, 0.85), 
                                    0 12px 25px rgba(0, 0, 0, 0.6) !important;
                    }
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

                .inline-map-hover:hover {
                    transform: scale(1.02);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
                }

                @keyframes zoomInFade {
                    from { transform: scale(0.5); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                @keyframes slideUpFade {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @keyframes slideLeftFade {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes loadingBar {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes introFadeOut {
                    from { opacity: 1; transform: scale(1); filter: blur(0px); }
                    to { opacity: 0; transform: scale(0.95); filter: blur(5px); }
                }

                @media (max-width: 900px) {
                    .map-modal-flex {
                        flex-direction: column !important;
                    }
                    .map-modal-right {
                        margin-top: 20px;
                    }
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
