'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings, getSettings } from '@/lib/settings';
import styles from './Footer.module.css';

export default function Footer() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        async function loadSettings() {
            const data = await getSettings();
            setSettings(data);
        }
        loadSettings();
    }, []);

    const socialLinks = settings?.socialLinks || {};

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <div className={styles.top}>
                    <div className={styles.column}>
                        <h4 className={styles.columnHeading}>Products</h4>
                        <ul className={styles.columnList}>
                            <li><a href="https://aethros.ai/" className={styles.columnLink} target="_blank" rel="noopener noreferrer">Aethros AI</a></li>
                            <li><Link href="/#technology" className={styles.columnLink}>Our AI Architecture</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnHeading}>Company</h4>
                        <ul className={styles.columnList}>
                            <li><Link href="/#about" className={styles.columnLink}>About</Link></li>
                            <li><Link href="/#technology" className={styles.columnLink}>Technology</Link></li>
                            <li><Link href="/#posts" className={styles.columnLink}>Projects</Link></li>
                            <li><Link href="/admin" className={styles.columnLink}>Admin Page</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.footerBrand}>
                            <div className={styles.footerLogo}>
                                <Image
                                    src="/hexphyre_logo_white.png"
                                    alt="Hexphyre"
                                    width={150}
                                    height={40}
                                    style={{ objectFit: 'contain', objectPosition: 'left' }}
                                />
                            </div>
                            <p className={styles.companyInfo}>
                                Hexphyre Technologies Pvt Ltd <br />
                                (202201034409)
                            </p>
                        </div>
                        <h4 className={styles.columnHeading}>Follow Us</h4>
                        <div className={styles.socials}>
                            <a href={socialLinks?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            <a href={socialLinks?.facebook || "#"} className={styles.socialIcon} aria-label="X">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" /></svg>
                            </a>
                            <a href={socialLinks?.instagram || "#"} className={styles.socialIcon} aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} HEXPHYRE TECHNOLOGIES. All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
}
