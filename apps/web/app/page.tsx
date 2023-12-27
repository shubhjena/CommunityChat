"use client";
import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [input, setInput] = useState("");
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      sendMessage({ text: input, sender: "user" });
      setInput(""); // Reset the input after sending the message
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className="max-w-4xl h-screen mx-auto px-4 bg-zinc-700 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 p-8">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === "user" ? "text-right" : "text-left"}
          >
            <div className="p-2 bg-blue-500 text-white inline-block rounded-lg mb-1">
              {message.text}
            </div>
          </div>
        ))}
        <div className={messages.length === 0 ? "block": "hidden"}>Your messages will appear here....</div>
      </div>
      <div className="flex items-center p-8">
        <input
          type="text"
          className="flex-1 p-4 border border-r-0 bg-zinc-700 border-gray-500 rounded-l-2xl outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-4 bg-zinc-700 hover:bg-zinc-600 border border-gray-500 rounded-r-2xl text-lime-500 transition-all duration-100"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
