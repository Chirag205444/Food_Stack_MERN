import React from "react";

export default function SkeletonHome() {
  return (
    <div className="space-y-4 p-4">
      <div className="h-24 w-full bg-gray-300 rounded animate-pulse"></div>
      <div className="h-24 w-full bg-gray-300 rounded animate-pulse"></div>
      <div className="h-24 w-full bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
}