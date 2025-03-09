'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your signup logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center mb-6">
              <Image
                src="/logo.svg"
                alt="Echo AI Logo"
                width={48}
                height={48}
                className="hover-glow"
              />
              <span className="ml-2 text-2xl font-bold gradient-text">Echo AI</span>
            </Link>
            <h2 className="text-3xl font-bold gradient-text">Welcome to Echo AI</h2>
            <p className="mt-2 text-sm text-gray-600">
              Break language barriers and connect globally
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Create a secure password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn-primary py-3 relative rounded-lg text-lg font-medium hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-700/30 z-10 rounded-l-3xl" />
          <Image
            src="/Diversepplphoto.png"
            alt="Diverse team in video call"
            fill
            className="object-cover rounded-l-3xl"
            priority
            quality={90}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
          <blockquote className="text-white text-xl font-medium">
            "Connect with anyone, anywhere, in any language."
          </blockquote>
        </div>
      </div>
    </div>
  );
} 