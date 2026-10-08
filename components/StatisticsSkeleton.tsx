import React from "react";

const StatisticsSkeleton = () => {
  return (
    <div 
      className="flex flex-row gap-6"
      role="status" 
      aria-label="Loading statistics"
      aria-busy="true"
    >
      {[1, 2, 3].map((i) => (
        <div 
          key={i}
          className="flex-1 h-24 bg-white/5 rounded-lg p-4 border border-white/10"
        >
          <div className="h-8 w-16 bg-white/10 animate-pulse rounded-md mb-3" />
          <div className="h-4 w-32 bg-white/10 animate-pulse rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default StatisticsSkeleton;