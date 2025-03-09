'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sign up with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      });

      if (authError) {
        console.error('Auth Error:', authError);
        throw authError;
      }

      if (authData.user) {
        console.log('User created:', authData.user);
        
        // Create profile after successful signup
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              username: formData.username,
              email: formData.email
            }
          ]);

        if (profileError) {
          console.error('Profile Error:', profileError);
          throw profileError;
        }

        // Redirect to login page after successful signup
        router.push('/login?message=Please check your email to verify your account');
      }
    } catch (err: any) {
      console.error('Signup Error:', err);
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold gradient-text">Create your account</h2>
            <p className="mt-2 text-gray-600">Join VoiceLink and start communicating globally</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="kawaii-input mt-1 block w-full"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="kawaii-input mt-1 block w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="kawaii-input mt-1 block w-full"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="kawaii-button w-full flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Creating account...
                </>
              ) : (
                'Sign up ✨'
              )}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-pink-500 hover:text-pink-600 font-medium">
              Log in
            </Link>
          </p>

          <div className="flex gap-4">
            <Link 
              href="/" 
              className="flex-1 text-center kawaii-button-secondary"
            >
              ← Back to Home 🏠
            </Link>
            <Link 
              href="/demo" 
              className="flex-1 text-center kawaii-button"
            >
              Continue to Demo ✨
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-purple-100" />
        <Image
          src="/Diversepplphoto.png"
          alt="Diverse people using VoiceLink"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-10">
          <blockquote className="text-gray-700 italic">
            "Break language barriers and connect with anyone, anywhere, instantly."
          </blockquote>
        </div>
      </div>
    </div>
  );
} 