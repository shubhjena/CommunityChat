import React from "react";

export default function ChatHeader({chatId = "Chat Title" }) {
  return (
    <div className="fixed top-0 w-screen pt-5 pb-3 px-16 font-sans font-semibold text-2xl tracking-wider border-b border-dashed bg-black">
      {chatId}
    </div>
  );
}
