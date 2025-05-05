/*eslint-disable*/
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      name: 'Wiki',
      href: '/',
      icon: (
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
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      ),
    },
    {
      name: 'Courses',
      href: '/about',
      icon: (
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
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="dropdown-trigger flex items-center gap-1 py-2 px-3 rounded-md transition-all duration-300 hover:bg-white/5"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="text-white">Explore</span>
        <ChevronDown
          size={16}
          className={`text-white transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`
          dropdown-menu absolute left-0 mt-2 w-56 origin-top-left 
          rounded-md bg-gray-900/90 backdrop-blur-lg border border-gray-800
          shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50
          transition-all duration-200 transform
          ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="dropdown-item group flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:text-cyan-300 transition-all"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span className="dropdown-item-icon text-gray-400 group-hover:text-cyan-300 transition-colors">
                {item.icon}
              </span>
              <span>{item.name}</span>
              <span className="dropdown-item-line h-px w-0 bg-gradient-to-r from-cyan-400 to-transparent group-hover:w-full transition-all duration-300 ml-auto"></span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dropdown-item:hover .dropdown-item-icon {
          transform: translateX(2px);
        }

        .dropdown-item-icon {
          transition: transform 0.2s ease;
        }

        .featured-dropdown-item:hover {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
