"use client";

import React from 'react';

const countries = [
    { name: "India", code: "in" },
    { name: "Netherlands", code: "nl" },
    { name: "France", code: "fr" },
    { name: "Spain", code: "es" },
    { name: "Australia", code: "au" },
    { name: "Romania", code: "ro" },
    { name: "Maldives", code: "mv" },
    { name: "China", code: "cn" },
    { name: "Japan", code: "jp" },
    { name: "UAE", code: "ae" },
    { name: "Switzerland", code: "ch" },
    { name: "New Zealand", code: "nz" },
    { name: "Iraq", code: "iq" }
];

const CountryFlags = () => {
    // Duplicate the array to create a seamless infinite loop
    const loopedCountries = [...countries, ...countries, ...countries];

    return (
        <section className="flags-section">
            <div className="flags-header reveal">
                <h3 style={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    fontSize: '1rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '3px',
                    textAlign: 'center',
                    marginBottom: '30px',
                    fontWeight: '800',
                    fontFamily: 'var(--font-accent)'
                }}>Welcoming Guests From Across the Globe</h3>
            </div>
            
            <div className="flags-marquee-container">
                <div className="flags-track">
                    {loopedCountries.map((country, idx) => (
                        <div key={idx} className="flag-item">
                            <img 
                                src={`https://flagcdn.com/w80/${country.code}.png`} 
                                alt={`${country.name} flag`} 
                                className="flag-img"
                            />
                            <span className="country-name">{country.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .flags-section {
                    padding: 30px 0 40px;
                    background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, #000000 100%);
                    position: relative;
                    overflow: hidden;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    margin-top: -5px; /* Pulls it slightly tight against the hero edge */
                    z-index: 10;
                }
                .flags-marquee-container {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    /* Fading edges */
                    -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
                    mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
                }
                .flags-track {
                    display: flex;
                    width: max-content;
                    animation: scrollFlags 40s linear infinite;
                    align-items: center;
                }
                .flags-track:hover {
                    animation-play-state: paused;
                }
                .flag-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 160px;
                    gap: 12px;
                    padding: 10px;
                    transition: transform 0.3s ease;
                    cursor: default;
                }
                .flag-item:hover {
                    transform: scale(1.15) translateY(-5px);
                }
                .flag-img {
                    width: 60px;
                    height: auto;
                    border-radius: 4px;
                    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.15));
                    transition: filter 0.3s ease, transform 0.3s ease;
                }
                .flag-item:hover .flag-img {
                    filter: drop-shadow(0 0 25px rgba(255, 240, 31, 0.5));
                    transform: rotate(3deg);
                }
                .country-name {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    transition: color 0.3s ease;
                }
                .flag-item:hover .country-name {
                    color: var(--neon-yellow);
                }

                @keyframes scrollFlags {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-160px * ${countries.length})); }
                }

                @media (max-width: 768px) {
                    .flag-img { width: 45px; }
                    .flag-item { width: 120px; }
                    @keyframes scrollFlags {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-120px * ${countries.length})); }
                    }
                }
            `}</style>
        </section>
    );
};

export default CountryFlags;
