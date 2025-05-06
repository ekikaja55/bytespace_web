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
          ['--mouse-x ' as any ]: `${mousePosition.x}%`,
          ['--mouse-y' as any]: `${mousePosition.y}%`,
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
</>
  );
}
