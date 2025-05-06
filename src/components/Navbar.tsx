/*eslint-disable */
'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ShineBorder } from "@/components/magicui/shine-border";
import { AuroraText } from './magicui/aurora-text';


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }

      if (
        exploreOpen &&
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target) &&
        !exploreButtonRef.current?.contains(event.target)
      ) {
        setExploreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [exploreOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setExploreOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleExploreDropdown = () => {
    setExploreOpen(!exploreOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 py-4 transition-all duration-300 rounded-b-3xl ${isScrolled ? 'bg-[#0a0d14]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      aria-label="Main navigation"
    >
      <ShineBorder shineColor={["#8B5CF6", "#EC4899", "#F59E0B"]} />

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold text-white hover:opacity-90 transition-opacity"
          aria-label="ByteSpace Home"
        >
          <AuroraText>ByteSpace</AuroraText>
        </Link>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
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
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-6 text-sm">
          <div className="relative group">
            <button
              ref={exploreButtonRef}
              className="flex items-center space-x-1 text-gray-200 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md px-2"
              onClick={() => setExploreOpen(!exploreOpen)}
              onMouseEnter={() => setExploreOpen(true)}
              aria-expanded={exploreOpen}
              aria-controls="explore-dropdown"
            >
              <span>Explore</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transform transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''
                  }`}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div
              id="explore-dropdown"
              ref={dropdownRef}
              className={`absolute top-full left-0 mt-1 w-48 bg-[#1c2541] rounded-lg shadow-xl transition-all duration-200 ease-in-out ${exploreOpen
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-2'
                }`}
              onMouseLeave={() => setExploreOpen(false)}
              role="menu"
            >
              <div className="py-1" role="none">
                <Link
                  href="/courses"
                  className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-[#0a0d14] rounded-t-lg transition-colors"
                  role="menuitem"
                  onClick={() => setExploreOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  href="/wiki"
                  className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-[#0a0d14] transition-colors"
                  role="menuitem"
                  onClick={() => setExploreOpen(false)}
                >
                  Wiki
                </Link>
                <Link
                  href="/community"
                  className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-[#0a0d14] rounded-b-lg transition-colors"
                  role="menuitem"
                  onClick={() => setExploreOpen(false)}
                >
                  Community
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/news"
            className="text-gray-200 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md px-2"
          >
            News
          </Link>

          <Link
            href="/forums"
            className="text-gray-200 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md px-2"
          >
            Forums
          </Link>

          <Link
            href="/about"
            className="text-gray-200 hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md px-2"
          >
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/auth"
            className="text-gray-200 hover:text-white transition-colors px-3 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Sign In
          </Link>

          <Link
            href="/sign_up"
            className="bg-gradient-to-r from-[#3a86ff] to-[#8338ec] text-white px-4 py-2 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <span>Join Now</span>
          </Link>
        </div>

        <div
          id="mobile-menu"
          ref={menuRef}
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileMenuOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
            }`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div
            className={`absolute top-0 right-0 h-full w-3/4 max-w-sm bg-[#0a0d14] shadow-xl p-6 overflow-y-auto rounded-l-2xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
          <ShineBorder shineColor={["#8B5CF6", "#EC4899", "#F59E0B"]} />

            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="text-xl font-bold" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-glow text-white">ByteSpace</span>
              </Link>

              <button
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <button
                  className="flex items-center justify-between w-full text-left text-lg font-medium text-white mb-2 py-2"
                  onClick={() => setExploreOpen(!exploreOpen)}
                  aria-expanded={exploreOpen}
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transform transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''
                      }`}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={`pl-4 space-y-3 overflow-hidden transition-all duration-200 ${exploreOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <Link
                    href="/courses"
                    className="block py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Courses
                  </Link>
                  <Link
                    href="/wiki"
                    className="block py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wiki
                  </Link>
                  <Link
                    href="/community"
                    className="block py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Community
                  </Link>
                </div>
              </div>

              <Link
                href="/news"
                className="block text-lg font-medium text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>

              <Link
                href="/forums"
                className="block text-lg font-medium text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Forums
              </Link>

              <Link
                href="/about"
                className="block text-lg font-medium text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </div>

            <div className="mt-10 space-y-4">
              <Link
                href="/sign_in"
                className="block w-full text-center text-white border border-white/20 rounded-md py-3 hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>

              <Link
                href="/sign_up"
                className="block w-full text-center bg-gradient-to-r from-[#3a86ff] to-[#8338ec] text-white rounded-md py-3 hover:shadow-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
