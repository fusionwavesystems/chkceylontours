import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ImageLightbox from './ImageLightbox';

const cleanFeatures = (features) => {
    if (!features || !Array.isArray(features)) return [];
    return features.filter(f => {
        if (!f || typeof f !== 'string') return false;
        const lower = f.toLowerCase();
        return !(
            lower.includes('validity') ||
            lower.includes('before booking') ||
            lower.includes('customize') ||
            lower.includes('hidden charges') ||
            lower.includes('hidden fees') ||
            lower.includes('package price') ||
            lower.includes('above cost includes') ||
            lower.includes('the above cost includes') ||
            lower.includes('inclusions & exclusions')
        );
    });
};

const fallbackPackages = [
    { name: 'Heritage Legend', price: '850', duration: '7 Days', features: ['Cultural Sites', 'Private Driver', 'Luxury Hotels'], color: 'var(--neon-yellow)' },
    { name: 'Wild Spirit', price: '1200', duration: '10 Days', features: ['Jungle Safari', 'Beach Villa', 'Guided Hikes'], color: 'var(--neon-green)' },
    { name: 'Island Romance', price: '2500', duration: '14 Days', features: ['Honeymoon Decor', 'Candlelight Dinner', 'All Inclusive'], color: 'var(--neon-yellow)' }
];

const getFeatureIcon = (feature, color, isDark = false) => {
    const text = feature.toLowerCase();
    let iconClass = "fa-solid fa-circle-check"; // Default check
    
    if (text.includes('culture') || text.includes('site') || text.includes('temple') || text.includes('heritage') || text.includes('ancient')) {
        iconClass = "fa-solid fa-landmark-dome";
    } else if (text.includes('driver') || text.includes('car') || text.includes('transfer') || text.includes('transport') || text.includes('private')) {
        iconClass = "fa-solid fa-car-rear";
    } else if (text.includes('hotel') || text.includes('resort') || text.includes('stay') || text.includes('accommodation') || text.includes('luxury')) {
        iconClass = "fa-solid fa-hotel";
    } else if (text.includes('safari') || text.includes('wild') || text.includes('jungle') || text.includes('yala') || text.includes('animal')) {
        iconClass = "fa-solid fa-paw";
    } else if (text.includes('beach') || text.includes('villa') || text.includes('coast') || text.includes('sea') || text.includes('mirissa')) {
        iconClass = "fa-solid fa-umbrella-beach";
    } else if (text.includes('hike') || text.includes('trek') || text.includes('mountain') || text.includes('climb')) {
        iconClass = "fa-solid fa-mountain-sun";
    } else if (text.includes('honeymoon') || text.includes('romance') || text.includes('decor') || text.includes('love')) {
        iconClass = "fa-solid fa-heart";
    } else if (text.includes('dinner') || text.includes('meal') || text.includes('food') || text.includes('drink') || text.includes('candlelight')) {
        iconClass = "fa-solid fa-utensils";
    } else if (text.includes('inclusive') || text.includes('guide') || text.includes('tour') || text.includes('all')) {
        iconClass = "fa-solid fa-star";
    }

    const iconColor = isDark ? (color === 'var(--neon-green)' ? '#0f766e' : '#b45309') : color;
    const shadowFilter = isDark ? 'none' : `drop-shadow(0 0 3px ${color}77)`;

    return <i className={iconClass} style={{ color: iconColor, marginRight: '14px', fontSize: '1.1rem', filter: shadowFilter }}></i>;
};

const TourPackages = () => {
    const [packages, setPackages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false }).limit(3);
                if (error) throw error;
                if (data && data.length > 0) {
                    setPackages(data.map(p => ({
                        ...p,
                        color: p.color || (Math.random() > 0.5 ? 'var(--neon-yellow)' : 'var(--neon-green)'),
                        features: Array.isArray(p.features) ? p.features : []
                    })));
                } else {
                    setPackages(fallbackPackages);
                }
            } catch (err) {
                console.error('Error fetching packages:', err);
                setPackages(fallbackPackages);
            }
        };
        fetchPackages();
    }, []);

    return (
        <section id="packages" className="packages-section">
            <div className="container">
                <div className="section-header reveal">
                    <span className="subtitle" style={{ 
                        color: 'var(--neon-green)', 
                        textShadow: 'var(--neon-glow-green)',
                        letterSpacing: '4px',
                        fontWeight: '700',
                        display: 'block',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-main)',
                        fontSize: '1.05rem'
                    }}>Curated Journeys</span>
                    <h2 style={{ color: 'white', fontFamily: 'var(--font-accent)', fontSize: '2.5rem', fontWeight: '800', textTransform: 'none' }}>Featured Tour Packages</h2>
                    <div style={{ width: '80px', height: '4px', background: 'var(--gradient-vibrant)', marginTop: '15px', borderRadius: '2px' }}></div>
                </div>

                <div className="package-slider">
                    {packages.map((pkg, i) => {
                        const discounts = [10, 15, 15, 20, 25, 30];
                        const discountPercent = discounts[i % discounts.length];
                        const originalPrice = parseFloat(pkg.price);
                        const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
                        
                        const shadowColor = pkg.color === 'var(--neon-green)' ? 'rgba(57, 255, 20, 0.35)' : 'rgba(255, 240, 31, 0.35)';
                        const glowValue = pkg.color === 'var(--neon-green)' ? 'var(--neon-glow-green)' : 'var(--neon-glow)';
                        
                        return (
                            <div key={i} className="custom-package-card reveal" style={{ 
                                transitionDelay: `${i * 0.15}s`,
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
                                            margin: 0,
                                            fontWeight: '800',
                                            fontFamily: 'var(--font-accent)',
                                            lineHeight: '1.25'
                                        }}>{pkg.name}</h3>
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

                                {pkg.image && (
                                     <div className="custom-package-card-img-wrapper" onClick={() => setSelectedImage(pkg.image)}>
                                         <img src={pkg.image} alt={pkg.name} className="custom-package-card-img" />
                                     </div>
                                )}

                                <div style={{ 
                                    padding: '25px 30px 30px 30px', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    flex: 1,
                                    backgroundColor: '#ffffff',
                                    borderBottomLeftRadius: '22px',
                                    borderBottomRightRadius: '22px'
                                }}>
                                     <div className="price-container" style={{ marginBottom: '22px', display: 'flex', alignItems: 'baseline' }}>
                                         {/* Actual Price Cut */}
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
                                         {/* Highlighted Current Price */}
                                         <span className="price-val" style={{ 
                                             color: '#16a34a', 
                                             fontSize: '1.8rem', 
                                             fontWeight: '950', 
                                             fontFamily: 'var(--font-accent)'
                                         }}>
                                             ${discountedPrice}
                                         </span>
                                         <span style={{ color: '#6b7280', fontSize: '0.85rem', marginLeft: '6px', fontWeight: '600', fontFamily: 'var(--font-main)' }}>/ person</span>
                                     </div>

                                     <ul style={{ textAlign: 'left', marginBottom: '25px', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                         {Array.isArray(pkg.features) && cleanFeatures(pkg.features).map((f, j) => (
                                             <li key={j} style={{ color: '#1f2937', display: 'flex', alignItems: 'center', fontSize: '0.92rem', fontWeight: '600', fontFamily: 'var(--font-main)' }}>
                                                 {getFeatureIcon(f, pkg.color, true)}
                                                 {f}
                                             </li>
                                         ))}
                                     </ul>

                                     <a 
                                         href={`https://wa.me/94771234567?text=I'm interested in the ${pkg.name} package`} 
                                         className="custom-enquire-btn" 
                                         style={{ 
                                             background: `linear-gradient(135deg, ${pkg.color} 0%, ${pkg.color === 'var(--neon-green)' ? '#15b300' : '#ffb300'} 100%)`,
                                             color: '#000',
                                             boxShadow: `0 4px 15px ${pkg.color}33`
                                         }}
                                     >
                                         Enquire Now 
                                         <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.85rem', transition: 'transform 0.3s ease' }}></i>
                                     </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }} className="reveal">
                    <a href="/packages" className="btn btn-outline" style={{ 
                        borderColor: '#ffcc00', 
                        color: '#ffcc00',
                        borderRadius: '50px',
                        padding: '12px 30px',
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        fontFamily: 'var(--font-accent)'
                    }}>Explore All Packages</a>
                </div>
            </div>
            <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />

            <style jsx>{`
                .packages-section {
                    padding: 120px 0;
                    background: #000;
                    position: relative;
                }

                .package-slider {
                    display: flex;
                    gap: 35px;
                    padding: 40px 0;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                /* Modern Card base with glowing colored border on hover */
                .custom-package-card {
                    flex: 1;
                    min-width: 320px;
                    max-width: 380px;
                    background: linear-gradient(135deg, rgba(12, 12, 12, 0.98) 0%, rgba(3, 3, 3, 1) 100%);
                    border-radius: 24px;
                    overflow: visible;
                    display: flex;
                    flex-direction: column;
                    min-height: 560px; /* Uniform minimum height */
                    height: 100%; /* Dynamic expansion for all details */
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                }

                .custom-package-card:hover {
                    transform: translateY(-12px) scale(1.025);
                }

                /* Yellow Border & Shadow */
                .custom-package-card[style*="var(--neon-yellow)"]:hover {
                    border-color: var(--neon-yellow) !important;
                    box-shadow: 0 25px 50px rgba(255, 240, 31, 0.25),
                                0 0 30px rgba(255, 240, 31, 0.12) !important;
                }

                /* Green Border & Shadow */
                .custom-package-card[style*="var(--neon-green)"]:hover {
                    border-color: var(--neon-green) !important;
                    box-shadow: 0 25px 50px rgba(57, 255, 20, 0.25),
                                0 0 30px rgba(57, 255, 20, 0.12) !important;
                }

                .custom-package-card-img-wrapper {
                    width: 100%;
                    height: 220px;
                    overflow: hidden;
                    position: relative;
                    cursor: pointer;
                    border-bottom: 4px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.5s ease;
                }

                .custom-package-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .custom-package-card:hover .custom-package-card-img {
                    transform: scale(1.08);
                }

                /* Floating modern duration tag */
                .duration-badge {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background: rgba(0, 0, 0, 0.78);
                    backdrop-filter: blur(10px);
                    color: #fff;
                    padding: 6px 14px;
                    border-radius: 50px;
                    font-size: 0.72rem;
                    font-weight: 800;
                    font-family: var(--font-accent);
                    letter-spacing: 0.8px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    z-index: 10;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    transition: all 0.3s ease;
                }

                /* Dynamic Colored Price Styling */
                .price-container {
                    display: flex;
                    align-items: baseline;
                    gap: 2px;
                    margin-bottom: 22px;
                }

                .price-val {
                    font-size: 2.4rem;
                    font-weight: 900;
                    font-family: var(--font-accent);
                    line-height: 1;
                }

                /* Custom Premium Buttons */
                .custom-enquire-btn {
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

                .custom-enquire-btn:hover {
                    transform: translateY(-2px) scale(1.02);
                }

                .custom-package-card[style*="var(--neon-yellow)"] .custom-enquire-btn:hover {
                    box-shadow: 0 8px 20px rgba(255, 240, 31, 0.4) !important;
                }

                .custom-package-card[style*="var(--neon-green)"] .custom-enquire-btn:hover {
                    box-shadow: 0 8px 20px rgba(57, 255, 20, 0.4) !important;
                }

                .custom-enquire-btn:hover i {
                    transform: translateX(4px) translateY(-2px);
                }

                @media (max-width: 768px) {
                    .custom-package-card {
                        min-width: 100%;
                        max-width: 100%;
                        height: auto;
                    }
                    .custom-package-card-img-wrapper {
                        height: 200px;
                    }
                }
            `}</style>
        </section>
    );
};

export default TourPackages;
