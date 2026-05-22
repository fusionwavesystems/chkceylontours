"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';

const getFeatureIcon = (feature, color, isDark = false) => {
    if (!feature || typeof feature !== 'string') return null;
    const text = feature.toLowerCase();
    let iconClass = "fa-solid fa-location-dot"; // Default travel bullet (no tick-box)
    
    if (text.includes('culture') || text.includes('site') || text.includes('temple') || text.includes('heritage') || text.includes('ancient') || text.includes('unesco') || text.includes('fortress') || text.includes('fort') || text.includes('museum')) {
        iconClass = "fa-solid fa-landmark-dome";
    } else if (text.includes('driver') || text.includes('car') || text.includes('transfer') || text.includes('transport') || text.includes('private') || text.includes('comfort') || text.includes('vehicle') || text.includes('chauffeur') || text.includes('air cond') || text.includes('jeep') || text.includes('4x4') || text.includes('ride') || text.includes('boat')) {
        iconClass = "fa-solid fa-car-rear";
    } else if (text.includes('hotel') || text.includes('resort') || text.includes('stay') || text.includes('accommodation') || text.includes('luxury') || text.includes('villa') || text.includes('glamping') || text.includes('saty')) {
        iconClass = "fa-solid fa-hotel";
    } else if (text.includes('safari') || text.includes('wild') || text.includes('jungle') || text.includes('animal') || text.includes('leopard') || text.includes('elephant') || text.includes('yala') || text.includes('national park') || text.includes('spot') || text.includes('track') || text.includes('crocodile') || text.includes('naturalist')) {
        iconClass = "fa-solid fa-paw";
    } else if (text.includes('beach') || text.includes('coast') || text.includes('sea') || text.includes('whale') || text.includes('surf') || text.includes('fishing') || text.includes('ocean') || text.includes('coral') || text.includes('snorkeling') || text.includes('scuba') || text.includes('river')) {
        iconClass = "fa-solid fa-umbrella-beach";
    } else if (text.includes('hike') || text.includes('trek') || text.includes('mountain') || text.includes('climb') || text.includes('hill') || text.includes('plain') || text.includes('trail') || text.includes('summit') || text.includes('peak') || text.includes('view') || text.includes('nature') || text.includes('village')) {
        iconClass = "fa-solid fa-mountain-sun";
    } else if (text.includes('honeymoon') || text.includes('romance') || text.includes('decor') || text.includes('love') || text.includes('couple')) {
        iconClass = "fa-solid fa-heart";
    } else if (text.includes('dinner') || text.includes('meal') || text.includes('food') || text.includes('drink') || text.includes('fiesta') || text.includes('seafood') || text.includes('breakfast') || text.includes('lunch') || text.includes('tea')) {
        iconClass = "fa-solid fa-utensils";
    } else if (text.includes('tax') || text.includes('taxes') || text.includes('vat') || text.includes('charge') || text.includes('government') || text.includes('fee')) {
        iconClass = "fa-solid fa-file-invoice-dollar";
    } else if (text.includes('guide') || text.includes('chauffeur') || text.includes('guid') || text.includes('speaking') || text.includes('chaufer') || text.includes('instructor')) {
        iconClass = "fa-solid fa-user-tie";
    } else if (text.includes('inclusive') || text.includes('tour') || text.includes('all') || text.includes('immersion') || text.includes('explorer') || text.includes('ticket') || text.includes('entrance') || text.includes('permit')) {
        iconClass = "fa-solid fa-star";
    }

    const iconColor = isDark ? (color === 'var(--neon-green)' ? '#0f766e' : '#b45309') : color;
    const shadowFilter = isDark ? 'none' : `drop-shadow(0 0 3px ${color}77)`;

    return <i className={iconClass} style={{ color: iconColor, marginRight: '10px', fontSize: '0.95rem', filter: shadowFilter }}></i>;
};


const activitiesData = [
    // Wild Safaris
    {
        id: 1,
        name: "Wildlife Safari in Yala National Park",
        category: "safari",
        season: "All Year (Dry Season Best)",
        level: "Adventuresome / Family",
        location: "Yala National Park",
        image: "/Activites/wild_safari.jpg",
        color: "var(--neon-green)",
        tag: "Wild Safari",
        desc: "Embark on a thrilling 4x4 open-top jeep safari in Yala National Park, home to the world's highest density of Sri Lankan leopards, wild Asian elephants, sloth bears, and exotic birds.",
        features: ["Track high-density wild leopards", "Private open-top 4x4 Jeep ride", "Expert naturalist tracker included", "Spot elephants, crocodiles & bears"]
    },
    {
        id: 2,
        name: "Wild Elephant Gathering Safari",
        category: "safari",
        season: "July - October",
        level: "Easy / Family Friendly",
        location: "Minneriya National Park",
        image: "/Activites/elephant.jpg",
        color: "var(--neon-yellow)",
        tag: "Elephant Safari",
        desc: "Witness the spectacular Elephant Gathering at Minneriya Lake, where hundreds of wild elephants congregate to socialize, bathe, and feed in the dry season.",
        features: ["See 300+ wild elephants together", "Scenic sunset lake safaris", "Perfect for wildlife photography", "Safe, close-proximity jeep viewing"]
    },
    // Hiking & Trekking
    {
        id: 3,
        name: "Ella Rock Mountain Hiking",
        category: "hiking",
        season: "All Year",
        level: "Moderate / Challenging",
        location: "Ella Hills (Highlands)",
        image: "/Activites/Ella.jpg",
        color: "var(--neon-green)",
        tag: "Scenic Hiking",
        desc: "Hike up the legendary Ella Rock through misty pine forests, lush green tea fields, and railway paths. Enjoy absolute jaw-dropping panoramic views of the Ella Gap.",
        features: ["Hike through misty pine trees", "Walk along scenic railway lines", "Incredible Ella Gap panoramic views", "Pass local countryside villages"]
    },
    {
        id: 4,
        name: "Sigiriya Lion Rock Fortress Climb",
        category: "hiking",
        season: "All Year (Morning Best)",
        level: "Moderate (1,200 Steps)",
        location: "Sigiriya ancient city",
        image: "/Activites/sigiriya.jpg",
        color: "var(--neon-yellow)",
        tag: "Heritage Hike",
        desc: "Climb the monumental 200-meter-tall Sigiriya Lion Rock Fortress. Explore ancient gardens, royal lion paw gateway, historic mirror wall, and palace ruins.",
        features: ["Climb 1,200 ancient steps", "Grand Lion Paw gateway ruins", "Stunning sky palace gardens", "Panoramic tropical jungle views"]
    },
    // Cycling Tours
    {
        id: 5,
        name: "Ancient Ruins Cycling in Polonnaruwa",
        category: "cycling",
        season: "All Year",
        level: "Leisurely / Easy",
        location: "Polonnaruwa Ancient Kingdom",
        image: "/Activites/cycling.jpg",
        color: "var(--neon-yellow)",
        tag: "Cycling Tour",
        desc: "Pedal your way through the beautifully preserved 1,000-year-old ancient ruins, massive stupas, royal palaces, and giant water reservoirs of the medieval capital.",
        features: ["Ride through 1,000-year ruins", "Explore massive royal brick palaces", "Flat, shaded paths for easy riding", "Quality multi-gear bikes & helmets"]
    },
    {
        id: 6,
        name: "Mountain Tea Trails Countryside Cycling",
        category: "cycling",
        season: "All Year",
        level: "Moderate / Active",
        location: "Ella Tea Estates",
        image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=800&auto=format&fit=crop",
        color: "var(--neon-green)",
        tag: "Mountain Biking",
        desc: "Cycle along winding roads through bright green rolling tea plantations. Encounter local tea pluckers, cycle past misty waterfalls, and enjoy fresh mountain air.",
        features: ["Ride through endless tea fields", "Breath-taking misty mountain roads", "Encounter local tea estates", "Premium mountain bikes provided"]
    },
    // Water Sports
    {
        id: 7,
        name: "Reef Diving & Snorkeling in Hikkaduwa",
        category: "water",
        season: "November - April",
        level: "Beginner & Certified",
        location: "Hikkaduwa Marine Sanctuary",
        image: "/Activites/diving.jpg",
        color: "var(--neon-green)",
        tag: "Water Sports",
        desc: "Explore the breathtaking underwater world and marine sanctuary of Hikkaduwa. Swim alongside giant green sea turtles, vibrant coral gardens, and exotic tropical reef fish.",
        features: ["Swim with giant green sea turtles", "Explore vibrant coral gardens", "Certified PADI instructor guiding", "All premium snorkeling & scuba gear included"]
    },
    {
        id: 8,
        name: "Surfing in Arugam Bay",
        category: "water",
        season: "April - October",
        level: "Beginner to Expert",
        location: "Arugam Bay Waves",
        image: "/Activites/Surfing-in-Sri-Lanka.jpg",
        color: "var(--neon-yellow)",
        tag: "Surfing Pro",
        desc: "Ride the legendary waves at Arugam Bay, a world-renowned surf point offering long peeling right-hand breaks, soft beach breaks, and dynamic surf camps.",
        features: ["Long peeling right-hand waves", "Surf boards & equipment rentals", "Certified surf coach lessons", "Vibrant, relaxed beach culture"]
    }
];

const ImageLightbox = ({ src, onClose }) => {
    if (!src) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out'
        }} onClick={onClose}>
            <div style={{ position: 'absolute', top: '25px', right: '35px', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <img 
                src={src} 
                alt="Enlarged view" 
                style={{ 
                    maxWidth: '90%', 
                    maxHeight: '85%', 
                    objectFit: 'contain', 
                    borderRadius: '8px',
                    boxShadow: '0 0 30px rgba(255,255,255,0.1)'
                }} 
            />
        </div>
    );
};

export default function ActivitiesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const { data, error } = await supabase.from('activities').select('*').order('created_at', { ascending: false });
                if (error) {
                    console.error('Error fetching activities:', error);
                    setActivities(activitiesData);
                } else if (data && data.length > 0) {
                    // Map database columns to support UI conventions
                    const mapped = data.map(act => ({
                        ...act,
                        desc: act.description || act.desc,
                        features: Array.isArray(act.features) ? act.features : []
                    }));
                    setActivities(mapped);
                } else {
                    setActivities(activitiesData);
                }
            } catch (err) {
                console.error(err);
                setActivities(activitiesData);
            }
        };

        fetchActivities();
    }, []);

    const filteredActivities = selectedCategory === 'all' 
        ? activities 
        : activities.filter(act => act.category === selectedCategory);

    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', overflow: 'hidden' }}>
            {/* Header / Hero Section */}
            <section style={{
                height: '60vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 20px',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 100%), url("/act.png") center/cover no-repeat'
            }}>
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', paddingTop: '80px' }}>
                    <h1 className="reveal active" style={{ 
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
                        textShadow: '1px 1px 12px rgba(0, 0, 0, 0.8)',
                        fontFamily: 'var(--font-main)',
                        fontWeight: '700',
                        textTransform: 'none',
                        letterSpacing: '0.5px',
                        margin: 0
                    }}>Activities to Do</h1>
                    <p style={{ 
                        color: 'var(--neon-yellow)', 
                        fontSize: '1.2rem', 
                        fontWeight: '700', 
                        marginTop: '10px',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-accent)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                    }}>Things to Do in Sri Lanka</p>
                    <p style={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        fontSize: '0.95rem', 
                        fontWeight: '500', 
                        marginTop: '12px',
                        maxWidth: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontFamily: 'var(--font-main)',
                        textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                        lineHeight: '1.6'
                    }}>
                        Discover thrilling wildlife safari drives, scenic mountain hikes, heritage cycling trails, and active water sports. <span style={{ color: 'var(--neon-green)', fontWeight: '700', textShadow: '0 0 10px rgba(57,255,20,0.3)' }}>Explore our high-quality activity collection.</span>
                    </p>
                </div>
            </section>

            {/* Background decorative blobs */}
            <div className="bg-blob" style={{ top: '25%', left: '-10%', width: '800px', height: '800px' }}></div>
            <div className="bg-blob" style={{ top: '65%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(57, 255, 20, 0.05) 0%, transparent 70%)' }}></div>

            <Navbar />

            {/* Main Listing & Filters Container */}
            <div className="container" style={{ 
                padding: '80px 20px 100px 20px', 
                position: 'relative', 
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 auto'
            }}>
                {/* Category Filters */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '60px' }}>
                    {[
                        { id: 'all', label: 'All Activities' },
                        { id: 'safari', label: 'Wild Safaris' },
                        { id: 'hiking', label: 'Hiking & Trekking' },
                        { id: 'cycling', label: 'Cycling Tours' },
                        { id: 'water', label: 'Water Sports' }
                    ].map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '30px',
                                background: selectedCategory === cat.id ? 'var(--gradient-vibrant)' : 'rgba(255, 255, 255, 0.03)',
                                border: `1px solid ${selectedCategory === cat.id ? 'var(--neon-green)' : 'rgba(255, 255, 255, 0.1)'}`,
                                color: selectedCategory === cat.id ? '#000' : '#fff',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                fontFamily: 'var(--font-accent)',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                boxShadow: selectedCategory === cat.id ? '0 0 15px rgba(57, 255, 20, 0.3)' : 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                            className="filter-btn"
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid Listing */}
                <div className="activities-grid">
                    {filteredActivities.map((act) => {
                        return (
                            <div key={act.id} className="custom-act-card" style={{
                                border: `2px solid ${act.color}`,
                                position: 'relative'
                            }}>
                                {/* Floating Category/Difficulty Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-14px',
                                    left: '20px',
                                    background: 'rgba(220, 38, 38, 0.95)',
                                    color: '#fff',
                                    padding: '4px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.78rem',
                                    fontWeight: '900',
                                    fontFamily: 'var(--font-accent)',
                                    boxShadow: '0 0 12px rgba(220, 38, 38, 0.5)',
                                    zIndex: 10,
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase'
                                }}>
                                    {act.category === 'safari' ? 'Wild Safaris' : act.category === 'hiking' ? 'Hiking & Trekking' : act.category === 'cycling' ? 'Cycling Tours' : act.category === 'water' ? 'Water Sports' : act.category}
                                </div>

                                {/* Header with title and color indicator */}
                                <div style={{ 
                                    padding: '22px 28px', 
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '15px',
                                    borderTopLeftRadius: '22px',
                                    borderTopRightRadius: '22px'
                                }}>
                                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                                        <h3 style={{ 
                                            fontSize: '1.35rem', 
                                            color: '#fff', 
                                            margin: '0 0 8px 0',
                                            fontWeight: '800',
                                            fontFamily: 'var(--font-accent)',
                                            lineHeight: '1.25'
                                        }}>{act.name}</h3>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <span style={{
                                                background: `${act.color}15`,
                                                border: `1px solid ${act.color}44`,
                                                color: act.color,
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.68rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                display: 'inline-block'
                                            }}>
                                                {act.location}
                                            </span>
                                            {act.tag && (
                                                <span style={{
                                                    background: 'rgba(255, 255, 255, 0.08)',
                                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.68rem',
                                                    fontWeight: '800',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    display: 'inline-block'
                                                }}>
                                                    {act.tag}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Activity Cover Image */}
                                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedImage(act.image)}>
                                    <img src={act.image} alt={act.name} className="custom-act-img" />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '60%',
                                        background: 'linear-gradient(to top, rgba(12, 12, 12, 1) 0%, transparent 100%)',
                                        zIndex: 1
                                    }}></div>
                                </div>

                                 {/* Card Body Content */}
                                 <div style={{ 
                                     padding: '25px 30px 30px 30px', 
                                     flexGrow: 1, 
                                     display: 'flex', 
                                     flexDirection: 'column',
                                     backgroundColor: '#ffffff',
                                     borderBottomLeftRadius: '22px',
                                     borderBottomRightRadius: '22px'
                                 }}>
                                     <p style={{
                                         color: '#1f2937',
                                         fontSize: '0.92rem',
                                         lineHeight: '1.6',
                                         margin: '0 0 20px 0',
                                         fontFamily: 'var(--font-main)',
                                         fontWeight: '500'
                                     }}>
                                         {act.desc}
                                     </p>

                                     {/* Highlights Checklist */}
                                     <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 25px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                         {act.features.map((feat, fIdx) => (
                                             <li key={fIdx} style={{
                                                 color: '#1f2937',
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 fontSize: '0.88rem',
                                                 fontFamily: 'var(--font-main)',
                                                 fontWeight: '600'
                                             }}>
                                                 {getFeatureIcon(feat, act.color, true)}
                                                 {feat}
                                             </li>
                                         ))}
                                     </ul>

                                     {/* Parameter Grid Info */}
                                     <div style={{
                                         display: 'grid',
                                         gridTemplateColumns: '1fr 1fr',
                                         gap: '12px',
                                         padding: '15px',
                                         borderRadius: '12px',
                                         background: 'rgba(0, 0, 0, 0.04)',
                                         border: '1px solid rgba(0, 0, 0, 0.08)',
                                         marginBottom: '25px'
                                     }}>
                                         <div>
                                             <span style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: '600' }}>Best Season</span>
                                             <span style={{ fontSize: '0.82rem', color: '#1f2937', fontWeight: '800', fontFamily: 'var(--font-accent)' }}>{act.season}</span>
                                         </div>
                                         <div>
                                             <span style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: '600' }}>Level / Pace</span>
                                             <span style={{ fontSize: '0.82rem', color: '#1f2937', fontWeight: '800', fontFamily: 'var(--font-accent)' }}>{act.level}</span>
                                         </div>
                                     </div>

                                     {/* Action Booking Button */}
                                     <a href={`https://wa.me/94771234567?text=I'm%20extremely%20interested%20in%20booking%20the%20${encodeURIComponent(act.name)}%20activity%20with%20CHK%20Ceylon%20Tours!`}
                                         className="custom-act-btn"
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         style={{
                                             background: `linear-gradient(135deg, ${act.color} 0%, ${act.color === 'var(--neon-green)' ? '#15b300' : '#ffb300'} 100%)`,
                                             color: '#000',
                                             boxShadow: `0 4px 15px ${act.color}33`,
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             padding: '14px',
                                             borderRadius: '12px',
                                             fontWeight: '800',
                                             fontSize: '0.95rem',
                                             fontFamily: 'var(--font-accent)',
                                             textTransform: 'uppercase',
                                             letterSpacing: '0.5px',
                                             textDecoration: 'none',
                                             gap: '10px',
                                             transition: 'all 0.3s ease',
                                             marginTop: 'auto'
                                         }}>
                                         Enquire This Activity
                                         <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.85rem' }}></i>
                                     </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
            <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />

            {/* Custom Interactive Stylesheet */}
            <style jsx>{`
                .activities-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 40px;
                    justify-content: center;
                    width: 100%;
                    max-width: 1300px;
                    margin: 0 auto;
                }

                .custom-act-card {
                    background: linear-gradient(135deg, rgba(12, 12, 12, 0.98) 0%, rgba(3, 3, 3, 1) 100%);
                    border-radius: 24px;
                    overflow: visible;
                    display: flex;
                    flex-direction: column;
                    min-height: 600px;
                    width: 100%;
                    max-width: 380px;
                    min-width: 320px;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .custom-act-card:hover {
                    transform: translateY(-12px) scale(1.025);
                }

                /* Active border and glow effects on hover */
                .custom-act-card[style*="var(--neon-yellow)"]:hover {
                    border-color: var(--neon-yellow) !important;
                    box-shadow: 0 25px 50px rgba(255, 240, 31, 0.25),
                                0 0 30px rgba(255, 240, 31, 0.12) !important;
                }

                .custom-act-card[style*="var(--neon-green)"]:hover {
                    border-color: var(--neon-green) !important;
                    box-shadow: 0 25px 50px rgba(57, 255, 20, 0.25),
                                0 0 30px rgba(57, 255, 20, 0.12) !important;
                }

                .custom-act-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .custom-act-card:hover .custom-act-img {
                    transform: scale(1.08);
                }

                .custom-act-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15) !important;
                }

                .custom-act-btn:hover i {
                    transform: translateX(4px) translateY(-2px);
                }

                .filter-btn:hover {
                    transform: translateY(-2px);
                    border-color: rgba(255, 255, 255, 0.35) !important;
                    background: rgba(255, 255, 255, 0.06);
                }

                @media (max-width: 768px) {
                    .activities-grid {
                        grid-template-columns: 1fr;
                        max-width: 480px;
                    }
                    .custom-act-card {
                        min-height: auto;
                    }
                }
            `}</style>
        </div>
    );
}
