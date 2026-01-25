'use client';

import { useEffect, useState } from 'react';
import styles from './About.module.css';

export default function About() {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="about" className={styles.section} style={{ scrollMarginTop: 'var(--header-height)' }}>
            <div
                className={styles.videoContainer}
                style={{ transform: `translateY(${(offsetY - 2000) * 0.3}px)` }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.videoBackground}
                >
                    <source src="/background-wave.mp4" type="video/mp4" />
                </video>
                <div className={styles.videoOverlay} />
            </div>

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <span className={styles.label}>About Us</span>
                    <h2 className={styles.heading}>
                        From scientific discovery to scalable <br />
                        deployment — <span>powered by AI</span>
                    </h2>
                    <p className={styles.description}>
                        Hexphyre is a scientific accelerator company that applies artificial intelligence to accelerate breakthrough research, translate discovery into market-ready solutions, and deploy them at scale. The company provides the architecture, infrastructure, and application layers required to move innovation from experimentation to real-world impact.
                    </p>

                    <div className={styles.partnersSection}>
                        <h3 className={styles.partnersHeading}>Our Partners</h3>
                        <div className={styles.partnersGrid}>
                            <div className={styles.partnerWrapper}>
                                <img
                                    src="/nvidia_white.png"
                                    alt="NVIDIA"
                                    className={styles.partnerLogo}
                                />
                            </div>
                            <div className={styles.partnerWrapper}>
                                <img
                                    src="/aws_white_v2.png"
                                    alt="AWS"
                                    className={styles.partnerLogo}
                                />
                            </div>
                            <div className={styles.partnerWrapper}>
                                <img
                                    src="/google_white_v2.png"
                                    alt="Google Cloud"
                                    className={styles.partnerLogo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
