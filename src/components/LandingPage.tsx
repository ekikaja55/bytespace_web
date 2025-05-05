/* eslint-disable */
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const FeatureCarousel = () => {
  const [active, setActive] = useState(0);
  const features = [
    {
      title: 'Courses',
      description: 'Learn with structured courses designed for modern tech skills',
      icon: (
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      title: 'Wiki',
      description: 'Collaborate on a growing knowledge base built by the community',
      icon: (
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
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
    },
    {
      title: 'News',
      description: 'Stay updated with the latest trends and breakthroughs in tech',
      icon: (
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
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
          <path d="M18 14h-8"></path>
          <path d="M15 18h-5"></path>
          <path d="M10 6h8v4h-8V6Z"></path>
        </svg>
      ),
    },
    {
      title: 'Community',
      description: 'Connect with like-minded tech enthusiasts and grow together',
      icon: (
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
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current === features.length - 1 ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex justify-center space-x-2 mb-6">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === active ? 'bg-primary' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-card transition-all duration-500 ${
              index === active ? 'scale-105 z-10' : 'scale-95 opacity-70'
            }`}
            onClick={() => setActive(index)}
          >
            <div className="bg-[#1c2541] p-6 rounded-xl border border-gray-700 hover:border-primary transition-all duration-300 h-full flex flex-col">
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="mt-auto">
                <Link href="/" className="text-primary hover:text-accent flex items-center">
                  Explore
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
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialCarousel = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      name: 'Prima Fikri Salim',
      role: 'Full Stack Developer',
      review:
        'ByteSpace transformed my learning journey. The community support and quality resources helped me land my dream job in just 6 months.',
      rating: 5,
      image: '/api/placeholder/100/100',
    },
    {
      name: 'Ananda',
      role: 'Data Scientist',
      review:
        'The structured learning path and expert guidance from the community made complex concepts much easier to grasp. ByteSpace is my go-to for staying updated.',
      rating: 5,
      image: '/api/placeholder/100/100',
    },
    {
      name: 'Bayu Aditya',
      role: 'UX Designer',
      review: `As a contributor to the wiki, I've not only shared my knowledge but also learned so much from others. ByteSpace creates a perfect ecosystem for growth.`,
      rating: 4,
      image: '/api/placeholder/100/100',
    },
    {
      name: 'Manachika',
      role: 'Cloud Architect',
      review:
        'The news section keeps me informed about emerging technologies, and the courses have the perfect balance of theory and practical applications.',
      rating: 5,
      image: '/api/placeholder/100/100',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((current) => (current === testimonials.length - 1 ? 0 : current + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex justify-center space-x-2 mb-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeTestimonial ? 'bg-primary' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-card transition-all duration-500 ${
              index === activeTestimonial ? 'scale-105 z-10' : 'scale-95 opacity-70'
            }`}
            onClick={() => setActiveTestimonial(index)}
          >
            <div className="bg-[#1c2541] p-6 rounded-xl border border-gray-700 hover:border-primary transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-400 mr-1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic">"{testimonial.review}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      className="landing-container"
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      }}
    >
      <section className="py-20 px-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bento-grid grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bento-item">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient h-12">
                What is ByteSpace?
              </h2>
            </div>
            <div className="bento-item">
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                ByteSpace is a learning and collaboration platform where tech enthusiasts grow
                together through curated courses, a collaborative wiki, and up-to-date tech news.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 relative overflow-hidden">
        <FeatureCarousel />
      </section>

      <section className="py-20 relative overflow-hidden bg-[#0b132b]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gradient">
            Why Join Us?
          </h2>

          <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bento-item bg-[#1c2541] p-8 rounded-xl border border-gray-700 hover:border-primary transition-all duration-300 hover:transform hover:scale-105">
              <div className="icon-container mb-6 bg-[#0a0d14] w-16 h-16 rounded-lg flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
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

            <div className="bento-item bg-[#1c2541] p-8 rounded-xl border border-gray-700 hover:border-secondary transition-all duration-300 hover:transform hover:scale-105">
              <div className="icon-container mb-6 bg-[#0a0d14] w-16 h-16 rounded-lg flex items-center justify-center text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
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

            <div className="bento-item bg-[#1c2541] p-8 rounded-xl border border-gray-700 hover:border-accent transition-all duration-300 hover:transform hover:scale-105">
              <div className="icon-container mb-6 bg-[#0a0d14] w-16 h-16 rounded-lg flex items-center justify-center text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
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

      {/* Section 3: What People Say About ByteSpace */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
            What People Say About ByteSpace
          </h2>
          <p className="text-lg text-gray-300 text-center mb-10 max-w-2xl mx-auto">
            Cerita nyata dari para pembelajar dan kontributor yang bertumbuh bersama komunitas
            ByteSpace.
          </p>

          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient h-14">
              Ready to Go Beyond Your Limit?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Cerita nyata dari para pembelajar dan kontributor yang bertumbuh bersama komunitas
              ByteSpace.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="get-started-btn">
                <span className="btn-text">Create Account</span>
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

              <button className="get-started-btn">
                <span>Join the Community</span>
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

      <style jsx>{`
        .landing-container {
          background: linear-gradient(145deg, var(--color-bg), #121824);
          color: var(--color-text);
          min-height: 100vh;
        }

        .text-gradient {
          background: linear-gradient(
            90deg,
            var(--color-primary),
            var(--color-secondary),
            var(--color-accent)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shift 8s ease infinite;
          background-size: 200% auto;
        }

        .bento-grid {
          perspective: 1000px;
        }

        .bento-item {
          transform-style: preserve-3d;
          transition: all 0.5s ease;
        }

        .glow-spot {
          position: absolute;
          width: 25vw;
          height: 25vw;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
          z-index: 0;
          pointer-events: none;
        }

        .glow-spot:nth-child(1) {
          background: var(--glow-primary);
          animation: float 15s infinite alternate ease-in-out;
        }

        .glow-spot:nth-child(2) {
          background: var(--glow-secondary);
          animation: float 20s infinite alternate-reverse ease-in-out;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-10%, 10%) scale(1.1);
          }
          100% {
            transform: translate(10%, -10%) scale(0.9);
          }
        }

        .tech-sphere {
          position: relative;
          animation: orbit 20s infinite linear;
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .feature-card,
        .testimonial-card {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
