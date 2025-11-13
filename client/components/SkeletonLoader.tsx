import React from "react";

const SkeletonLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-shimmer" />
    </div>
  );
};

export default SkeletonLoader;
