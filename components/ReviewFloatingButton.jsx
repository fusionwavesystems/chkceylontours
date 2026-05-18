"use client";

import React, { useState } from 'react';
import ReviewFormModal from './ReviewFormModal';

const ReviewFloatingButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="review-float-btn"
                aria-label="Give us a review"
            >
                <i className="fas fa-star" style={{ fontSize: '0.95rem', color: '#000' }}></i>
                <span style={{ 
                    fontFamily: 'var(--font-main)', 
                    fontWeight: '800', 
                    fontSize: '0.82rem', 
                    letterSpacing: '0.5px' 
                }}>Review us</span>

                <style jsx>{`
                    .review-float-btn {
                        position: fixed;
                        bottom: 95px; /* Significantly increased spacing above WhatsApp button */
                        right: 30px;
                        padding: 10px 18px;
                        background: linear-gradient(135deg, #ffc107 0%, #d39e00 100%);
                        color: #000;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        box-shadow: 0 10px 25px rgba(211, 158, 0, 0.3);
                        z-index: 9999;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .review-float-btn:hover {
                        transform: translateY(-3px) scale(1.03);
                        background: linear-gradient(135deg, #ffca2c 0%, #e0a800 100%);
                        box-shadow: 0 15px 30px rgba(211, 158, 0, 0.5);
                    }
                    
                    @media (max-width: 768px) {
                        .review-float-btn {
                            bottom: 85px;
                            right: 20px;
                            padding: 8px 14px;
                        }
                        .review-float-btn span {
                            font-size: 0.75rem !important;
                        }
                    }
                `}</style>
            </button>

            {isModalOpen && (
                <ReviewFormModal onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default ReviewFloatingButton;
