"use client";
import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ end, duration = 2000, suffix = "", isFloat = false }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            if (isFloat) {
                setCount((easeProgress * end).toFixed(1));
            } else {
                setCount(Math.floor(easeProgress * end));
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(isFloat ? end.toFixed(1) : end);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, isVisible, isFloat]);

    return (
        <span ref={countRef}>
            {count}{suffix}
        </span>
    );
};

const StatsCounter = () => {
    return (
        <div className="stats-section reveal">
            <div className="stats-header">
                <span className="stats-subtitle">Trusted Excellence</span>
                <h2>A Legacy of Unforgettable Journeys</h2>
            </div>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><i className="fa-solid fa-award"></i></div>
                    <div className="stat-number">
                        <CountUp end={15} suffix="+" />
                    </div>
                    <div className="stat-label">Years of Experience</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon"><i className="fa-solid fa-earth-americas"></i></div>
                    <div className="stat-number">
                        <CountUp end={35} suffix="+" />
                    </div>
                    <div className="stat-label">Countries Explored</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon"><i className="fa-solid fa-users"></i></div>
                    <div className="stat-number">
                        <CountUp end={1000} suffix="+" />
                    </div>
                    <div className="stat-label">Happy Clients</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon"><i className="fa-solid fa-star"></i></div>
                    <div className="stat-number text-neon">
                        <CountUp end={4.8} isFloat={true} />
                    </div>
                    <div className="stat-label">Average Rating</div>
                </div>
            </div>

            <style jsx>{`
                .stats-section {
                    max-width: 1200px;
                    margin: 0 auto 80px;
                    padding: 0 20px;
                    position: relative;
                }

                .stats-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .stats-subtitle {
                    color: var(--neon-yellow);
                    font-size: 0.9rem;
                    font-weight: 800;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 10px;
                    font-family: var(--font-accent);
                    text-shadow: 0 0 10px rgba(255, 240, 31, 0.3);
                }

                .stats-header h2 {
                    color: #ffffff;
                    font-size: clamp(1.8rem, 4vw, 2.8rem);
                    font-weight: 900;
                    margin: 0;
                    line-height: 1.2;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 30px;
                }

                .stat-card {
                    background: linear-gradient(180deg, rgba(20, 20, 20, 0.9) 0%, rgba(5, 5, 5, 0.95) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    padding: 30px 20px;
                    text-align: center;
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: var(--neon-yellow);
                    box-shadow: 0 0 15px var(--neon-yellow);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.4s ease;
                }

                .stat-card:hover {
                    transform: translateY(-10px);
                    border-color: rgba(255, 240, 31, 0.2);
                    box-shadow: 0 15px 40px rgba(255, 240, 31, 0.1);
                }

                .stat-card:hover::before {
                    transform: scaleX(1);
                }

                .stat-card:nth-child(even)::before {
                    background: var(--neon-green);
                    box-shadow: 0 0 15px var(--neon-green);
                }

                .stat-card:nth-child(even):hover {
                    border-color: rgba(57, 255, 20, 0.2);
                    box-shadow: 0 15px 40px rgba(57, 255, 20, 0.1);
                }
                
                .stat-card:nth-child(even) .stat-icon {
                    color: var(--neon-green);
                    text-shadow: 0 0 15px rgba(57, 255, 20, 0.4);
                }
                
                .stat-card:nth-child(even) .stat-number {
                    color: var(--neon-green);
                    text-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
                }

                .stat-icon {
                    font-size: 2.5rem;
                    color: var(--neon-yellow);
                    margin-bottom: 15px;
                    text-shadow: 0 0 15px rgba(255, 240, 31, 0.4);
                }

                .stat-number {
                    font-size: 3.5rem;
                    font-weight: 900;
                    color: var(--neon-yellow);
                    font-family: var(--font-accent);
                    margin-bottom: 5px;
                    line-height: 1;
                    text-shadow: 0 0 20px rgba(255, 240, 31, 0.3);
                }

                .stat-label {
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 600;
                    opacity: 0.8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                @media (max-width: 992px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 576px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .stat-number {
                        font-size: 3rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default StatsCounter;
