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

    // Triple the array for seamless loop
    const displayImages = [...images, ...images, ...images];

    return (
        <section className="gallery-section overflow-hidden py-32" style={{ background: '#000', position: 'relative' }}>
             {/* Background blobs for visual flair */}
            <div className="bg-blob" style={{ bottom: '10%', right: '-10%', opacity: '0.1' }}></div>

            <div className="container mx-auto px-6 mb-20">
                <div className="section-header reveal active">
                    <span className="subtitle" style={{ 
                        color: 'var(--neon-green)', 
                        textShadow: 'var(--neon-glow-green)',
                        letterSpacing: '5px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '15px'
                    }}>{subtitle}</span>
                    <h2 style={{ 
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                        fontWeight: '950', 
                        color: '#fff', 
                        lineHeight: '1.1',
                        fontFamily: '"Outfit", sans-serif'
                    }}>{title}</h2>
                    <div style={{ width: '80px', height: '4px', background: 'var(--neon-yellow)', marginTop: '25px', borderRadius: '10px', boxShadow: 'var(--neon-glow)' }}></div>
                </div>
            </div>

            <div className="destinations-slider-container w-full overflow-hidden">
                <div className="destinations-slider flex gap-8" style={{ width: 'max-content', animation: 'rotateLeft 60s linear infinite' }}>
                    {displayImages.map((img, idx) => (
                        <div key={idx} className="gallery-card">
                            <div className="gallery-card-img-wrapper">
                                <img 
                                    src={img.image} 
                                    alt={img.country} 
                                    className="gallery-card-img"
                                />
                            </div>
                            <div className="gallery-card-content">
                                <h3 className="gallery-card-title">{img.country}</h3>
                                <Link href="/gallery" className="gallery-explore-btn">
                                    Explore Destination
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .gallery-card {
                    width: 290px;
                    height: 380px;
                    background: rgba(10, 10, 10, 0.85);
                    border: 2px solid rgba(255, 240, 31, 0.45); /* Elegant gold/yellow neon border */
                    border-radius: 24px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(255, 240, 31, 0.05);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                }

                .gallery-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    border-color: var(--neon-green); /* Shifting to vibrant neon green on hover */
                    box-shadow: 0 20px 40px rgba(57, 255, 20, 0.25), 0 0 20px rgba(57, 255, 20, 0.15), inset 0 0 20px rgba(57, 255, 20, 0.05);
                }

                .gallery-card-img-wrapper {
                    width: 100%;
                    height: 230px;
                    overflow: hidden;
                    border-bottom: 2px solid rgba(255, 240, 31, 0.2);
                    transition: all 0.4s ease;
                }

                .gallery-card:hover .gallery-card-img-wrapper {
                    border-bottom-color: rgba(57, 255, 20, 0.4);
                }

                .gallery-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .gallery-card:hover .gallery-card-img {
                    transform: scale(1.08);
                }

                .gallery-card-content {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    flex-grow: 1;
                    background: linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(5, 5, 5, 0.98) 100%);
                }

                .gallery-card-title {
                    color: #fff;
                    font-size: 1.15rem;
                    font-weight: 850;
                    margin-bottom: 12px;
                    font-family: 'Outfit', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: color 0.3s ease;
                }

                .gallery-card:hover .gallery-card-title {
                    color: var(--neon-yellow);
                    text-shadow: 0 0 10px rgba(255, 240, 31, 0.4);
                }

                .gallery-explore-btn {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    padding: 10px 20px;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-decoration: none;
                    text-align: center;
                    width: 100%;
                    display: block;
                }

                .gallery-explore-btn:hover {
                    background: var(--neon-green) !important;
                    color: #000 !important;
                    border-color: var(--neon-green) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(57, 255, 20, 0.4);
                }

                .destinations-slider:hover {
                    animation-play-state: paused;
                }

                .subtitle {
                    display: inline-block;
                    font-size: 0.9rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                    margin-bottom: 15px;
                }

                @media (max-width: 768px) {
                    .gallery-card {
                        width: 240px !important;
                        height: 330px !important;
                    }
                    .gallery-card-img-wrapper {
                        height: 180px !important;
                    }
                    .gallery-card-title {
                        font-size: 1rem !important;
                        margin-bottom: 8px !important;
                    }
                    .gallery-explore-btn {
                        padding: 8px 15px !important;
                        font-size: 0.7rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default GallerySlider;
