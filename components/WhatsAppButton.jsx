"use client";

import React from 'react';

const WhatsAppButton = () => {
    return (
        <a 
            href="https://wa.me/94776981971" 
            className="float-wp pulse-glow" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
        >
            <i className="fab fa-whatsapp" style={{ fontSize: '1.8rem' }}></i>

            <style jsx>{`
                .float-wp {
                    position: fixed;
                    bottom: 25px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 30px rgba(18, 140, 126, 0.4);
                    z-index: 10000;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .float-wp:hover {
                    transform: translateY(-3px) scale(1.05);
                    background: linear-gradient(135deg, #20ba5a 0%, #0f766e 100%);
                    box-shadow: 0 15px 35px rgba(18, 140, 126, 0.6);
                }
                @media (max-width: 768px) {
                    .float-wp {
                        bottom: 20px;
                        right: 20px;
                        width: 50px;
                        height: 50px;
                    }
                    .float-wp i {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
        </a>
    );
};

export default WhatsAppButton;
