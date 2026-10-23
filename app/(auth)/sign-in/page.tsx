import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-12 items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Content */}
        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-8">
            <Image 
              src="/robot.png" 
              alt="AI Interview" 
              width={120} 
              height={120}
              className="animate-float"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Interview Ninja</span>
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Continue your journey to interview mastery with AI-powered practice sessions.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-lg">Personalized AI Interviews</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-lg">Track Your Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg">Instant Feedback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0a0a]">
        <div className="w-full max-w-md">
          <AuthForm type="sign-in"/>
        </div>
      </div>
    </div>
  )
}

export default page
