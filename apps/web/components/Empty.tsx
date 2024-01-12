import React from "react";

export default function Empty() {
  return (
    <div className="flex-1 bg-black flex flex-col items-center justify-center gap-0.5 w-full">
      <span className="block text-lg">Welcome to Community Chat App</span>
      <span className="block text-sm font-thin">Select any channel to start chatting!</span>
    </div>
  );
}
