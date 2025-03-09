'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User, Settings, Bell, MessageSquare, Video, Users } from 'lucide-react';
import Link from 'next/link';
import FloatingAnimals from '../components/FloatingAnimals';

interface UserProfile {
  username: string;
  email: string;
  preferred_language: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('username, email, preferred_language')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-primary-500">
          <span className="text-4xl">✨</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <FloatingAnimals />
      
      {/* Header */}
      <header className="fixed w-full top-0 z-50 glass-effect border-b border-gray-200/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600" />
              </div>
              <span className="font-medium">{profile?.username}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-primary-50 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <Link href="/profile" className="p-2 hover:bg-primary-50 rounded-full">
                <Settings className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Welcome back, {profile?.username}! ✨
          </h1>
          <p className="text-xl text-pink-500">
            Ready to break some language barriers today? 🌈
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow">
            <MessageSquare className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="text-2xl font-bold gradient-text">24</h3>
            <p className="text-gray-600">Active Chats</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow">
            <Video className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="text-2xl font-bold gradient-text">8</h3>
            <p className="text-gray-600">Meetings Today</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow">
            <Users className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="text-2xl font-bold gradient-text">156</h3>
            <p className="text-gray-600">Team Members</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 shadow-soft mb-12">
          <h2 className="text-2xl font-bold gradient-text mb-6">Your Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Username</label>
              <p className="text-lg">{profile?.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{profile?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Preferred Language</label>
              <p className="text-lg">{profile?.preferred_language || 'Not set'}</p>
            </div>
            <Link 
              href="/profile" 
              className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity"
            >
              Edit Profile ✨
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 