"use client";
import React from 'react';

const TrustedMap = () => {
    return (
        <div className="global-trusted-section reveal">
            <div className="trusted-header">
                <i className="fa-solid fa-map-location-dot"></i>
                <div>
                    <h4 style={{ color: 'var(--neon-yellow)', margin: '0 0 5px 0', fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Global Travelers
                    </h4>
                    <p style={{ color: '#fff', margin: 0, fontSize: '1.1rem', fontWeight: '400', opacity: 0.9 }}>
                        Tourists from all over the world have come, enjoyed, and trusted our exceptional service.
                    </p>
                </div>
            </div>
            
            <div className="map-container">
                {/* Yellow SVG World Map Background via mask-image */}
                <div className="world-map-bg"></div>

                {/* Map Pointers Representation */}
                <div className="map-pointers-wrapper">
                    {/* Dots representing countries */}
                    {/* North America */}
                    <div className="map-dot" style={{ top: '35%', left: '22%' }}></div>
                    <div className="map-dot" style={{ top: '38%', left: '18%' }}></div>
                    <div className="map-dot" style={{ top: '32%', left: '26%' }}></div>
                    <div className="map-dot" style={{ top: '25%', left: '20%' }}></div> {/* Canada */}
                    
                    {/* South America */}
                    <div className="map-dot" style={{ top: '65%', left: '30%' }}></div>
                    <div className="map-dot" style={{ top: '55%', left: '28%' }}></div> {/* Colombia/Peru */}
                    <div className="map-dot" style={{ top: '72%', left: '32%' }}></div> {/* Argentina/Chile */}
                    
                    {/* Europe */}
                    <div className="map-dot" style={{ top: '28%', left: '48%' }}></div> {/* UK/France */}
                    <div className="map-dot" style={{ top: '25%', left: '50%' }}></div> {/* Germany/Nordics */}
                    <div className="map-dot" style={{ top: '32%', left: '52%' }}></div> {/* Romania/Balkans */}
                    <div className="map-dot" style={{ top: '29%', left: '45%' }}></div> {/* Spain */}
                    <div className="map-dot" style={{ top: '30%', left: '55%' }}></div> {/* Russia (West) */}
                    
                    {/* Africa */}
                    <div className="map-dot" style={{ top: '45%', left: '48%' }}></div> {/* North Africa */}
                    <div className="map-dot" style={{ top: '68%', left: '52%' }}></div> {/* South Africa */}
                    <div className="map-dot" style={{ top: '55%', left: '55%' }}></div> {/* East Africa */}
                    
                    {/* Middle East & Central Asia */}
                    <div className="map-dot" style={{ top: '42%', left: '60%' }}></div> {/* UAE/Iraq */}
                    <div className="map-dot" style={{ top: '35%', left: '62%' }}></div> {/* Central Asia */}
                    
                    {/* Asia */}
                    <div className="map-dot" style={{ top: '48%', left: '65%' }}></div> {/* India */}
                    <div className="map-dot" style={{ top: '38%', left: '75%' }}></div> {/* China */}
                    <div className="map-dot" style={{ top: '40%', left: '85%' }}></div> {/* Japan */}
                    <div className="map-dot" style={{ top: '45%', left: '80%' }}></div> {/* South Korea/Taiwan */}
                    <div className="map-dot" style={{ top: '52%', left: '78%' }}></div> {/* SE Asia (Thai/Vietnam) */}
                    <div className="map-dot" style={{ top: '58%', left: '82%' }}></div> {/* Indonesia/Philippines */}
                    
                    {/* Oceania */}
                    <div className="map-dot" style={{ top: '75%', left: '82%' }}></div> {/* Australia West */}
                    <div className="map-dot" style={{ top: '80%', left: '88%' }}></div> {/* Australia East */}
                    <div className="map-dot" style={{ top: '82%', left: '92%' }}></div> {/* New Zealand */}
                    
                    {/* Sri Lanka Active Pulse */}
                    <div className="map-dot active-dot" style={{ top: '55%', left: '68%' }}>
                        <div className="dot-pulse"></div>
                    </div> 
                </div>
            </div>

            <style jsx>{`
                .global-trusted-section {
                    position: relative;
                    max-width: 1000px;
                    margin: 60px auto 40px;
                    padding: 40px 30px;
                    background: linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(5, 5, 5, 0.98) 100%);
                    border-radius: 30px;
                    border: 1px solid rgba(255, 240, 31, 0.2);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 30px rgba(255, 240, 31, 0.05);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    overflow: hidden;
                    z-index: 10;
                }

                .trusted-header {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    text-align: center;
                    margin-bottom: 30px;
                    flex-direction: column;
                }

                .trusted-header i {
                    font-size: 2.5rem;
                    color: var(--neon-yellow);
                    filter: drop-shadow(0 0 15px rgba(255, 240, 31, 0.4));
                }

                .map-container {
                    position: relative;
                    width: 100%;
                    max-width: 800px;
                    height: 400px;
                    margin: 0 auto 30px;
                }

                .world-map-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--neon-yellow);
                    -webkit-mask-image: url('/world-map.svg');
                    mask-image: url('/world-map.svg');
                    -webkit-mask-size: contain;
                    mask-size: contain;
                    -webkit-mask-position: center;
                    mask-position: center;
                    -webkit-mask-repeat: no-repeat;
                    mask-repeat: no-repeat;
                    opacity: 0.25; /* Soft glowing yellow map */
                }

                .map-pointers-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .map-dot {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: var(--neon-green);
                    border-radius: 50%;
                    box-shadow: 0 0 10px var(--neon-green), 0 0 20px rgba(57,255,20,0.5);
                    transform: translate(-50%, -50%);
                }

                .active-dot {
                    background: var(--neon-yellow);
                    width: 12px;
                    height: 12px;
                    box-shadow: 0 0 15px var(--neon-yellow), 0 0 30px rgba(255,240,31,0.8);
                }

                .dot-pulse {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 30px;
                    height: 30px;
                    margin-top: -15px;
                    margin-left: -15px;
                    border-radius: 50%;
                    border: 2px solid var(--neon-yellow);
                    animation: pulseDot 2s infinite ease-out;
                }

                @keyframes pulseDot {
                    0% { transform: scale(0.5); opacity: 1; }
                    100% { transform: scale(2.5); opacity: 0; }
                }

                @media (max-width: 768px) {
                    .global-trusted-section {
                        margin: 40px 20px 20px;
                        padding: 30px 15px;
                    }
                    .map-container {
                        height: 250px;
                    }
                }
            `}</style>
        </div>
    );
};

export default TrustedMap;
