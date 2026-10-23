import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Professional Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1a1a2e] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/robot.png" 
            alt="Interview Practice" 
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo and Badge */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Image src="/logo.svg" alt="Logo" width={48} height={48} />
              <h2 className="text-2xl font-bold">Interview Ninja</h2>
            </div>
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20 mb-8">
              AI-POWERED INTERVIEW PREPARATION
            </div>
          </div>

          {/* Main Heading */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              DISCOVER THE
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#cac5fe] to-[#a8a4ff]">
                NEXT ERA
              </span>
              OF INTERVIEWS.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join thousands of professionals mastering their interview skills with AI-powered practice, instant feedback, and personalized guidance.
            </p>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-[#1a1a2e]"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-[#1a1a2e]"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-[#1a1a2e]"></div>
            </div>
            <div className="text-sm">
              <p className="font-semibold">Join 10,000+ Users</p>
              <p className="text-gray-400">Mastering Their Interview Skills</p>
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
