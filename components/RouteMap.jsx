"use client";
import React, { useEffect, useState, useRef } from 'react';

import SriLankaPaths from './SriLankaPaths';

// Accurate coordinates for Highcharts Sri Lanka Map (viewBox ~ 0 0 420 700)
const LOCATIONS = {
    'colombo': { x: 80, y: 520 },
    'negombo': { x: 75, y: 480 },
    'kandy': { x: 190, y: 440 },
    'sigiriya': { x: 195, y: 340 },
    'dambulla': { x: 190, y: 350 },
    'anuradhapura': { x: 145, y: 250 },
    'polonnaruwa': { x: 235, y: 310 },
    'trincomalee': { x: 280, y: 220 },
    'galle': { x: 110, y: 640 },
    'mirissa': { x: 140, y: 660 },
    'matara': { x: 155, y: 670 },
    'tangalle': { x: 190, y: 665 },
    'hambantota': { x: 240, y: 645 },
    'yala': { x: 310, y: 615 },
    'udawalawe': { x: 215, y: 585 },
    'ella': { x: 230, y: 510 },
    'nuwara eliya': { x: 180, y: 495 },
    'jaffna': { x: 80, y: 40 },
    'arugam bay': { x: 360, y: 470 },
    'batticaloa': { x: 320, y: 360 },
    'bentota': { x: 85, y: 590 },
    'hikkaduwa': { x: 90, y: 620 },
    'pinnawala': { x: 140, y: 450 },
    'kitulgala': { x: 145, y: 490 }
};

const getCoordinates = (locName) => {
    const key = locName.toLowerCase().trim();
    if (LOCATIONS[key]) return LOCATIONS[key];
    // Fallback: search for partial match
    for (const [name, coords] of Object.entries(LOCATIONS)) {
        if (key.includes(name) || name.includes(key)) return coords;
    }
    // Default fallback if not found
    return { x: 200, y: 350 }; 
};

export default function RouteMap({ destinationsString, isLarge = false, isAllDestinations = false, isProvincesMap = false, provinces = [], provinceCounts = {}, onProvinceClick }) {
    const [pathLength, setPathLength] = useState(0);
    const [zoom, setZoom] = useState(1);
    const pathRef = useRef(null);

    // Accurate coordinates and distinct colors for Provinces
    const PROVINCE_COORDS = {
        'western': { x: 70, y: 530, color: '#00e5ff' },    // Neon Blue
        'central': { x: 190, y: 440, color: '#ff9100' },   // Neon Orange
        'southern': { x: 160, y: 650, color: '#ff007f' },  // Neon Pink
        'uva': { x: 250, y: 530, color: '#39ff14' },       // Neon Green
        'sabaragamuwa': { x: 150, y: 560, color: '#b000ff' }, // Neon Purple
        'nwp': { x: 110, y: 390, color: '#fff01f' },       // Neon Yellow
        'ncp': { x: 190, y: 280, color: '#00ffcc' },       // Teal/Cyan
        'ep': { x: 310, y: 340, color: '#ff003c' },        // Crimson Red
        'np': { x: 140, y: 150, color: '#ff00ff' }         // Magenta
    };

    // Parse destinations from comma-separated string
    let destinations = destinationsString
        ? destinationsString.split(',').map(d => d.trim()).filter(d => d.length > 0)
        : [];
        
    if (isAllDestinations && destinations.length === 0) {
        destinations = Object.keys(LOCATIONS);
    }

    const points = isProvincesMap ? provinces.map(p => ({
        id: p.id,
        name: p.name,
        count: provinceCounts[p.id] || 0,
        ...(PROVINCE_COORDS[p.id] || { x: 200, y: 350, color: 'var(--neon-yellow)' })
    })) : destinations.map(d => {
        const coords = getCoordinates(d);
        return { name: d, ...coords };
    });

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, [destinations, isProvincesMap]);

    if (!isProvincesMap && !isAllDestinations && (!destinations || destinations.length === 0)) return null;

    // Generate SVG path string for routes
    const dPath = (!isAllDestinations && !isProvincesMap) ? points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') : '';

    return (
        <div className={`route-map-container ${isProvincesMap ? 'provinces-layout' : ''}`}>
            {/* Sri Lanka Geographic Shape Path */}
            <div className="map-svg-wrapper">
                {/* Zoom Controls */}
                <div className="zoom-controls">
                    <button className="zoom-btn" onClick={() => setZoom(z => Math.min(z + 0.3, 3))} title="Zoom In">
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="zoom-btn" onClick={() => setZoom(z => Math.max(z - 0.3, 1))} title="Zoom Out">
                        <i className="fa-solid fa-minus"></i>
                    </button>
                    <button className="zoom-btn" onClick={() => setZoom(1)} title="Reset Zoom">
                        <i className="fa-solid fa-compress"></i>
                    </button>
                </div>
            
            <svg 
                viewBox="-20 -20 440 740" 
                className="sl-map-svg" 
                preserveAspectRatio="xMidYMid meet"
                style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease', transformOrigin: 'center center' }}
            >
                <defs>
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--neon-yellow)" />
                        <stop offset="100%" stopColor="#ff00ff" />
                    </linearGradient>
                </defs>
                <SriLankaPaths />
                
                {/* Route Line connecting destinations */}
                {(!isAllDestinations && !isProvincesMap && points.length > 1) && (
                    <>
                        <path
                            id="mainRoutePath"
                            ref={pathRef}
                            d={dPath}
                            fill="none"
                            stroke={pathLength > 0 ? "url(#neonGradient)" : "none"}
                            strokeWidth="3"
                            style={pathLength > 0 ? {
                                strokeDasharray: pathLength,
                                strokeDashoffset: pathLength,
                                animation: `drawPath ${points.length * 1.5}s linear forwards`
                            } : {}}
                        />
                        {/* 3D Car following the route */}
                        {pathLength > 0 && (
                            <g>
                                <g transform="rotate(90) scale(0.6)">
                                    {/* Car Shadow */}
                                    <rect x="-12" y="-22" width="24" height="44" rx="6" fill="rgba(0,0,0,0.5)" filter="blur(2px)" />
                                    {/* Car Body */}
                                    <rect x="-10" y="-20" width="20" height="40" rx="5" fill="#dc2626" />
                                    {/* Roof / Windows */}
                                    <rect x="-8" y="-10" width="16" height="20" rx="2" fill="#111" />
                                    {/* Windshield */}
                                    <path d="M-8 -10 L8 -10 L6 -14 L-6 -14 Z" fill="#66ccff" opacity="0.6" />
                                    {/* Back Window */}
                                    <path d="M-8 10 L8 10 L6 14 L-6 14 Z" fill="#66ccff" opacity="0.6" />
                                    {/* Headlights */}
                                    <circle cx="-6" cy="-19" r="1.5" fill="#fff" filter="drop-shadow(0 -2px 4px var(--neon-yellow))" />
                                    <circle cx="6" cy="-19" r="1.5" fill="#fff" filter="drop-shadow(0 -2px 4px var(--neon-yellow))" />
                                    {/* Taillights */}
                                    <circle cx="-6" cy="19" r="1.5" fill="#ff0000" />
                                    <circle cx="6" cy="19" r="1.5" fill="#ff0000" />
                                </g>
                                <animateMotion
                                    dur={`${points.length * 1.5}s`}
                                    repeatCount="1"
                                    rotate="auto"
                                    fill="freeze"
                                >
                                    <mpath href="#mainRoutePath" />
                                </animateMotion>
                            </g>
                        )}
                    </>
                )}

                {/* Plotting Destination Dots */}
                {points.map((pt, i) => (
                    <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r={isProvincesMap ? "18" : "8"} fill={isProvincesMap ? `${pt.color}44` : "var(--neon-green)"} className="map-dot-pulse" style={isProvincesMap ? { cursor: 'pointer', animationDuration: '3s' } : {}} onClick={() => isProvincesMap && onProvinceClick && onProvinceClick(pt.id)} />
                        <circle cx={pt.x} cy={pt.y} r={isProvincesMap ? "12" : "4"} fill={isProvincesMap ? pt.color : "#fff"} style={isProvincesMap ? { cursor: 'pointer' } : {}} onClick={() => isProvincesMap && onProvinceClick && onProvinceClick(pt.id)} />
                        
                        {!isProvincesMap && (
                            <text 
                                x={pt.x + (pt.x > 200 ? -15 : 15)} 
                                y={pt.y + (pt.y > 350 ? -8 : 8)} 
                                fill="#fff"
                                fontSize="14"
                                fontWeight="800"
                                textAnchor={pt.x > 200 ? 'end' : 'start'}
                                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }}
                            >
                                {pt.name}
                            </text>
                        )}
                        
                        {/* Provinces Number Inside Dot */}
                        {isProvincesMap && (
                            <text
                                x={pt.x} 
                                y={pt.y + 6} 
                                fill="#000"
                                fontSize="16"
                                fontWeight="900"
                                textAnchor="middle"
                                style={{ pointerEvents: 'none', filter: 'drop-shadow(0px 1px 2px rgba(255,255,255,0.8))' }}
                            >
                                {i + 1}
                            </text>
                        )}
                        
                        {/* Order Number (Hidden if all destinations or provinces) */}
                        {!isAllDestinations && !isProvincesMap && (
                            <text
                                x={pt.x}
                                y={pt.y - 12}
                                fill="var(--neon-yellow)"
                                fontSize="12"
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {i + 1}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
            </div>

            {isProvincesMap && (
                <div className="provinces-legend">
                    <div className="click-hint">
                        <i className="fa-solid fa-hand-pointer" style={{ animation: 'pointBounce 1.5s infinite' }}></i> 
                        Click a Number to Explore!
                    </div>
                    <h4 style={{ color: 'var(--neon-yellow)', marginBottom: '15px', fontFamily: 'var(--font-accent)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Provinces</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {points.map((pt, i) => (
                            <li key={i} className="legend-item" onClick={() => onProvinceClick(pt.id)}>
                                <span className="legend-number" style={{ background: pt.color }}>{i + 1}</span>
                                <span className="legend-name">{pt.name}</span>
                                <span className="legend-count" style={{ color: pt.color }}>({pt.count} Places)</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <style jsx>{`
                .route-map-container {
                    position: relative;
                    width: 100%;
                    max-width: ${isLarge ? '600px' : '300px'};
                    height: ${isLarge ? '80vh' : '450px'};
                    margin: 0 auto;
                    background: linear-gradient(180deg, rgba(15,15,15,0.8), rgba(0,0,0,0.9));
                    border: 1px solid rgba(255,240,31,0.15);
                    border-radius: 20px;
                    padding: 15px;
                    box-shadow: inset 0 0 20px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.5);
                }

                .provinces-layout {
                    display: flex;
                    align-items: center;
                    max-width: 800px; /* Wider for legend */
                    height: auto;
                    min-height: 500px;
                    padding: 30px;
                    gap: 40px;
                }

                .map-svg-wrapper {
                    flex: 1;
                    height: 100%;
                    min-height: 450px;
                    position: relative;
                    overflow: hidden;
                    border-radius: 15px;
                }

                .zoom-controls {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    z-index: 10;
                }

                .zoom-btn {
                    width: 35px;
                    height: 35px;
                    border-radius: 8px;
                    background: rgba(0,0,0,0.7);
                    border: 1px solid var(--neon-yellow);
                    color: var(--neon-yellow);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .zoom-btn:hover {
                    background: var(--neon-yellow);
                    color: #000;
                    transform: scale(1.1);
                }

                .provinces-legend {
                    flex: 1;
                    background: rgba(0,0,0,0.4);
                    border-radius: 15px;
                    padding: 25px;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    color: #fff;
                    font-size: 0.95rem;
                    padding: 8px 12px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    background: rgba(255,255,255,0.02);
                }

                .legend-item:hover {
                    background: rgba(255,240,31,0.1);
                    transform: translateX(5px);
                }

                .legend-number {
                    color: #000;
                    background: var(--neon-yellow);
                    font-weight: 800;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    margin-right: 12px;
                    font-size: 0.8rem;
                }

                .legend-name {
                    font-weight: 600;
                    flex-grow: 1;
                }

                .legend-count {
                    color: var(--neon-green);
                    font-size: 0.8rem;
                    font-weight: 700;
                    opacity: 0.9;
                }

                .click-hint {
                    color: #fff;
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255, 240, 31, 0.15);
                    padding: 8px 15px;
                    border-radius: 50px;
                    border: 1px solid rgba(255, 240, 31, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                @keyframes pointBounce {
                    0%, 100% { transform: translateY(0) scale(1.1); color: var(--neon-yellow); }
                    50% { transform: translateY(-5px) scale(1.1); color: #fff; }
                }
                
                @keyframes drawPath {
                    to { stroke-dashoffset: 0; }
                }

                @media (max-width: 768px) {
                    .provinces-layout {
                        flex-direction: column;
                        padding: 15px;
                        gap: 20px;
                    }
                    .map-svg-wrapper {
                        min-height: 350px;
                    }
                }

                .sl-map-svg {
                    width: 100%;
                    height: 100%;
                    overflow: visible;
                }

                .route-line-anim {
                    animation: drawRoute 3s ease-out forwards;
                    filter: drop-shadow(0 0 4px var(--neon-yellow));
                }

                .map-dot-pulse {
                    animation: pulseDot 2s infinite ease-out;
                    transform-origin: center;
                }

                @keyframes drawRoute {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes pulseDot {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(2.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 0; }
                }
            `}</style>
        </div>
    );
}
