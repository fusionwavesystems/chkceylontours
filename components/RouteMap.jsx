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

export default function RouteMap({ destinationsString, isLarge = false }) {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef(null);

    // Parse destinations from comma-separated string
    const destinations = destinationsString
        ? destinationsString.split(',').map(d => d.trim()).filter(d => d.length > 0)
        : [];

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, [destinations]);

    if (!destinations || destinations.length === 0) return null;

    const points = destinations.map(d => {
        const coords = getCoordinates(d);
        return { name: d, ...coords };
    });

    // Generate SVG path string
    const dPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <div className="route-map-container">
            {/* The base map of Sri Lanka shape */}
            <svg viewBox="-20 -20 440 740" className="sl-map-svg" preserveAspectRatio="xMidYMid meet">
                <SriLankaPaths />
                
                {/* Route Line connecting destinations */}
                {points.length > 1 && (
                    <path
                        ref={pathRef}
                        d={dPath}
                        fill="none"
                        stroke="var(--neon-yellow)"
                        strokeWidth="5"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="route-line-anim"
                    />
                )}

                {/* Plotting Destination Dots */}
                {points.map((pt, i) => (
                    <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="8" fill="var(--neon-green)" className="map-dot-pulse" />
                        <circle cx={pt.x} cy={pt.y} r="4" fill="#fff" />
                        <text 
                            x={pt.x + (pt.x > 200 ? -12 : 12)} 
                            y={pt.y + (pt.y > 350 ? -8 : 8)} 
                            fill="#fff"
                            fontSize="14"
                            fontWeight="800"
                            textAnchor={pt.x > 200 ? 'end' : 'start'}
                            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }}
                        >
                            {pt.name}
                        </text>
                        {/* Order Number */}
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
                    </g>
                ))}
            </svg>

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
