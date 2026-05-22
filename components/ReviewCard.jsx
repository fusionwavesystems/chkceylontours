import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ImageLightbox from './ImageLightbox';


const ReviewCard = ({ review }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="review-card blur-reveal">
            <div className="card-inner">
                <div className="card-header">
                    <div className="avatar">
                        {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <h4>{review.name} {review.country && <span className="country">({review.country})</span>}</h4>
                        <div className="rating">
                            {[...Array(5)].map((_, i) => (
                                <i 
                                    key={i} 
                                    className={`fas fa-star ${i < review.rating ? 'active' : ''}`}
                                ></i>
                            ))}
                        </div>
                    </div>
                    <div className="quote-icon">
                        <i className="fas fa-quote-right"></i>
                    </div>
                </div>
                
                <p className="message">"{review.message.length > 100 ? review.message.substring(0, 100) + '...' : review.message}"</p>

                {review.images && review.images.length > 0 && (
                    <div className="review-gallery">
                        {review.images.map((img, idx) => (
                            <div key={idx} className="thumb-frame" onClick={() => setSelectedImage(img)} style={{ cursor: 'pointer' }}>
                                <div className="thumb-img">
                                    <img src={img} alt={`Review photo ${idx + 1}`} loading="lazy" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="card-footer">
                    <span className="date">
                        {new Date(review.created_at).toLocaleDateString('en-GB')}
                    </span>
                    <div className="verified">
                        <i className="fas fa-check-circle"></i>
                        <span>VERIFIED GUEST</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                /* Tour Package style box for reviews */
                .review-card {
                    background: linear-gradient(135deg, rgba(12, 12, 12, 0.98) 0%, rgba(3, 3, 3, 1) 100%);
                    border-radius: 24px;
                    border: 2px solid #ffcc00;
                    padding: 24px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    transition: all 0.4s ease;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    overflow: hidden;
                }

                .review-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 40px rgba(255, 204, 0, 0.15);
                    border-color: #ffda33;
                }

                .card-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    flex-grow: 1;
                    position: relative;
                    z-index: 2;
                }
                .card-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    position: relative;
                }
                .avatar {
                    width: 55px;
                    height: 55px;
                    background: #ffc107;
                    color: #000;
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 950;
                    font-size: 1.6rem;
                    box-shadow: 0 0 30px rgba(255, 193, 7, 0.45);
                    flex-shrink: 0;
                    margin-top: 5px;
                }
                .user-info {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-top: 5px;
                }
                .user-info h4 {
                    margin: 0;
                    font-size: 1.4rem;
                    font-weight: 950;
                    color: #ffffff;
                    text-transform: lowercase;
                    letter-spacing: -0.5px;
                    font-family: 'Outfit', sans-serif;
                }
                .country {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.4);
                    font-weight: 500;
                    margin-left: 5px;
                }
                .rating {
                    display: flex;
                    gap: 5px;
                }
                .rating i {
                    font-size: 1.2rem;
                    color: #333;
                }
                .rating i.active {
                    color: #ffc107;
                }
                .quote-icon {
                    position: absolute;
                    top: 25px;
                    right: 25px;
                    font-size: 3rem;
                    color: #ffc107;
                    opacity: 0.15;
                    line-height: 1;
                }
                .message {
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: #e0e0e0;
                    font-style: italic;
                    font-weight: 500;
                    flex-grow: 1;
                    margin: 10px 0;
                    min-width: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .review-gallery {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 5px;
                }
                /* Clean photo thumb wrapper */
                .thumb-frame {
                    width: 79px;
                    height: 79px;
                    border-radius: 14px;
                    border: 2px solid rgba(255, 204, 0, 0.5);
                    position: relative;
                    background: #000;
                    flex-shrink: 0;
                    cursor: pointer;
                    transition: transform 0.3s ease, border-color 0.3s ease;
                    overflow: hidden;
                }
                
                .thumb-frame:hover {
                    transform: scale(1.08);
                    border-color: #ffcc00;
                    box-shadow: 0 0 15px rgba(255, 204, 0, 0.3);
                }
                /* Actual image bubble */
                .thumb-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    z-index: 2;
                    background: #000;
                }
                .thumb-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    padding-top: 20px;
                    margin-top: 10px;
                }
                .date {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #666;
                    font-family: 'Outfit', sans-serif;
                }
                .verified {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(10, 30, 15, 0.6);
                    padding: 4px 12px;
                    border-radius: 100px;
                    color: #39FF14;
                    font-size: 0.6rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 1px solid rgba(57, 255, 20, 0.1);
                }
                .verified i {
                    font-size: 0.75rem;
                }
                @media (max-width: 768px) {
                    .review-card {
                        padding: 25px;
                        min-height: auto;
                    }
                    .avatar {
                        width: 45px;
                        height: 45px;
                        font-size: 1.2rem;
                    }
                    .user-info h4 {
                        font-size: 1.1rem;
                    }
                }
            `}</style>

            {typeof document !== 'undefined' && createPortal(
                <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />,
                document.body
            )}
        </div>
    );
};


export default ReviewCard;
