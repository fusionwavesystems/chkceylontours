"use client";

import React from 'react';
import { guestGalleryData } from '../data/guestGallery';

const GuestMemorySlider = () => {
    const displayImages = [...guestGalleryData, ...guestGalleryData];

    return (
        <div className="guest-memories-wrapper overflow-hidden" style={{ background: '#000', padding: '40px 0 60px' }}>
            <div className="slider-track">
                {displayImages.map((img, idx) => (
                    <div key={idx} className={`card-slot ${idx % 2 === 0 ? 'float-a' : 'float-b'}`}>
                        <div className="photo-frame">
                            <img
                                src={img.image}
                                loading="lazy"
                                decoding="async"
                                alt={img.country}
                            />
                            {/* Orange glow country label */}
                            <div className="memory-label">
                                <i className="fas fa-map-marker-alt"></i>
                                {img.country}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                /* ── Marquee: right → left ── */
                .slider-track {
                    display: flex;
                    gap: 28px;
                    width: max-content;
                    animation: slideRightToLeft 50s linear infinite;
                    align-items: center;
                }
                .slider-track:hover {
                    animation-play-state: paused;
                }

                @keyframes slideRightToLeft {
                    from { transform: translateX(0); }
                    to   { transform: translateX(calc(-318px * ${guestGalleryData.length})); }
                }

                /* ── Layout placeholder keeps spacing stable while card floats/tilts ── */
                .card-slot {
                    width: 290px;
                    height: 430px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* ── Alternating float phases: cards bob at different rates ── */
                .float-a { animation: floatBobA 4s ease-in-out infinite; }
                .float-b { animation: floatBobB 4.6s ease-in-out infinite; }

                @keyframes floatBobA {
                    0%, 100% { transform: translateY(0px)   rotate(-4deg); }
                    50%       { transform: translateY(-18px) rotate(4deg);  }
                }
                @keyframes floatBobB {
                    0%, 100% { transform: translateY(-10px) rotate(3deg);  }
                    50%       { transform: translateY(10px)  rotate(-3deg); }
                }

                /* ── Photo frame: orange glowing border ONLY, no background box ── */
                .photo-frame {
                    width: 270px;
                    height: 400px;
                    border-radius: 28px;
                    overflow: hidden;
                    position: relative;
                    /* Orange glowing border */
                    border: 3px solid #ff6a00;
                    box-shadow:
                        0 0 0 1px rgba(255, 106, 0, 0.15),
                        0 0 18px 4px rgba(255, 106, 0, 0.55),
                        0 0 45px 8px rgba(255, 106, 0, 0.25);
                    transition: box-shadow 0.4s ease, transform 0.4s ease;
                }

                /* Stronger glow on hover */
                .card-slot:hover {
                    animation-play-state: paused !important;
                }
                .card-slot:hover .photo-frame {
                    box-shadow:
                        0 0 0 2px rgba(255, 106, 0, 0.4),
                        0 0 30px 8px rgba(255, 106, 0, 0.75),
                        0 0 70px 12px rgba(255, 106, 0, 0.35);
                    transform: scale(1.06);
                }

                .photo-frame img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                /* Country label as a Badge */
                .memory-label {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    padding: 6px 14px;
                    background: #ff6a00;
                    color: #fff;
                    font-size: 0.8rem;
                    font-weight: 800;
                    font-family: var(--font-accent);
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                }
                .memory-label i {
                    font-size: 0.9rem;
                }

                /* ── Responsive ── */
                @media (max-width: 768px) {
                    .card-slot {
                        width: 230px !important;
                        height: 360px !important;
                    }
                    .photo-frame {
                        width: 210px !important;
                        height: 330px !important;
                        border-radius: 20px !important;
                    }
                    @keyframes slideRightToLeft {
                        from { transform: translateX(0); }
                        to   { transform: translateX(calc(-258px * ${guestGalleryData.length})); }
                    }
                }
            `}</style>
        </div>
    );
};

export default GuestMemorySlider;
