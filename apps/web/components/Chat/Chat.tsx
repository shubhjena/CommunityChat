"use client";
import React, { useEffect, useRef } from "react";
import { useStateProvider } from "../../context/StateProvider";
import MessageBox from "./MessageBox";
import ChatContainer from "./ChatContainer";

export default function Chat({ chatId = "Chat Title" }) {
  const [{ messages }] = useStateProvider();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex-1 flex flex-col h-screen ">
      {/* Chat header */}
      <div className="fixed top-0 w-screen pt-5 pb-3 px-16 font-sans font-semibold text-2xl tracking-wider border-b border-dashed bg-black">
        {chatId}
      </div>
      {/* Chat container */}
      <div
        className="px-16 flex-1 flex flex-col bg-cover bg-left-bottom pt-12 pb-24 h-[100vh]"
        style={{ backgroundImage: 'url("/ChatBackground.jpg")' }}
      >
        <ChatContainer />
        <MessageBox />
      </div>
    </div>
  );
}
