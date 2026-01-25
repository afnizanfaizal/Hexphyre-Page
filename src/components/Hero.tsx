'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/lib/settings';
import styles from './Hero.module.css';

interface HeroProps {
    settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const heroLabel = settings?.heroLabel;
    const heroTitle = settings?.heroTitle || 'Accelerating Future Breakthroughs';
    const heroSubtitle = settings?.heroSubtitle || 'Advancing scientific discovery into scalable, demand-driven solutions through artificial intelligence';

    return (
        <section className={styles.hero}>
            <div
                className={styles.videoContainer}
                style={{ transform: `translateY(${offsetY * 0.5}px)` }}
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

            <div className={`container ${styles.content}`}>
                <div className={styles.textSide}>
                    {heroLabel && <span className={styles.label}>{heroLabel}</span>}
                    <h1 className={`heading-xl ${styles.title}`}>
                        {(() => {
                            const words = heroTitle.trim().split(/\s+/);
                            if (words.length > 1) {
                                const lastWord = words.pop();
                                const firstPart = words.join(' ');
                                return (
                                    <>
                                        <span style={{ fontWeight: 100 }}>{firstPart}</span>{' '}
                                        <span style={{
                                            fontWeight: 700,
                                            background: 'var(--gradient-cyan-purple)',
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            color: 'transparent'
                                        }}>{lastWord}</span>
                                    </>
                                );
                            }
                            // Fallback if only one word
                            return <span style={{
                                fontWeight: 700,
                                background: 'var(--gradient-cyan-purple)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent'
                            }}>{heroTitle}</span>;
                        })()}
                    </h1>
                    <p className={styles.description}>
                        {heroSubtitle}
                    </p>
                    <div className={styles.actions}>
                        {settings?.socialLinks.linkedin && (
                            <Link href={settings.socialLinks.linkedin} target="_blank" className="btn btn-outline">
                                LinkedIn
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
