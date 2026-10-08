import React from "react";
import { cn } from "@/lib/utils";

const InterviewCardSkeleton = () => {
  return (
    <div 
      className="card-border w-[360px] max-sm:w-full min-h-96"
      role="status" 
      aria-label="Loading interview card"
      aria-busy="true"
    >
      <div className="card-interview">
        <div>
          {/* Type badge placeholder */}
          <div className="absolute top-0 right-0 w-16 h-7 rounded-bl-lg bg-white/10 animate-pulse" />
          
          {/* Cover image circle placeholder */}
          <div className="w-[90px] h-[90px] rounded-full bg-white/10 animate-pulse" />
          
          {/* Title placeholder */}
          <div className={cn("h-6 w-48 mt-5 bg-white/10 animate-pulse", "rounded-md")} />
          
          {/* Date row placeholders */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[22px] h-[22px] rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-24 bg-white/10 animate-pulse rounded-md" />
            </div>
            
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[22px] h-[22px] rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-16 bg-white/10 animate-pulse rounded-md" />
            </div>
          </div>
          
          {/* Assessment text placeholders */}
          <div className="mt-5 space-y-2">
            <div className="h-4 w-full bg-white/10 animate-pulse rounded-md" />
            <div className="h-4 w-4/5 bg-white/10 animate-pulse rounded-md" />
          </div>
        </div>
        
        <div className="flex flex-row justify-between mt-6">
          {/* Tech icons placeholder */}
          <div className="flex flex-row gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 animate-pulse" />
            <div className="w-6 h-6 rounded-full bg-white/10 animate-pulse" />
            <div className="w-6 h-6 rounded-full bg-white/10 animate-pulse" />
          </div>
          
          {/* Button placeholder */}
          <div className="h-10 w-32 rounded-full bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default InterviewCardSkeleton;