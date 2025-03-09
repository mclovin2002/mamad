'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Settings, Bell, User, Key, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import FloatingAnimals from '../components/FloatingAnimals';

interface ProfileData {
  username: string;
  email: string;
  bio: string;
  preferred_language: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('username, email, bio, preferred_language')
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

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile?.username,
          bio: profile?.bio,
          preferred_language: profile?.preferred_language
        })
        .eq('id', user.id);

      if (error) throw error;
      setSuccess('Profile updated successfully! ✨');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/login');
    }
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-2xl p-6 shadow-soft h-fit">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-300" />
                </div>
              </div>
              <div>
                <h2 className="font-semibold">{profile?.username}</h2>
                <p className="text-sm text-gray-500">{profile?.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 text-primary-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left ${
                  activeTab === 'general'
                    ? 'bg-primary-50 text-primary-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left ${
                  activeTab === 'security'
                    ? 'bg-primary-50 text-primary-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Key className="w-5 h-5" />
                <span>Security</span>
              </button>
            </nav>

            <div className="mt-8 pt-8 border-t">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-primary-300" />
                  </div>
                  <h2 className="text-2xl font-bold gradient-text mb-2">{profile?.username} ✨</h2>
                  <p className="text-gray-600">{profile?.email}</p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-primary-50/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary-600 mb-4">About Me</h3>
                    <p className="text-gray-700">{profile?.bio || "No bio yet... ✨"}</p>
                  </div>

                  <div className="bg-primary-50/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary-600 mb-4">Preferred Language</h3>
                    <p className="text-gray-700">{profile?.preferred_language || "Not set yet... 🌈"}</p>
                  </div>

                  <button
                    onClick={() => setActiveTab('general')}
                    className="kawaii-button w-full"
                  >
                    Edit Profile ✨
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'general' && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-6">General Information</h3>
                <form onSubmit={handleSaveChanges} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      value={profile?.username || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev!, username: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile?.email || ''}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                    />
                    <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      value={profile?.bio || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev!, bio: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Language
                    </label>
                    <select
                      value={profile?.preferred_language || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev!, preferred_language: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">Select a language</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Russian">Russian</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saveLoading}
                      className="kawaii-button px-6 py-2"
                    >
                      {saveLoading ? 'Saving...' : 'Save Changes ✨'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-6">Security Settings</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="kawaii-button px-6 py-2"
                    >
                      Update Password ✨
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 