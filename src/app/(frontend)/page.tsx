/* eslint-disable */
'use client';
import FeatureCarousel from '@/components/FeatureCaraousel';
import TestimonialCarousel from '@/components/TestimonialCaraousel';
import Navbar from '@/components/Navbar';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInViewport, setIsInViewport] = useState({
    features: false,
    whyJoin: false,
    testimonials: false,
    cta: false,
  });

  const featuresRef = useRef(null);
  const whyJoinRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === featuresRef.current) {
            setIsInViewport((prev) => ({ ...prev, features: true }));
          } else if (entry.target === whyJoinRef.current) {
            setIsInViewport((prev) => ({ ...prev, whyJoin: true }));
          } else if (entry.target === testimonialsRef.current) {
            setIsInViewport((prev) => ({ ...prev, testimonials: true }));
          } else if (entry.target === ctaRef.current) {
            setIsInViewport((prev) => ({ ...prev, cta: true }));
          }
        }
      });
    }, observerOptions);

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (whyJoinRef.current) observer.observe(whyJoinRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (whyJoinRef.current) observer.unobserve(whyJoinRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <>
      <div
        className="hero-background"
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        }}
      >
        <div className="noise-overlay"></div>
        <div className="glow-orbs"></div>
        <div className="hero-content">
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gradient">ByteSpace</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8">
            explore beyond our boundaries
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="get-started-btn group">
              <span className="btn-text">Get Started</span>
              <span className="btn-icon group-hover:translate-x-1 transition-transform">
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
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>

            <button className="sign-in-btn border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-all px-6 py-3 rounded-md">
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 md:px-10 relative" ref={featuresRef}>
        <div className="container mx-auto max-w-7xl">
          <div
            className={`bento-grid grid grid-cols-1 md:grid-cols-12 gap-6 transition-all duration-1000 ${
              isInViewport.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bento-item md:col-span-5 lg:col-span-6 bg-[#1c2541]/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:shadow-lg hover:shadow-[#3a86ff]/10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
                What is ByteSpace?
              </h2>
              <p className="text-lg md:text-xl text-gray-300">
                ByteSpace is a learning and collaboration platform where tech enthusiasts grow
                together through curated courses, a collaborative wiki, and up-to-date tech news.
              </p>
            </div>

            <div className="bento-item md:col-span-7 lg:col-span-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                <div className="bg-[#1c2541]/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 hover:border-primary transition-all hover:shadow-lg hover:shadow-[#3a86ff]/10 flex flex-col">
                  <div className="text-primary mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Structured Courses</h3>
                  <p className="text-gray-400 text-sm">
                    Learn at your own pace with our expertly crafted courses
                  </p>
                </div>

                <div className="bg-[#1c2541]/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 hover:border-secondary transition-all hover:shadow-lg hover:shadow-[#8338ec]/10 flex flex-col">
                  <div className="text-secondary mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community Wiki</h3>
                  <p className="text-gray-400 text-sm">
                    Collaborative knowledge base built by our community
                  </p>
                </div>

                <div className="bg-[#1c2541]/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 hover:border-accent transition-all hover:shadow-lg hover:shadow-[#00d4ff]/10 flex flex-col sm:col-span-2">
                  <div className="text-accent mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thriving Community</h3>
                  <p className="text-gray-400">
                    Connect with like-minded tech enthusiasts and grow your network
                  </p>
                  <Link
                    href="/community"
                    className="mt-4 text-accent hover:text-white flex items-center gap-2 w-fit"
                  >
                    <span>Join now</span>
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
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={featuresRef}
        className={`py-16 relative overflow-hidden transition-all duration-1000 ${
          isInViewport.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gradient">
            Our Key Features
          </h2>
          <FeatureCarousel />
        </div>
      </section>

      <section
        ref={whyJoinRef}
        className={`py-20 relative overflow-hidden bg-[#0b132b] transition-all duration-1000 ${
          isInViewport.whyJoin ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gradient">
            Why Join Us?
          </h2>

          <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bento-item bg-[#1c2541] p-8 rounded-xl border border-gray-700 hover:border-primary transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20">
              <div className="icon-container mb-6 bg-[#0a0d14] w-16 h-16 rounded-lg flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                  <path d="M12 18V6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Small Investment, Big Growth</h3>
              <p className="text-gray-300">
                Access a wealth of knowledge and resources without breaking the bank. Our platform
                is designed to be accessible while delivering maximum value.
              </p>
            </div>

            <div className="bento-item bg-[#1c2541] p-8 rounded-xl border border-gray-700 hover:border-secondary transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-secondary/20">
              <div className="icon-container mb-6 bg-[#0a0d14] w-16 h-16 rounded-lg flex items-center justify-center text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                Grow Together with the Community
              </h3>
              <p className="text-gray-300">
                Join a thriving ecosystem of learners and professionals who support each other's
                growth. Share knowledge, get feedback, and build connections.
              </p>
            </div>

            <div className="bento-item bg-[#1c2541] p-8 rounded-xl border border-gray-700 hover:border-accent transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20">
              <div className="icon-container mb-6 bg-[#0a0d14] w-16 h-16 rounded-lg flex items-center justify-center text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                Built by Contributors, Powered by Passion
              </h3>
              <p className="text-gray-300">
                Our platform is constantly evolving thanks to passionate contributors who bring
                their expertise and enthusiasm to every course, article, and discussion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={testimonialsRef}
        className={`py-20 relative overflow-hidden transition-all duration-1000 ${
          isInViewport.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
            What People Say About ByteSpace
          </h2>
          <p className="text-lg text-gray-300 text-center mb-10 max-w-2xl mx-auto">
            Real stories from learners and contributors who have grown with the ByteSpace community.
          </p>

          <TestimonialCarousel />
        </div>
      </section>

      <section
        ref={ctaRef}
        className={`py-20 relative overflow-hidden bg-gradient-to-b from-[#0a0d14] to-[#0b132b] transition-all duration-1000 ${
          isInViewport.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="bento-item max-w-4xl mx-auto bg-[#1c2541]/70 backdrop-blur-md p-10 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient text-center">
              Ready to Go Beyond Your Limit?
            </h2>
            <p className="text-lg text-gray-300 mb-10 text-center">
              Join our community today and start your journey into the world of technology. Connect,
              learn, and grow with ByteSpace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="get-started-btn group">
                <span className="btn-text">Create Account</span>
                <span className="btn-icon group-hover:translate-x-1 transition-transform">
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
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </button>

              <button className="sign-in-btn flex items-center justify-center gap-2 border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 hover:border-white/20 transition-all">
                <span>Join the Community</span>
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
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0a0d14] py-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-white">ByteSpace</h3>
              <p className="text-gray-400 text-sm">
                A learning and collaboration platform for tech enthusiasts.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Community Wiki
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-white">Community</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contributors
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-white">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for updates and new features.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/10 rounded-l-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-white w-full"
                />
                <button className="bg-primary hover:bg-primary/90 transition-colors text-white py-2 px-4 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ByteSpace. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
