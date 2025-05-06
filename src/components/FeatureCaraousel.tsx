'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const FeatureCaraousel = () => {
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

export default FeatureCaraousel;
