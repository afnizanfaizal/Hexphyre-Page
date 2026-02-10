'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.content}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <div style={{ position: 'relative', width: '180px', height: '48px' }}>
            <Image
              src="/hexphyre_logo_white.png"
              alt="Hexphyre"
              fill
              style={{ objectFit: 'contain', objectPosition: 'left' }}
              priority
            />
          </div>
        </Link>

        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.navLinks} ${isMenuOpen ? styles.navActive : ''}`}>
          <Link href="/#technology" className={styles.link} onClick={closeMenu}>
            Technology
          </Link>
          <Link href="/#posts" className={styles.link} onClick={closeMenu}>
            Innovation
          </Link>
          <Link href="/#about" className={styles.link} onClick={closeMenu}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
