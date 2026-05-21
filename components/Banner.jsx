"use client";

import React from 'react';

const Banner = () => {
    return (
        <div className="announcement-banner">
            <p>
                🌟 <span style={{ color: '#fef08a', textShadow: '0 0 8px rgba(254, 240, 138, 0.6)' }}>Limited Time Offer:</span> Book Your 2026 Sri Lankan Adventure Now and <span style={{ color: '#fef08a', textShadow: '0 0 8px rgba(254, 240, 138, 0.6)' }}>Save 15%!</span> 🌟
            </p>
            <style jsx>{`
                .announcement-banner {
                    background: linear-gradient(90deg, #7f1d1d 0%, #dc2626 50%, #7f1d1d 100%);
                    background-size: 200% auto;
                    color: #ffffff;
                    padding: 12px 20px;
                    text-align: center;
                    font-size: 0.95rem;
                    font-weight: 800;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    box-shadow: 0 4px 20px rgba(220, 38, 38, 0.5);
                    position: relative;
                    z-index: 99;
                    animation: shine 4s linear infinite;
                    border-bottom: 2px solid #ef4444;
                    font-family: var(--font-accent);
                }
                @keyframes shine {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .announcement-banner p {
                    margin: 0;
                    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
                }
                @media (max-width: 768px) {
                    .announcement-banner {
                        font-size: 0.78rem;
                        padding: 10px 12px;
                        letter-spacing: 0.5px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Banner;
