/* eslint-disable */
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="hero-background"
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      }}
    >
      <div className="noise-overlay"></div>
      <div className="glow-orbs"></div>

      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} `}>
        <Link href="/" className="navbar-logo">
          <span className="text-glow">ByteSpace</span>
        </Link>

        <div className="navbar-links">
          <Dropdown />
          <Link href="/" className="nav-link">
            news
          </Link>
          <Link href="/" className="nav-link">
            forums
          </Link>
          <Link href="/" className="nav-link">
            about us
          </Link>
        </div>

        <div className="auth-links">
          <Link href="/" className="sign-in-btn">
            sign in
          </Link>
        </div>
      </nav>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="text-gradient">ByteSpace</span>
        </h1>
        <p className="hero-subtitle">explore beyond our boundaries</p>

        <button className="get-started-btn">
          <span className="btn-text">Get Started</span>
          <span className="btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
