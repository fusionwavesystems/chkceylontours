"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GallerySlider from "@/components/GallerySlider";

export default function AboutUs() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/siteConfig.json")
            .then((res) => res.json())
            .then((data) => {
                setConfig(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!loading) {
            document.title = "About Us | CHK Ceylon Tours - Your Sri Lanka Travel Experts";
            
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                        }
                    });
                },
                { threshold: 0.1 }
            );

            const observeReveals = () => {
                const reveals = document.querySelectorAll(".reveal:not(.active)");
                reveals.forEach((el) => observer.observe(el));
            };

            observeReveals();
            const mutationObserver = new MutationObserver(() => {
                observeReveals();
            });

            mutationObserver.observe(document.body, { childList: true, subtree: true });

            return () => {
                observer.disconnect();
                mutationObserver.disconnect();
            };
        }
    }, [loading]);

    if (!config) return null;

    return (
        <div className="app-main">
            <Navbar config={config} />

            <section
                className="hero"
                style={{
                    height: "70vh",
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/dest_hero_bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}
            >
                <div className="container" style={{ paddingTop: '80px' }}>
                    <div className="reveal">
                        <span className="subtitle" style={{ color: "var(--neon-yellow)", textShadow: "var(--neon-glow)" }}>A Journey in Pursuit of Memories</span>
                        <h1 style={{ fontSize: "clamp(3.5rem, 8vw, 4.5rem)", margin: "20px 0", lineHeight: "1.1" }}>About Us</h1>

                    </div>
                </div>
            </section>

            <section className="about-content" style={{ padding: "100px 0", background: "#000" }}>
                <div className="container">
                    <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                        <div>
                            <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "var(--neon-yellow)" }}>Our Story</h2>
                            <p style={{ fontSize: "1.1rem", marginBottom: "25px", color: "rgba(255,255,255,0.9)", lineHeight: "1.6" }}>
                                This is precisely the experience we, as C.H.K Ceylon, have provided to travelers from around the world for 15 years. This is not just a business; it is the story of a trusting bond built between you, who come to discover the beauty of Sri Lanka, and us.
                            </p>
                            <p style={{ fontSize: "1.1rem", marginBottom: "25px", color: "rgba(255,255,255,0.7)", fontStyle: "italic", borderLeft: "4px solid var(--neon-yellow)", paddingLeft: "20px" }}>
                                "Travel is not just moving from one place to another; it's a unique journey that adds new experiences, memories, and friendships to life."
                            </p>
                            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                                Starting small 15 years ago with the aim to showcase the hidden beauty of this blessed land, Sri Lanka, CHK Ceylon has today become a leading travel guide service trusted by thousands of local and foreign tourists.
                            </p>
                        </div>
                        <div style={{ position: "relative" }}>
                            <img
                                src="/tea_hills.png"
                                alt="Sri Lanka Tea Hills"
                                style={{
                                    width: "100%",
                                    aspectRatio: "4/3",
                                    objectFit: "cover",
                                    display: "block",
                                    borderRadius: "20px",
                                    border: "2px solid var(--neon-yellow)",
                                    boxShadow: "var(--neon-glow)"
                                }}
                            />
                            <div
                                className="bg-blob"
                                style={{ top: "-50px", right: "-50px", width: "300px", height: "300px", opacity: 0.3 }}
                            ></div>
                        </div>
                    </div>

                    <div className="reveal" style={{ marginTop: "120px" }}>
                        <div className="reveal" style={{ marginTop: "100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                            <div style={{ order: 2 }}>
                                <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "var(--neon-yellow)" }}>Why Our 15 Years Matter</h2>
                                <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                                    Over the past decade and a half, we learned not just road maps. We understood the heartbeat of tourists coming from different countries and cultures. What they truly expect is freedom, safety, and hospitality.
                                </p>
                                <ul style={{ listStyle: "none", padding: 0, margin: "30px 0" }}>
                                    {[
                                        { t: "We are not just Guides", d: "We are your travel companion." },
                                        { t: "We are not just vehicle providers", d: "We ensure your comfortable travel." },
                                        { t: "We are not just hotel bookers", d: "We make your rest meaningful." }
                                    ].map((item, idx) => (
                                        <li key={idx} style={{ marginBottom: "15px", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                                            <i className="fas fa-check-circle" style={{ color: "var(--neon-yellow)", marginTop: "5px" }}></i>
                                            <div>
                                                <strong style={{ display: "block", color: "var(--neon-yellow)" }}>{item.t}</strong>
                                                <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.d}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ order: 1 }}>
                                <div style={{ position: "relative" }}>
                                    <img
                                        src="/famous_places/sigiriya.png"
                                        alt="Sigiriya"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            borderRadius: "20px",
                                            border: "2px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div className="bg-blob" style={{ bottom: "-30px", left: "-30px", width: "200px", height: "200px" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="reveal" style={{ marginTop: "120px", textAlign: "center", maxWidth: "1000px", margin: "120px auto 0" }}>
                            <h2 style={{ fontSize: "3rem", marginBottom: "40px", color: "var(--neon-yellow)" }}>The Unique Experience</h2>
                            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "rgba(255,255,255,0.9)" }}>
                                Whether it's the historical grandeur of Sigiriya, the misty mountains of Ella, the charm of wild animals in Yala National Park, or the golden sands of the southern coast... wherever it may be, our expert guides are capable of bringing you close to the <strong>"true Sri Lankan identity"</strong> that an ordinary tourist may not see or experience.
                            </p>
                            <p style={{ fontSize: "1.2rem", marginTop: "30px", color: "var(--neon-yellow)", fontWeight: "600" }}>
                                With 15 years of expertise and experience perfected in the field, we will flexibly plan our services to suit your preferences and budget (Customized Tours).
                            </p>
                        </div>

                        <div className="reveal" style={{
                            marginTop: "120px",
                            padding: "80px 40px",
                            background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/dest_hero_bg.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "30px",
                            textAlign: "center",
                            border: "1px solid var(--neon-yellow)",
                            boxShadow: "var(--neon-glow)"
                        }}>
                            <h2 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>Our Promise</h2>
                            <p style={{ fontSize: "1.5rem", maxWidth: "800px", margin: "0 auto 40px", lineHeight: "1.5" }}>
                                "You come to CHK Ceylon as a tourist. But you return as a member of our family, carrying beautiful memories of Sri Lanka in your heart."
                            </p>
                            <a
                                href="https://wa.me/94776981971"
                                target="_blank"
                                className="btn btn-primary"
                                style={{
                                    padding: "15px 40px",
                                    fontSize: "1.2rem",
                                    background: "var(--neon-yellow)",
                                    color: "#000",
                                    fontWeight: "bold",
                                    borderRadius: "50px",
                                    textDecoration: "none",
                                    display: "inline-block",
                                    transition: "0.3s"
                                }}
                            >
                                Start Your Journey <i className="fab fa-whatsapp" style={{ marginLeft: "10px" }}></i>
                            </a>
                        </div>
                    </div>

                    {/* A Personal Message of Gratitude */}
                    <div className="reveal" style={{ 
                        marginTop: "120px", 
                        padding: "50px 40px", 
                        background: "rgba(255, 240, 31, 0.02)", 
                        border: "1px dashed rgba(255, 240, 31, 0.2)",
                        borderRadius: "24px",
                        maxWidth: "850px",
                        margin: "120px auto 0",
                        textAlign: "center"
                    }}>
                        <i className="fas fa-praying-hands" style={{ fontSize: "2.5rem", color: "var(--neon-yellow)", textShadow: "var(--neon-glow)", marginBottom: "20px" }}></i>
                        <p style={{ 
                            fontSize: "2rem", 
                            lineHeight: "1.5", 
                            color: "#fff",
                            fontFamily: "var(--font-handwritten)",
                            margin: 0,
                            letterSpacing: "0.5px"
                        }}>
                            "Thank you once again to Mother Earth and the message that my mother brought to me to enter the tourism industry first. Thank you very much to every tourist who has traveled with me so far and to the heads of tourism agencies who have given me tours and to my friends and all my friends in the tourism industry. It is because of the support and love you all have given that I have had so many experiences. Thank you to all of you❤️🇱🇰🙏"
                        </p>
                        <span style={{ display: "block", marginTop: "20px", fontWeight: "700", color: "var(--neon-yellow)", fontSize: "1.1rem" }}>
                            — Dilan Lekamarachchi, CEO
                        </span>
                    </div>

                    <div className="reveal" style={{ marginTop: "120px" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "60px", color: "var(--neon-yellow)" }}>Our Team</h2>
                        {/* First Row: 3 Profiles */}
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "60px", marginBottom: "60px" }}>

                            <div style={{ textAlign: "center", flex: "1 1 250px", maxWidth: "300px" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/guide.jpeg"
                                        alt="Dilan Lekamarachchi"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            borderRadius: "50%",
                                            border: "4px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div
                                        className="bg-blob"
                                        style={{ top: "-30px", left: "-30px", width: "250px", height: "250px", opacity: 0.3 }}
                                    ></div>
                                </div>
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>Dilan Lekamarachchi</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>CEO & Founder</p>
                            </div>

                            <div style={{ textAlign: "center", flex: "1 1 250px", maxWidth: "300px" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/assistenmanger.jpeg"
                                        alt="H.G.K Chamathka"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            borderRadius: "50%",
                                            border: "4px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div
                                        className="bg-blob"
                                        style={{ top: "-30px", right: "-30px", width: "250px", height: "250px", opacity: 0.3 }}
                                    ></div>
                                </div>
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>H.G.K Chamathka</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>Secretary</p>
                            </div>

                            <div style={{ textAlign: "center", flex: "1 1 250px", maxWidth: "300px" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/NPPUmesha.jpeg"
                                        alt="L.A.U Amali"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            borderRadius: "50%",
                                            border: "4px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div
                                        className="bg-blob"
                                        style={{ top: "-30px", left: "50%", transform: "translateX(-50%)", width: "250px", height: "250px", opacity: 0.3 }}
                                    ></div>
                                </div>
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>L.A.U Amali</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>Tour Operator</p>
                            </div>

                        </div>

                        {/* Second Row: 2 Profiles */}
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "60px" }}>

                            <div style={{ textAlign: "center", flex: "1 1 250px", maxWidth: "300px" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/hiruni.jpeg"
                                        alt="M.A Hiruni"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            borderRadius: "50%",
                                            border: "4px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div
                                        className="bg-blob"
                                        style={{ top: "-30px", left: "50%", transform: "translateX(-50%)", width: "250px", height: "250px", opacity: 0.3 }}
                                    ></div>
                                </div>
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>M.A Hiruni</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>Finance Manager</p>
                            </div>

                            <div style={{ textAlign: "center", flex: "1 1 250px", maxWidth: "300px" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/raja.jpeg"
                                        alt="T.V Rajapaksha"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            borderRadius: "50%",
                                            border: "4px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div
                                        className="bg-blob"
                                        style={{ top: "-30px", right: "-30px", width: "250px", height: "250px", opacity: 0.3 }}
                                    ></div>
                                </div>
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>T.V Rajapaksha</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>HR Manager</p>
                            </div>

                        </div>
                    </div>

                    <div className="reveal" style={{ marginTop: "120px" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "60px" }}>Contact Information</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "30px" }}>
                            <div
                                style={{
                                    padding: "40px",
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    textAlign: "center"
                                }}
                            >
                                <i className="fas fa-map-marker-alt" style={{ fontSize: "3rem", color: "var(--neon-yellow)", marginBottom: "25px", textShadow: "var(--neon-glow)" }}></i>
                                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Address</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)" }}>No, 4/6, Malwathuhiripitiya, Buthpitiya, Gampaha, Sri Lanka 11054</p>
                            </div>

                            <div
                                style={{
                                    padding: "40px",
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    textAlign: "center"
                                }}
                            >
                                <i className="fas fa-phone-alt" style={{ fontSize: "3rem", color: "var(--neon-yellow)", marginBottom: "25px", textShadow: "var(--neon-glow)" }}></i>
                                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Contact Details</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}><strong>Phone:</strong> 0094776981971</p>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}><strong>Office:</strong> 0332279267</p>
                                <p style={{ color: "rgba(255,255,255,0.7)" }}><strong>Email:</strong> shashi198524@gmail.com</p>
                            </div>

                            <div
                                style={{
                                    padding: "40px",
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    textAlign: "center"
                                }}
                            >
                                <i className="fas fa-clock" style={{ fontSize: "3rem", color: "var(--neon-yellow)", marginBottom: "25px", textShadow: "var(--neon-glow)" }}></i>
                                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Business Hours</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}><strong>Mon - Fri:</strong> 8.30 am to 11.30 pm</p>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}><strong>Sat - Sun:</strong> 8.30 am to 5.30 pm</p>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "15px", fontSize: "0.9rem", fontStyle: "italic" }}>(Ill Full Moon Poya Day) Hours might differ</p>
                                <p style={{ color: "var(--neon-yellow)", fontWeight: "bold" }}>24 hours a day Our Special representative for You</p>
                            </div>

                            <div
                                style={{
                                    padding: "40px 30px",
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <div>
                                    <i className="fas fa-file-signature" style={{ fontSize: "3rem", color: "var(--neon-yellow)", marginBottom: "25px", textShadow: "var(--neon-glow)" }}></i>
                                    <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Company BR</h3>
                                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "15px", lineHeight: "1.5" }}>
                                        CHK Ceylon Tours (PVT) LTD is a certified & officially registered travel agency in Sri Lanka.
                                    </p>
                                </div>
                                <a 
                                    href="/br_certificate.jpeg" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "block",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        border: "1px solid rgba(255, 240, 31, 0.3)",
                                        boxShadow: "0 0 15px rgba(255,240,31,0.15)",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                        maxWidth: "160px",
                                        marginTop: "10px"
                                    }}
                                    className="br-cert-link"
                                >
                                    <img 
                                        src="/br_certificate.jpeg" 
                                        alt="CHK Ceylon Tours BR Certificate" 
                                        style={{ width: "100%", height: "auto", display: "block" }} 
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="reveal" style={{ 
                        marginTop: "80px", 
                        padding: "50px 40px", 
                        background: "rgba(255, 255, 255, 0.02)", 
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "24px",
                        textAlign: "center"
                    }}>
                        <span style={{ 
                            color: "var(--neon-green)", 
                            textShadow: "var(--neon-glow-green)", 
                            letterSpacing: "3px", 
                            fontWeight: "800", 
                            textTransform: "uppercase",
                            fontSize: "0.9rem",
                            display: "block",
                            marginBottom: "10px"
                        }}>Connect With Us</span>
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "15px", fontFamily: "var(--font-main)" }}>Follow Our Journey</h2>
                        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto 40px", fontSize: "1rem", lineHeight: "1.6" }}>
                            Stay updated with our latest tours, guest moments, and discover the hidden beauty of Sri Lanka through our social channels.
                        </p>
                        
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            gap: "25px", 
                            flexWrap: "wrap" 
                        }}>
                            <a 
                                href="https://web.facebook.com/profile.php?id=61567698557599&sk=followers" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-highlight-btn fb-btn"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "14px 28px",
                                    borderRadius: "50px",
                                    fontSize: "1rem",
                                    fontWeight: "800",
                                    color: "#fff",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 4px 15px rgba(24, 119, 242, 0.25)"
                                }}
                            >
                                <i className="fab fa-facebook-f" style={{ fontSize: "1.3rem" }}></i> Facebook Page
                            </a>

                            <a 
                                href="https://www.instagram.com/chkceylon?igsh=MXNldXFpd3h4bGNzeA==&utm_source=ig_contact_invite" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-highlight-btn ig-btn"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "14px 28px",
                                    borderRadius: "50px",
                                    fontSize: "1rem",
                                    fontWeight: "800",
                                    color: "#fff",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 4px 15px rgba(225, 48, 108, 0.25)"
                                }}
                            >
                                <i className="fab fa-instagram" style={{ fontSize: "1.3rem" }}></i> Instagram Feed
                            </a>

                            <a 
                                href="https://www.youtube.com/channel/UCFlor_kOoJYITY9bUN0EYpw" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-highlight-btn yt-btn"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "14px 28px",
                                    borderRadius: "50px",
                                    fontSize: "1rem",
                                    fontWeight: "800",
                                    color: "#fff",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 4px 15px rgba(255, 0, 0, 0.25)"
                                }}
                            >
                                <i className="fab fa-youtube" style={{ fontSize: "1.3rem" }}></i> YouTube Channel
                            </a>
                        </div>
                    </div>

                    <div className="reveal" style={{ marginTop: "60px" }}>
                        <a
                            href="https://www.google.com/maps/place/C+H+K+Ceylon+Tours/@7.0556776,80.0682114,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae2ff886c88333b:0x7de35313567ebbd1!8m2!3d7.0556776!4d80.0682114!16s%2Fg%2F11zkv68sh8?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "block",
                                width: "100%",
                                height: "400px",
                                borderRadius: "20px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.1)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                                background: "rgba(255,255,255,0.05)",
                                position: "relative",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                            }}
                            className="map-link-container"
                        >
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src="https://maps.google.com/maps?q=C%20H%20K%20Ceylon%20Tours&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                title="CHK Ceylon Tours Location"
                                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)", pointerEvents: "none" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div style={{
                                position: "absolute",
                                bottom: "20px",
                                right: "20px",
                                background: "rgba(0,0,0,0.85)",
                                border: "1px solid var(--neon-yellow)",
                                padding: "10px 20px",
                                borderRadius: "30px",
                                color: "var(--neon-yellow)",
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "var(--neon-glow)",
                                transition: "all 0.3s ease",
                                zIndex: 10
                            }} className="map-btn">
                                <i className="fas fa-external-link-alt"></i> Open in Google Maps
                            </div>
                        </a>
                    </div>
                </div>
            </section>



            <GallerySlider title="Our Travel Gallery" subtitle="Memories in Sri Lanka" />

            <Footer />
            <WhatsAppButton />

            <style jsx>{`
                .feature-card:hover {
                    transform: translateY(-10px);
                    background: rgba(255,255,255,0.08);
                    border-color: var(--neon-yellow);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                :global(.br-cert-link):hover {
                    transform: scale(1.06);
                    border-color: var(--neon-yellow) !important;
                    box-shadow: 0 0 25px rgba(255, 240, 31, 0.4) !important;
                }
                :global(.map-link-container):hover {
                    border-color: var(--neon-yellow) !important;
                    box-shadow: 0 0 30px rgba(255, 240, 31, 0.25) !important;
                }
                 :global(.map-link-container):hover .map-btn {
                    background: var(--neon-yellow) !important;
                    color: #000 !important;
                    box-shadow: 0 0 20px rgba(255, 240, 31, 0.6) !important;
                }
                :global(.social-highlight-btn) {
                    position: relative;
                    overflow: hidden;
                }
                :global(.fb-btn) {
                    background: linear-gradient(135deg, #1877f2 0%, #0056b3 100%) !important;
                    border: 1px solid rgba(24, 119, 242, 0.2) !important;
                }
                :global(.ig-btn) {
                    background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%) !important;
                    border: 1px solid rgba(225, 48, 108, 0.2) !important;
                }
                :global(.yt-btn) {
                    background: linear-gradient(135deg, #ff0000 0%, #990000 100%) !important;
                    border: 1px solid rgba(255, 0, 0, 0.2) !important;
                }
                :global(.social-highlight-btn):hover {
                    transform: translateY(-3px) scale(1.03) !important;
                }
                :global(.fb-btn):hover {
                    box-shadow: 0 10px 25px rgba(24, 119, 242, 0.5) !important;
                }
                :global(.ig-btn):hover {
                    box-shadow: 0 10px 25px rgba(225, 48, 108, 0.5) !important;
                }
                :global(.yt-btn):hover {
                    box-shadow: 0 10px 25px rgba(255, 0, 0, 0.5) !important;
                }
                @media (max-width: 768px) {
                    .about-content .reveal {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
}
