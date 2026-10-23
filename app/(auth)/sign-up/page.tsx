import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Content */}
        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-8">
            <Image 
              src="/ai-avatar.png" 
              alt="AI Interview Assistant" 
              width={120} 
              height={120}
              className="animate-float"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Start Your Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Interview Ninja</span>
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals mastering their interview skills with AI-powered practice.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-lg">Join Our Community</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-lg">AI-Powered Learning</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg">Free to Get Started</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0a0a]">
        <div className="w-full max-w-md">
          <AuthForm type="sign-up"/>
        </div>
      </div>
    </div>
  )
}

export default page
