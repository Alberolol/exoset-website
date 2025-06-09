'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'À propos', href: '/about' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl border border-gray-100">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-black">
                EXOSET
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black px-3 py-2 text-sm font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-exoset-pink transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-exoset-gradient hover:bg-exoset-gradient-hover text-white px-6 py-2 rounded-full transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
            >
              Nous contacter
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-black focus:outline-none focus:text-black"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-6 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-2xl">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                                      className="text-black block px-3 py-2 text-base font-medium relative group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-exoset-pink transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-exoset-gradient hover:bg-exoset-gradient-hover text-white block px-3 py-2 rounded-lg transition-all duration-200 text-base font-medium mt-4 shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Nous contacter
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 