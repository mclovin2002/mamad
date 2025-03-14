'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Volume2, Mail, ChevronDown, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface MessageForm {
  name: string;
  email: string;
  message: string;
}

export default function Setup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  
  const [permissions, setPermissions] = useState({
    microphone: false,
    audio: false
  });

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian'
  ];

  const [messageForm, setMessageForm] = useState<MessageForm>({
    name: '',
    email: '',
    message: ''
  });

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissions(prev => ({ ...prev, microphone: true }));
      // Stop the stream since we only needed permission
      stream.getTracks().forEach(track => track.stop());
      setSuccess('Microphone access granted!');
    } catch (err) {
      setError('Could not access microphone. Please check your browser settings.');
    }
  };

  const requestAudioPermission = async () => {
    try {
      // Create an audio context to test audio output
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      setPermissions(prev => ({ ...prev, audio: true }));
      setSuccess('Audio system access granted!');
    } catch (err) {
      setError('Could not access audio system. Please check your browser settings.');
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Here you would typically call your API to send the invitation email
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(`Invitation sent to ${inviteEmail}!`);
      setInviteEmail('');
    } catch (err) {
      setError('Failed to send invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            preferred_language: selectedLanguage,
            microphone_enabled: permissions.microphone,
            audio_enabled: permissions.audio
          })
          .eq('id', user.id);

        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Failed to save preferences. Please try again.');
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageForm),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess('Message sent successfully!');
      setMessageForm({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Setup Your Preferences</h1>
          <p className="text-lg text-gray-600">Let's get your communication environment ready</p>
        </div>

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

        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Language Preference</h2>
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-full flex items-center justify-between px-4 py-3 border rounded-lg hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-primary-50 flex items-center"
                  >
                    {lang}
                    {selectedLanguage === lang && (
                      <Check className="w-5 h-5 ml-auto text-primary-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">System Permissions</h2>
          <div className="space-y-4">
            <button
              onClick={requestMicrophonePermission}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-lg border ${
                permissions.microphone
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'hover:border-primary-500'
              }`}
            >
              <div className="flex items-center">
                <Mic className="w-6 h-6 mr-3" />
                <span>Microphone Access</span>
              </div>
              {permissions.microphone && <Check className="w-6 h-6" />}
            </button>

            <button
              onClick={requestAudioPermission}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-lg border ${
                permissions.audio
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'hover:border-primary-500'
              }`}
            >
              <div className="flex items-center">
                <Volume2 className="w-6 h-6 mr-3" />
                <span>Audio System Access</span>
              </div>
              {permissions.audio && <Check className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Invite Participants</h2>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Send Invite</span>
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Send Message</h2>
          <form onSubmit={handleMessageSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={messageForm.name}
                onChange={(e) => setMessageForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-6 py-4 bg-blue-50/50 border border-gray-200 focus:outline-none rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={messageForm.email}
                onChange={(e) => setMessageForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-6 py-4 bg-blue-50/50 border border-gray-200 focus:outline-none rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={messageForm.message}
                onChange={(e) => setMessageForm(prev => ({ ...prev, message: e.target.value }))}
                rows={6}
                className="w-full px-6 py-4 bg-blue-50/50 border border-gray-200 focus:outline-none resize-none rounded-md"
                placeholder="Type your message here..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
              <span>✨</span>
            </button>
          </form>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={savePreferences}
            className="flex-1 kawaii-button-secondary flex justify-center items-center"
          >
            Continue to Dashboard 🎯
          </button>
          <Link 
            href="/demo" 
            className="flex-1 kawaii-button flex justify-center items-center"
          >
            Continue to Demo ✨
          </Link>
        </div>
      </div>
    </div>
  );
} 