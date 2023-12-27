"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketProvider";
import Message from "../components/Message";

// Function to format the date
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Function to check if two dates are on the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

export default function Page() {
  const { sendMessage, messages, userId } = useSocket();
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      sendMessage({ text: input, sender: userId, sendTime: new Date() });
      setInput(""); // Reset the input after sending the message
    }
  };

  // Function to handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Effect to scroll to the bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-3xl h-screen mx-auto px-16 bg-zinc-700 flex flex-col">
      <div
        className="flex-1 overflow-y-auto mb-0.5 pt-4 px-4 flex flex-col custom-scrollbar"
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col">
            {index === 0 ||
            !isSameDay(
              new Date(messages[index - 1].sendTime),
              new Date(message.sendTime)
            ) ? (
              // Display date if it's a new day
              <p className="mx-auto text-center text-xxs text-gray-400 mt-2 mb-1.5 bg-zinc-900 p-1 px-2 rounded-md bg-opacity-75 shadow">
                {formatDate(new Date(message.sendTime))}
              </p>
            ) : null}
            {/* Render individual message */}
            <Message key={index} message={message} userId={userId} />
          </div>
        ))}
        <div className={messages.length === 0 ? "block" : "hidden"}>
          Your messages will appear here....
        </div>
      </div>
      {/* Input and send button */}
      <div className="flex items-center pb-8">
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
