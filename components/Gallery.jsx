"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageLightbox from './ImageLightbox';

const extractLocation = (text) => {
    if (!text || typeof text !== 'string') return '';
    const parts = text.split('|');
    return parts[0] ? parts[0].trim() : '';
};

const extractDuration = (text) => {
    if (!text || typeof text !== 'string') return '';
    const parts = text.split('|');
    return parts[1] ? parts[1].trim() : '';
};

const cleanTitle = (text) => {
    if (!text || typeof text !== 'string') return '';
    const parts = text.split('|');
    return parts[2] ? parts[2].trim() : '';
};

const formatCardTitle = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text.split(' ')
        .map(word => {
            if (!word) return '';
            // Capitalize first character and lowercase the rest
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
};

const Gallery = () => {
    const [dbImages, setDbImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setDbImages(data);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Fetch images uploaded by admin
    const allImages = dbImages.map(img => ({
        id: img.id,
        url: img.image,
        title: img.country, // Raw string from database containing Location | Duration | Title
        link: img.link,
        category: "Gallery"
    }));

    return (
        <section className="gallery-section" id="gallery" style={{ padding: "80px 0", background: "#050505" }}>
            <div className="container">
                <div className="reveal text-center" style={{ marginBottom: "50px" }}>
                    <span className="subtitle" style={{ 
                        color: "#d97706", 
                        letterSpacing: '4px',
                        fontWeight: '800',
                        display: 'block',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-main)',
                        fontSize: '1.05rem',
                        textTransform: 'uppercase'
                    }}>Memories in Sri Lanka</span>
                    <h2 style={{ fontSize: "clamp(2.3rem, 5vw, 3.5rem)", marginTop: "10px", color: '#ffffff', fontFamily: 'var(--font-accent)', fontWeight: '900' }}>Our Travel Gallery</h2>
                    <div style={{ width: "80px", height: "4px", background: "linear-gradient(90deg, #facc15 0%, #d97706 100%)", margin: "20px auto", borderRadius: "10px" }}></div>
                </div>

                <div className="gallery-grid" style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", 
                    gap: "28px", 
                    padding: "10px" 
                }}>
                    {allImages.map((image, index) => {
                        const rawText = image.title;
                        const location = extractLocation(rawText);
                        const duration = extractDuration(rawText);
                        const cleanDesc = cleanTitle(rawText);

                        const displayTitle = cleanDesc || rawText;

                        return (
                            <div key={image.id || index} className="gallery-card reveal" style={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #facc15 0%, #d97706 100%) border-box',
                                border: '2px solid transparent',
                                borderRadius: '24px',
                                padding: '18px',
                                transition: 'all 0.5s ease',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
                                overflow: 'hidden',
                                justifyContent: 'space-between',
                                height: '420px'
                            }}>
                                {/* 1st: Title on Top */}
                                <div style={{ 
                                    padding: '0 2px 12px 2px', 
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
                                }}>
                                    <h3 className="gallery-card-title-text" style={{ 
                                        fontSize: "1.15rem", 
                                        margin: 0, 
                                        fontWeight: "900", 
                                        fontFamily: 'var(--font-accent)',
                                        textTransform: "none",
                                        lineHeight: '1.3',
                                        background: 'linear-gradient(135deg, #1a1a1a 0%, #666666 45%, #000000 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))',
                                        transition: "all 0.3s ease"
                                    }}>{formatCardTitle(displayTitle)}</h3>
                                </div>

                                {/* 2nd: Then Photo in Middle */}
                                <div className="gallery-item" style={{ 
                                    position: "relative", 
                                    height: "170px", // Snug photo height for beautiful box balance
                                    borderRadius: "16px", 
                                    overflow: "hidden", 
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                    background: "rgba(255,255,255,0.02)",
                                    marginTop: '12px'
                                }}>
                                    <img 
                                        src={image.url} 
                                        alt={displayTitle} 
                                        style={{ 
                                            width: "100%", 
                                            height: "100%", 
                                            objectFit: "cover", 
                                            transition: "transform 1.2s ease" 
                                        }} 
                                        className="gallery-img"
                                    />
                                    
                                    {/* Top right duration badge if present */}
                                    {duration && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'var(--neon-yellow)',
                                            borderRadius: '8px',
                                            padding: '4px 10px',
                                            color: '#000',
                                            fontSize: '0.65rem',
                                            fontWeight: '900',
                                            fontFamily: 'var(--font-accent)',
                                            whiteSpace: 'nowrap',
                                            boxShadow: '0 4px 10px rgba(255, 240, 31, 0.4)',
                                            zIndex: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            textTransform: 'uppercase'
                                        }}>
                                            <i className="fa-regular fa-clock" style={{ color: '#000' }}></i>
                                            {duration}
                                        </div>
                                    )}

                                    <div className="gallery-overlay" style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))",
                                        opacity: 0,
                                        transition: "opacity 0.6s ease",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 3
                                    }}>
                                        <button 
                                            onClick={() => setSelectedImage(image.url)}
                                            style={{
                                                padding: '10px 22px',
                                                borderRadius: '50px',
                                                border: '1px solid #fff',
                                                background: 'rgba(255,255,255,0.1)',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                backdropFilter: 'blur(10px)',
                                                fontWeight: '600',
                                                fontSize: '0.8rem',
                                                transition: 'all 0.3s ease'
                                            }}
                                            className="preview-btn"
                                        >
                                            <i className="fas fa-search-plus" style={{ marginRight: '8px' }}></i> Preview
                                        </button>
                                    </div>
                                </div>

                                {/* 3rd & 4th: Yellow Location Text Box & CTA Button */}
                                <div className="gallery-info" style={{ 
                                    padding: "12px 2px 0 2px", 
                                    textAlign: "left",
                                    transition: "transform 0.4s ease",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px',
                                    flexGrow: 1,
                                    justifyContent: 'space-between'
                                }}>
                                    {/* Location text inside a sleek translucent gray box container */}
                                    {location ? (
                                        <div style={{ 
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '8px',
                                            background: 'rgba(0, 0, 0, 0.05)',
                                            border: '1px solid rgba(0, 0, 0, 0.08)',
                                            padding: '8px 12px',
                                            borderRadius: '12px',
                                            width: '100%',
                                            margin: '0 0 10px 0'
                                        }}>
                                            <i className="fa-solid fa-map-pin" style={{ color: '#d97706', marginTop: '3px', fontSize: '0.85rem', flexShrink: 0 }}></i>
                                            <span style={{ 
                                                color: '#d97706', 
                                                fontSize: '0.78rem', 
                                                fontWeight: '850',
                                                fontFamily: 'var(--font-accent)',
                                                lineHeight: '1.4',
                                                display: 'block'
                                            }}>
                                                {formatCardTitle(location)}
                                            </span>
                                        </div>
                                    ) : (
                                        <div style={{ height: '14px' }} />
                                    )}

                                    {image.link && (
                                        <a
                                            href={image.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                padding: '10px 20px',
                                                borderRadius: '50px',
                                                background: 'transparent',
                                                border: '1.5px solid #d97706',
                                                color: '#d97706',
                                                textDecoration: 'none',
                                                fontWeight: '800',
                                                fontSize: '0.8rem',
                                                transition: 'all 0.4s ease',
                                                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.15)',
                                                marginTop: '4px',
                                                width: '100%'
                                            }}
                                            className="card-link-btn"
                                        >
                                            View Destination <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

             <style jsx>{`
                 .gallery-card {
                     transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
                     will-change: transform, border-color, box-shadow;
                 }
                  .gallery-card:hover {
                      transform: translateY(-8px);
                      box-shadow: 0 15px 30px rgba(250, 204, 21, 0.35) !important;
                  }
                  .gallery-card:hover .gallery-img {
                      transform: scale(1.1);
                  }
                  .gallery-card:hover .gallery-overlay {
                      opacity: 1;
                  }
                  .gallery-card:hover .gallery-card-title-text {
                      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) !important;
                  }
                  .preview-btn:hover {
                      background: #fff !important;
                      color: #000 !important;
                      transform: scale(1.05);
                  }
                  .card-link-btn:hover {
                      background: #d97706 !important;
                      color: #ffffff !important;
                      box-shadow: 0 8px 20px rgba(217, 119, 6, 0.3) !important;
                      transform: scale(1.02);
                  }
                .text-center {
                    text-align: center;
                }
                @media (max-width: 768px) {
                    .gallery-grid {
                        grid-template-columns: 1fr !important;
                        gap: 30px !important;
                    }
                    .gallery-item {
                        height: 250px !important;
                    }
                }
            `}</style>
            <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
        </section>
    );
};

export default Gallery;
