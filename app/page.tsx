'use client';

import Image from 'next/image'
import Link from 'next/link'
import HeroAnimation from './components/HeroAnimation'
import { MessageSquare, Video, Users, Send, User, ArrowRight } from 'lucide-react'
import DashboardPreview from './components/DashboardPreview'
import AnimatedSection from './components/AnimatedSection'
import ScrollDimmer from './components/ScrollDimmer'
import VoiceWave from './components/VoiceWave'
import TypeWriter from './components/TypeWriter'
import TeamMember from './components/TeamMember'

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollDimmer />
      <header className="fixed w-full top-0 z-50 glass-effect border-b border-gray-200/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Echo AI Logo"
                width={40}
                height={40}
                className="hover-glow"
              />
              <span className="ml-2 text-xl font-bold gradient-text">Echo AI</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/login" className="nav-link">
                Log in
              </Link>
              <Link href="/signup" className="btn-primary hover-lift">
                Sign up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-white to-primary-50">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text">
                  Welcome to Echo AI
                </h1>
                <VoiceWave />
              </div>
              <p className="text-xl sm:text-2xl text-gray-600">
                <TypeWriter text="Break language barriers and connect with anyone, anywhere, instantly." />
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Seamless Platform Integration
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connect your favorite communication platforms with real-time translation
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection className="card p-6 hover-lift" delay={0.1}>
                <div className="flex items-center mb-4">
                  <Image src="/teams-icon.svg" alt="Microsoft Teams" width={32} height={32} className="mr-3" />
                  <h3 className="text-xl font-semibold">Microsoft Teams</h3>
                </div>
                <p className="text-gray-600">
                  Full integration with Microsoft Teams for enterprise-grade communication
                </p>
              </AnimatedSection>

              <AnimatedSection className="card p-6 hover-lift" delay={0.2}>
                <div className="flex items-center mb-4">
                  <Image src="/meet-icon.svg" alt="Google Meet" width={32} height={32} className="mr-3" />
                  <h3 className="text-xl font-semibold">Google Meet</h3>
                </div>
                <p className="text-gray-600">
                  Seamless integration with Google Meet for smooth collaboration
                </p>
              </AnimatedSection>

              <AnimatedSection className="card p-6 hover-lift" delay={0.3}>
                <div className="flex items-center mb-4">
                  <Image src="/zoom-icon.svg" alt="Zoom" width={32} height={32} className="mr-3" />
                  <h3 className="text-xl font-semibold">Zoom</h3>
                </div>
                <p className="text-gray-600">
                  Complete Zoom integration for enhanced virtual meetings
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-24" id="demo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Experience Real-Time Translation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Watch how Echo AI breaks down language barriers in live conversations
              </p>
            </AnimatedSection>

            <AnimatedSection className="relative rounded-2xl overflow-hidden shadow-xl max-w-2xl mx-auto">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <video
                  className="w-full h-full object-cover rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/20250308_2037_Real-Time Translation Demo_simple_compose_01jnwk2rw8fbkattqbwp5j7e0j.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-end justify-center p-8 z-20">
                  <Link href="/signup" className="btn-primary text-lg px-8 py-3 hover-lift">
                    Try Demo
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-24 bg-gray-50" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A passionate team of university students building the future of communication
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <TeamMember
                name="Alex Chen"
                role="Backend Developer"
                delay={0.1}
              />
              <TeamMember
                name="Sarah Kim"
                role="Frontend Developer"
                delay={0.2}
              />
              <TeamMember
                name="Michael Patel"
                role="Backend Developer"
                delay={0.3}
              />
              <TeamMember
                name="Emma Wilson"
                role="Frontend Developer"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        <section className="py-24" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <AnimatedSection className="bg-white rounded-2xl p-8 shadow-soft">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </AnimatedSection>

              <AnimatedSection className="bg-white rounded-2xl p-8 shadow-soft">
                <h3 className="text-xl font-semibold mb-6">Stay Updated</h3>
                <p className="text-gray-600 mb-8">
                  Subscribe to our newsletter for the latest updates and promotions
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  <button type="submit" className="btn-primary w-full">
                    Subscribe
                  </button>
                </form>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Echo AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 