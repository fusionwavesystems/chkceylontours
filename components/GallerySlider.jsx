"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const GallerySlider = ({ 
    title = "Our Worldly Journey", 
    subtitle = "Captured Moments" 
}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setImages(data);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    if (loading || images.length < 6) return null;

    // Helper to format uppercase database titles to premium Title Case
    // Helper to format uppercase database titles to premium Title Case
    const formatCardTitle = (text) => {
        if (!text || typeof text !== 'string') return '';
        
        // Add space after parenthesis if missing, e.g. "(RAMBODA VIWEPOINT)A 9-DAY" -> "(RAMBODA VIWEPOINT) A 9-DAY"
        let processedText = text.replace(/\)([A-Za-z0-9])/g, ') $1');
        
        // If the string is all uppercase, convert to a beautiful Title Case
        if (processedText === processedText.toUpperCase()) {
            return processedText
                .toLowerCase()
                .split(' ')
                .map(word => {
                    const lowerWords = ['a', 'to', 'in', 'of', 'and', 'the', 'on', 'for', 'with', 'at', 'by'];
                    if (lowerWords.includes(word) && word !== '') {
                        return word;
                    }
                    return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(' ')
                .replace(/^\w/, c => c.toUpperCase())
                // Ensure parenthesis starting letters are capitalized: "(ramboda" -> "(Ramboda"
                .replace(/\(\s*([a-z])/gi, (match, letter) => `(${letter.toUpperCase()}`);
        }
        return processedText;
    };

    // Helper to extract location from parentheses
    const extractLocation = (text) => {
        if (!text || typeof text !== 'string') return '';
        const match = text.match(/\(([^)]+)\)/);
        return match ? match[1].trim() : '';
    };

    // Helper to clean parenthesized location out of the title
    const cleanTitle = (text) => {
        if (!text || typeof text !== 'string') return '';
        // Remove parenthesized part: "(Sri Pada/Adam's Peak)" -> ""
        let clean = text.replace(/\([^)]+\)/g, '').trim();
        // Remove redundant duration prefixes to keep card descriptions short and sleek
        clean = clean.replace(/^A\s+\d+-day\s+tour\s+to\s+srilanka\s+with\s+(the\s+)?/i, 'Tour with ');
        clean = clean.replace(/^A\s+\d+-day\s+tour\s+of\s+srilanka\s+with\s+(the\s+)?/i, 'Tour with ');
        clean = clean.replace(/^A\s+\d+-day\s+tour\s+to\s+srilanka\s+with\s+/i, 'Tour with ');
        clean = clean.replace(/^A\s+\d+-day\s+tour\s+with\s+(the\s+)?/i, 'Tour with ');
        return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : '';
    };

    // Helper to extract duration (e.g. "5-day")
    const extractDuration = (text) => {
        if (!text || typeof text !== 'string') return '';
        const match = text.match(/A\s+(\d+-day)\s+tour/i) || text.match(/A\s+(\d+-day)/i) || text.match(/A\d+-day/i);
        if (match) {
            let res = match[1] || match[0];
            // Format "A7-day" -> "7-day"
            res = res.replace(/^a/i, '');
            return res.charAt(0).toUpperCase() + res.slice(1);
        }
        return '';
    };

    // Double the array for a mathematically perfect, seamless marquee loop with minimal DOM overhead
    const displayImages = [...images, ...images];

    return (
        <section className="gallery-section overflow-hidden py-32" style={{ background: '#000', position: 'relative' }}>
             {/* Background blobs for visual flair */}
            <div className="bg-blob" style={{ bottom: '10%', right: '-10%', opacity: '0.12' }}></div>
            <div className="bg-blob" style={{ top: '10%', left: '-10%', opacity: '0.08', background: 'radial-gradient(circle, rgba(57, 255, 20, 0.15) 0%, transparent 70%)' }}></div>

            <div className="container mx-auto px-6 mb-20">
                <div className="section-header reveal active" style={{ 
                    borderLeft: '12px solid var(--neon-green)', 
                    paddingLeft: '30px', 
                    borderRadius: '8px',
                    boxShadow: '-10px 0 25px rgba(57, 255, 20, 0.25)'
                }}>
                    <span className="subtitle" style={{ 
                        color: 'var(--neon-green)', 
                        textShadow: 'var(--neon-glow-green)',
                        letterSpacing: '4px',
                        fontWeight: '700',
                        textTransform: 'none', /* Mixed-case! */
                        display: 'block',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-main)',
                        fontSize: '1.05rem'
                    }}>{subtitle}</span>
                    <h2 style={{ 
                        fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', 
                        fontWeight: '900', 
                        color: '#fff', 
                        lineHeight: '1.1',
                        fontFamily: 'var(--font-main)', /* Switched back to ultra-sleek Outfit */
                        letterSpacing: '-1.5px'
                    }}>{title}</h2>
                    {/* Thick Glowing Gradient Border Line (Pure Yellow-to-Green, No Blue) */}
                    <div style={{ 
                        width: '280px', 
                        height: '14px', 
                        background: 'linear-gradient(90deg, var(--neon-yellow) 0%, var(--neon-green) 100%)', 
                        marginTop: '25px', 
                        borderRadius: '12px', 
                        boxShadow: '0 0 25px rgba(57, 255, 20, 0.65), 0 0 12px rgba(255, 240, 31, 0.5)' 
                    }}></div>
                </div>
            </div>

            <div className="destinations-slider-container w-full overflow-hidden py-10">
                <div className="destinations-slider">
                    {displayImages.map((img, idx) => {
                        const location = extractLocation(img.country);
                        const duration = extractDuration(img.country);
                        const cleanDesc = cleanTitle(img.country);

                        return (
                            <div key={idx} className="gallery-card-wrapper">
                                 <div className="gallery-card">
                                      {/* 1st: White Text (Title) on Top */}
                                      <div style={{ 
                                          padding: '18px 20px 14px 20px', 
                                          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                          background: 'rgba(255, 255, 255, 0.02)',
                                          zIndex: 4
                                      }}>
                                          <h3 className="gallery-card-title-text" style={{ 
                                              margin: 0, 
                                              display: 'flex', 
                                              alignItems: 'flex-start',
                                              fontSize: '1.18rem',
                                              fontWeight: '800',
                                              color: '#fff',
                                              fontFamily: 'var(--font-accent)',
                                              lineHeight: '1.3',
                                              textTransform: 'none'
                                          }}>
                                              <i className="fa-solid fa-compass" style={{ marginRight: '8px', marginTop: '3px', color: 'var(--neon-green)', fontSize: '0.95rem', flexShrink: 0 }}></i>
                                              {formatCardTitle(cleanDesc)}
                                          </h3>
                                      </div>

                                      {/* 2nd: Then Photo in Middle */}
                                      <div className="gallery-card-img-wrapper" style={{ position: 'relative' }}>
                                          <img 
                                              src={img.image} 
                                              alt={img.country || 'Destination Captured Moment'} 
                                              className="gallery-card-img"
                                              loading="lazy"
                                          />
                                          {/* Solid high-contrast yellow badge with bold black text on top-right of the photo */}
                                          {duration && (
                                              <div style={{
                                                  position: 'absolute',
                                                  top: '15px',
                                                  right: '15px',
                                                  background: 'var(--neon-yellow)',
                                                  borderRadius: '12px',
                                                  padding: '5px 12px',
                                                  color: '#000',
                                                  fontSize: '0.72rem',
                                                  fontWeight: '900',
                                                  fontFamily: 'var(--font-accent)',
                                                  whiteSpace: 'nowrap',
                                                  boxShadow: '0 0 15px rgba(255, 240, 31, 0.45)',
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  gap: '5px',
                                                  textTransform: 'uppercase',
                                                  letterSpacing: '0.5px',
                                                  zIndex: 5
                                              }}>
                                                  <i className="fa-regular fa-calendar-check" style={{ fontSize: '0.8rem', color: '#000' }}></i>
                                                  {duration}
                                              </div>
                                          )}
                                      </div>

                                      {/* 3rd & 4th: Yellow Location Text Box & CTA Button */}
                                      <div className="gallery-card-content" style={{
                                          padding: '16px 20px 20px 20px',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          flexGrow: 1,
                                          background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.98) 0%, rgba(5, 5, 5, 1) 100%)',
                                          zIndex: 3,
                                          justifyContent: 'space-between'
                                      }}>
                                          {/* Highly Readable yellow Location text inside a sleek, premium, transparent dark yellow box container */}
                                          {location ? (
                                              <div style={{ 
                                                  display: 'flex',
                                                  alignItems: 'flex-start',
                                                  gap: '8px',
                                                  background: 'rgba(255, 240, 31, 0.04)',
                                                  border: '1px solid rgba(255, 240, 31, 0.15)',
                                                  padding: '8px 12px',
                                                  borderRadius: '12px',
                                                  width: '100%',
                                                  margin: '0 0 12px 0'
                                              }}>
                                                  <i className="fa-solid fa-map-pin" style={{ color: 'var(--neon-yellow)', marginTop: '3px', fontSize: '0.8rem', flexShrink: 0 }}></i>
                                                  <span style={{ 
                                                      color: 'var(--neon-yellow)', 
                                                      fontSize: '0.78rem', 
                                                      fontWeight: '700',
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

                                          {/* Completed the box: Explorer CTA button */}
                                          <Link href="/gallery" className="gallery-explore-btn" style={{ marginTop: 'auto' }}>
                                              Explore Destination <i className="fa-solid fa-circle-arrow-right" style={{ marginLeft: '8px', fontSize: '0.95rem' }}></i>
                                          </Link>
                                      </div>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .destinations-slider-container {
                    position: relative;
                    width: 100%;
                }

                /* Hardware-accelerated, composite-only marquee track */
                .destinations-slider {
                    display: flex;
                    gap: 32px;
                    width: max-content;
                    animation: smoothMarquee 42s linear infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                    perspective: 1000px;
                    transform-style: preserve-3d;
                }

                .destinations-slider-container:hover .destinations-slider {
                    animation-play-state: paused;
                }

                /* Mathematically seamless infinite loop marquee on hardware accelerated layer */
                @keyframes smoothMarquee {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-50%, 0, 0);
                    }
                }

                /* Dedicated floating wrapper to isolate Y-translation on its own GPU layer, preventing lag */
                .gallery-card-wrapper {
                    padding: 15px 0;
                    will-change: transform;
                    transform-style: preserve-3d;
                    backface-visibility: hidden;
                }

                /* Gentle premium out-of-phase floating wave animation */
                .gallery-card-wrapper:nth-child(odd) {
                    animation: cardFloatOdd 7s ease-in-out infinite;
                }

                .gallery-card-wrapper:nth-child(even) {
                    animation: cardFloatEven 7s ease-in-out infinite;
                }

                .gallery-card-wrapper:hover {
                    animation-play-state: paused !important;
                }

                @keyframes cardFloatOdd {
                    0%, 100% {
                        transform: translate3d(0, 0, 0);
                    }
                    50% {
                        transform: translate3d(0, -12px, 0);
                    }
                }

                @keyframes cardFloatEven {
                    0%, 100% {
                        transform: translate3d(0, -12px, 0);
                    }
                    50% {
                        transform: translate3d(0, 0, 0);
                    }
                }

                /* Premium Compact Glowing Neon Card */
                .gallery-card {
                    width: 320px;
                    height: 430px; /* Snug height adjusted for top header and right badge */
                    background: linear-gradient(180deg, #111111 0%, #070707 100%);
                    border: 1.5px solid rgba(255, 240, 31, 0.25); /* Elegant modern thin border */
                    border-radius: 24px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                    will-change: transform, border-color, box-shadow;
                }

                /* Sweeping premium light reflection effect */
                .gallery-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -75%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(
                        to right, 
                        rgba(255, 255, 255, 0) 0%, 
                        rgba(255, 255, 255, 0.18) 100%
                    );
                    transform: skewX(-25deg);
                    transition: 0.75s ease;
                    z-index: 2;
                    pointer-events: none;
                }

                .gallery-card:hover::before {
                    left: 125%;
                }

                .gallery-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--neon-yellow) !important; /* Glows beautiful brand yellow on hover */
                    box-shadow: 0 20px 40px rgba(255, 240, 31, 0.2), 
                                0 0 25px rgba(255, 240, 31, 0.08);
                }

                /* Image container */
                .gallery-card-img-wrapper {
                    width: 100%;
                    height: 190px; /* Sized beautifully for title-at-top layout */
                    overflow: hidden;
                    border-bottom: 5px solid rgba(255, 240, 31, 0.45); /* Thicker glowing divider */
                    transition: all 0.5s ease;
                    position: relative;
                }

                .gallery-card:hover .gallery-card-img-wrapper {
                    border-bottom-color: rgba(57, 255, 20, 0.55);
                }

                .gallery-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .gallery-card:hover .gallery-card-img {
                    transform: scale(1.1);
                }

                /* Modern Floating Location Badge */
                .location-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(0, 0, 0, 0.78);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--neon-yellow);
                    box-shadow: 0 0 10px rgba(255, 240, 31, 0.35);
                    padding: 5px 12px;
                    border-radius: 20px;
                    color: #fff;
                    font-size: 0.72rem;
                    font-weight: 700;
                    font-family: var(--font-accent);
                    display: flex;
                    align-items: center;
                    z-index: 10;
                    transition: all 0.3s ease;
                }

                .gallery-card:hover .location-badge {
                    border-color: var(--neon-green);
                    box-shadow: 0 0 15px rgba(57, 255, 20, 0.5);
                }

                /* Modern text & CTA container with zero wasted space */
                .gallery-card-content {
                    padding: 16px 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    flex-grow: 1;
                    background: linear-gradient(135deg, rgba(15, 15, 15, 0.98) 0%, rgba(5, 5, 5, 1) 100%);
                    z-index: 3;
                    height: auto; /* Dynamically sized to fill remaining space */
                }

                .duration-tag {
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: var(--neon-green);
                    text-shadow: 0 0 5px rgba(57, 255, 20, 0.3);
                    font-family: var(--font-accent);
                    letter-spacing: 0.5px;
                    margin-bottom: 2px;
                }

                .gallery-card-title {
                    color: #fff;
                    font-size: 1.15rem; /* Proportional header size */
                    font-weight: 800;
                    margin: 0;
                    font-family: var(--font-accent);
                    text-transform: none; /* Mixed-case! */
                    letter-spacing: 0.2px;
                    line-height: 1.25;
                    transition: color 0.3s ease;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                }

                .gallery-card:hover .gallery-card-title {
                    color: var(--neon-green);
                    text-shadow: 0 0 10px rgba(57, 255, 20, 0.4);
                }

                 /* Premium, interactive Mixed-Case Round Oval CTA (Gradient Yellow, No Blue) */
                 :global(.gallery-explore-btn) {
                     background: linear-gradient(135deg, var(--neon-yellow) 0%, #ffb300 100%) !important; /* Premium rich gradient yellow to golden amber */
                     border: none !important;
                     padding: 11px 22px !important;
                     border-radius: 50px !important; /* Perfect round oval shape */
                     color: #000 !important;
                     font-size: 0.85rem !important;
                     font-weight: 800 !important; /* Extra bold for premium contrast */
                     font-family: var(--font-accent) !important;
                     text-transform: none !important; /* Mixed-case! */
                     letter-spacing: 0.5px !important;
                     transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
                     text-decoration: none !important;
                     text-align: center !important;
                     width: 100% !important;
                     display: flex !important;
                     align-items: center !important;
                     justify-content: center !important;
                     box-shadow: 0 4px 15px rgba(255, 240, 31, 0.35) !important; /* Golden yellow shadow */
                 }
 
                 :global(.gallery-explore-btn:hover) {
                     background: linear-gradient(135deg, #ffb300 0%, var(--neon-yellow) 100%) !important; /* Swaps solar gradient on hover */
                     transform: translateY(-2px) scale(1.02) !important;
                     box-shadow: 0 10px 25px rgba(255, 240, 31, 0.55), 
                                 0 0 15px rgba(255, 240, 31, 0.35) !important;
                     color: #000 !important;
                 }

                /* Responsive view adjustments */
                @media (max-width: 768px) {
                    .gallery-card {
                        width: 260px !important;
                        height: 350px !important; /* Keep mobile height compact too! */
                        border-width: 3px !important;
                        border-radius: 20px !important;
                    }
                    .gallery-card-img-wrapper {
                        height: 180px !important;
                        border-bottom-width: 3px !important;
                    }
                    .location-badge {
                        top: 10px !important;
                        right: 10px !important;
                        padding: 4px 8px !important;
                        font-size: 0.65rem !important;
                    }
                    .gallery-card-content {
                        padding: 12px 15px !important;
                        height: 170px !important;
                    }
                    .gallery-card-title {
                        font-size: 1.05rem !important;
                        margin-bottom: 4px !important;
                        -webkit-line-clamp: 2 !important;
                    }
                    :global(.gallery-explore-btn) {
                        padding: 8px 14px !important;
                        font-size: 0.78rem !important;
                        border-radius: 50px !important; /* Perfect round oval on mobile */
                    }
                    .section-header {
                        border-left-width: 6px !important;
                        padding-left: 18px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default GallerySlider;
