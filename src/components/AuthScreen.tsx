import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { Sparkles, Mail, Lock, User, ArrowRight, Heart, ShieldCheck } from 'lucide-react';

interface AuthScreenProps {
  onAuthenticate: (profile: UserProfile) => void;
  onGuestContinue: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthenticate,
  onGuestContinue
}) => {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('Software Builder');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const displayName = name.trim() || (email ? email.split('@')[0] : 'Mindful Builder');
      const initials = displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'JK';

      const newProfile: UserProfile = {
        name: displayName,
        email: email || 'user@jareak.sanctuary',
        title: title || 'Thoughtful Explorer',
        joinedDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        avatarInitials: initials,
        soundEnabled: true,
        autoArchiveNotes: true,
        notificationsEnabled: true,
        themePreference: 'morning'
      };

      onAuthenticate(newProfile);
    }, 600);
  };

  const handleGoogleAuth = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const googleProfile: UserProfile = {
        name: 'Alex Rivera',
        email: 'alex.rivera@gmail.com',
        title: 'Full Stack Creator',
        joinedDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        avatarInitials: 'AR',
        soundEnabled: true,
        autoArchiveNotes: true,
        notificationsEnabled: true,
        themePreference: 'morning'
      };
      onAuthenticate(googleProfile);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f2ed] text-[#3e2a1e] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Soft Ambiance Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#d2b48c]/30 rounded-full blur-2xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-[#fffdfa] border-4 border-[#5d4037] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Top Emblem & Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#5d4037] text-amber-100 flex items-center justify-center font-serif font-bold text-2xl shadow-md border border-amber-300/30">
            J
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#3e2a1e]">
            {mode === 'signup' ? 'Create Your Memory Space' : 'Welcome Back to Jareak'}
          </h1>
          <p className="text-xs sm:text-sm font-serif italic text-[#8d6e63] mt-1">
            "A personal sanctuary where your daily growth belongs to you."
          </p>
        </div>

        {/* Tab Switcher: Sign Up / Login */}
        <div className="flex p-1 bg-[#f5f2ed] rounded-xl border border-[#d2b48c]/60 mb-6">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 text-xs font-serif font-medium rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#5d4037] text-amber-100 shadow-sm'
                : 'text-[#8d6e63] hover:text-[#3e2a1e]'
            }`}
          >
            Create Space
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 text-xs font-serif font-medium rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#5d4037] text-amber-100 shadow-sm'
                : 'text-[#8d6e63] hover:text-[#3e2a1e]'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                key="signup-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] font-semibold mb-1">
                    Your Name or Handle
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8d6e63] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full pl-9 pr-3 py-2 bg-[#f5f2ed] border border-[#d2b48c] rounded-xl text-sm font-serif text-[#3e2a1e] focus:outline-none focus:ring-2 focus:ring-[#5d4037]/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] font-semibold mb-1">
                    Primary Focus Role
                  </label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f5f2ed] border border-[#d2b48c] rounded-xl text-sm font-serif text-[#3e2a1e] focus:outline-none focus:ring-2 focus:ring-[#5d4037]/50"
                  >
                    <option value="Software Builder">Software Builder</option>
                    <option value="Mindful Writer">Mindful Writer</option>
                    <option value="Fitness Explorer">Fitness Explorer</option>
                    <option value="Academic Scholar">Academic Scholar</option>
                    <option value="Creative Artist">Creative Artist</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] font-semibold mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8d6e63] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@sanctuary.com"
                className="w-full pl-9 pr-3 py-2 bg-[#f5f2ed] border border-[#d2b48c] rounded-xl text-sm font-serif text-[#3e2a1e] focus:outline-none focus:ring-2 focus:ring-[#5d4037]/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#5d4037] font-semibold mb-1">
              Secret Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8d6e63] absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 bg-[#f5f2ed] border border-[#d2b48c] rounded-xl text-sm font-serif text-[#3e2a1e] focus:outline-none focus:ring-2 focus:ring-[#5d4037]/50"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-[#5d4037] hover:bg-[#3e2a1e] text-amber-100 text-xs sm:text-sm font-serif font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <>
                <span>{mode === 'signup' ? 'Enter Sanctuary' : 'Unlock Room'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-[#d2b48c]" />
          <span className="text-[11px] font-serif text-[#8d6e63] italic">or continue with</span>
          <div className="flex-1 h-px bg-[#d2b48c]" />
        </div>

        {/* Google Authentication Button */}
        <button
          onClick={handleGoogleAuth}
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 rounded-xl border border-[#d2b48c] bg-white hover:bg-[#f5f2ed] text-xs font-serif text-[#3e2a1e] font-medium shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Quick Guest Enter */}
        <div className="mt-4 text-center">
          <button
            onClick={onGuestContinue}
            className="text-xs font-serif text-[#8d6e63] hover:text-[#3e2a1e] underline cursor-pointer"
          >
            Skip auth & continue as quiet guest
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-3 border-t border-[#e9e1d6] flex items-center justify-center gap-1.5 text-[10px] font-serif text-[#8d6e63]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
          <span>Private & local persistence by default</span>
        </div>
      </motion.div>
    </div>
  );
};
