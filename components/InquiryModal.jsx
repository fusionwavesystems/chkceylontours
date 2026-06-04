"use client";

import React, { useState } from 'react';

const InquiryModal = ({ isOpen, onClose, itemName, itemType, themeColor = 'var(--neon-yellow)' }) => {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [guestCount, setGuestCount] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formattedMessage = `Hello CHK Ceylon Tours, I would like to inquire about the ${itemType === 'activity' ? 'activity' : 'tour package'}: *${itemName}*.

Here are my details:
• *Name*: ${name}
• *Contact Number*: ${contactNumber}
• *Guest Count*: ${guestCount}`;

        const whatsappUrl = `https://wa.me/94776981971?text=${encodeURIComponent(formattedMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        onClose();
    };

    // Helper to resolve CSS custom variables to actual hex values for glow filters if needed
    const getGlowColor = (color) => {
        if (color === 'var(--neon-green)' || color === '#39ff14') return 'rgba(57, 255, 20, 0.4)';
        if (color === 'var(--neon-yellow)' || color === '#fff01f') return 'rgba(255, 240, 31, 0.4)';
        if (color === '#dc2626') return 'rgba(220, 38, 38, 0.4)';
        return 'rgba(255, 255, 255, 0.2)';
    };

    const resolvedColor = themeColor === 'var(--neon-green)' ? '#39ff14' : 
                          themeColor === 'var(--neon-yellow)' ? '#fff01f' : 
                          themeColor;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate-pop" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose} aria-label="Close modal">
                    <i className="fas fa-times"></i>
                </button>

                <div className="modal-header">
                    <h2>Inquire Now</h2>
                    <p style={{ margin: '8px 0 0 0', color: 'rgba(255, 255, 255, 0.6)' }}>
                        Please enter your details to inquire about:<br/>
                        <span style={{ color: resolvedColor, fontWeight: 'bold' }}>{itemName}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="inquiry-form">
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input 
                            id="name"
                            type="text" 
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact">Contact Number (WhatsApp)</label>
                        <input 
                            id="contact"
                            type="tel" 
                            placeholder="e.g. +94 77 123 4567"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="guests">Guest Count</label>
                        <input 
                            id="guests"
                            type="number" 
                            min="1"
                            placeholder="e.g. 2"
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        style={{
                            background: resolvedColor,
                            color: resolvedColor === '#fff01f' || resolvedColor === '#39ff14' ? '#000' : '#fff',
                            boxShadow: `0 0 15px ${getGlowColor(themeColor)}`
                        }}
                    >
                        Send to WhatsApp <i className="fa-brands fa-whatsapp" style={{ marginLeft: '8px', fontSize: '1.2rem' }}></i>
                    </button>
                </form>
            </div>

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(10px);
                    z-index: 11000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .modal-content {
                    background: #0d0d0d;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    width: 100%;
                    max-width: 460px;
                    border-radius: 24px;
                    padding: 35px;
                    position: relative;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 40px ${getGlowColor(themeColor)};
                    max-height: 90vh;
                    overflow-y: auto;
                    font-family: 'Outfit', sans-serif;
                }
                .animate-pop {
                    animation: popUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes popUp {
                    0% { transform: scale(0.9) translateY(15px); opacity: 0; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }
                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: rotate(90deg);
                }
                .modal-header h2 {
                    font-size: 1.8rem;
                    color: #fff;
                    margin: 0;
                    font-weight: 800;
                }
                .modal-header p {
                    font-size: 0.95rem;
                    line-height: 1.5;
                }
                .inquiry-form {
                    margin-top: 25px;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.9rem;
                }
                input {
                    width: 100%;
                    padding: 12px 16px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    font-size: 1rem;
                    color: #fff;
                    transition: all 0.25s ease;
                    outline: none;
                }
                input:focus {
                    border-color: ${resolvedColor};
                    background: rgba(255, 255, 255, 0.06);
                    box-shadow: 0 0 10px ${getGlowColor(themeColor)};
                }
                .submit-btn {
                    width: 100%;
                    padding: 14px;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.05rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 20px ${getGlowColor(themeColor)} !important;
                    filter: brightness(1.1);
                }
                .submit-btn:active {
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
};

export default InquiryModal;
