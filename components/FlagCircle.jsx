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

const FlagCircle = () => {
    return (
        <div className="flag-circle-wrapper">
            <div className="globe-center">
                <i className="fa-solid fa-earth-americas"></i>
                <span className="globe-text">GLOBAL</span>
            </div>
            
            <div className="flag-circle">
                {countries.map((country, i) => {
                    const angle = (i / countries.length) * 360;
                    return (
                        <div 
                            key={i} 
                            className="flag-orbit-item"
                            style={{
                                transform: `rotate(${angle}deg) translate(var(--orbit-radius))`
                            }}
                        >
                            <div className="counter-spin">
                                <div style={{ transform: `rotate(-${angle}deg)` }} className="flag-img-container">
                                    <img 
                                        src={`https://flagcdn.com/w160/${country.code}.png`} 
                                        alt={country.name}
                                        className="flag-circle-img"
                                        title={country.name}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <style jsx>{`
                .flag-circle-wrapper {
                    position: relative;
                    width: 550px;
                    height: 550px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 80px auto 60px;
                    --orbit-radius: 250px;
                }
                
                .globe-center {
                    position: absolute;
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,240,31,0.2) 0%, rgba(255,240,31,0.05) 100%);
                    border: 2px solid rgba(255,240,31,0.5);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: var(--neon-yellow);
                    box-shadow: 0 0 30px rgba(255,240,31,0.3);
                    z-index: 5;
                }
                
                .globe-center i {
                    font-size: 2.8rem;
                    margin-bottom: 5px;
                    filter: drop-shadow(0 0 10px rgba(255,240,31,0.8));
                }
                
                .globe-text {
                    font-size: 0.7rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    font-family: var(--font-accent);
                }

                .flag-circle {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    border: 1px dashed rgba(255, 255, 255, 0.15);
                    animation: spin 40s linear infinite;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 4;
                }
                
                /* Outer glowing ring */
                .flag-circle::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    box-shadow: inset 0 0 40px rgba(57, 255, 20, 0.05);
                    pointer-events: none;
                }

                .flag-orbit-item {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    top: 50%;
                    left: 50%;
                    margin-top: -25px;
                    margin-left: -25px;
                }
                
                .counter-spin {
                    width: 100%;
                    height: 100%;
                    animation: counterSpin 40s linear infinite;
                }
                
                .flag-img-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease;
                }
                
                .flag-circle-img {
                    width: 60px;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .flag-circle-img:hover {
                    transform: scale(1.3);
                    filter: drop-shadow(0 0 15px rgba(255, 240, 31, 0.8));
                    z-index: 10;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes counterSpin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                
                @media (max-width: 768px) {
                    .flag-circle-wrapper {
                        width: 340px;
                        height: 340px;
                        margin: 40px auto 20px;
                        --orbit-radius: 150px;
                        transform: scale(0.9);
                    }
                    .flag-circle {
                        width: 300px;
                        height: 300px;
                    }
                    .globe-center {
                        width: 100px;
                        height: 100px;
                    }
                    .globe-center i {
                        font-size: 2rem;
                    }
                    .flag-circle-img {
                        width: 45px;
                    }
                }
            `}</style>
        </div>
    );
};

export default FlagCircle;
