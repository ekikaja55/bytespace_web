/* eslint-disable */
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const TestimonialCaraousel = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      name: 'Prima Fikri Salim',
      role: 'Full Stack Developer',
      review:
        'ByteSpace transformed my learning journey. The community support and quality resources helped me land my dream job in just 6 months.',
      rating: 5,
      image: '/assets/images/testi_profil/testi4.jpg',
    },
    {
      name: 'Ananda',
      role: 'Data Scientist',
      review:
        'The structured learning path and expert guidance from the community made complex concepts much easier to grasp. ByteSpace is my go-to for staying updated.',
      rating: 5,
      image: '/assets/images/testi_profil/testi1.jpg',
    },
    {
      name: 'Bayu Aditya',
      role: 'UX Designer',
      review: `As a contributor to the wiki, I've not only shared my knowledge but also learned so much from others. ByteSpace creates a perfect ecosystem for growth.`,
      rating: 4,
      image: '/assets/images/testi_profil/testi2.jpg',
    },
    {
      name: 'Manachika',
      role: 'Cloud Architect',
      review:
        'The news section keeps me informed about emerging technologies, and the courses have the perfect balance of theory and practical applications.',
      rating: 5,
      image: '/assets/images/testi_profil/testi3.jpg',
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
              index === activeTestimonial ? 'bg-white' : 'bg-gray-600'
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
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4 object-cover"
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

export default TestimonialCaraousel;
