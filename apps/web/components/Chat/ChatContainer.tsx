import React, { useEffect, useRef } from "react";
import { useStateProvider } from "../../context/StateProvider";
import Message from "./Message";

export default function ChatContainer() {
  const [{ messages, userId, selectedChat }] = useStateProvider();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

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

  // Function to check if two dates are on the same day
  const isSameId = (user1: string, user2: string): boolean => {
    return user1 === user2;
  };

  // Effect to scroll to the bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="overflow-y-auto pt-4 px-4 flex flex-col custom-scrollbar"
      ref={messagesContainerRef}
    >
      {messages
        .map((message, index) => (
          <div key={index} className="flex flex-col">
            {index === 0 ||
            !isSameDay(
              new Date(message.sendTime),
              new Date(messages[index - 1].sendTime)
            ) ? (
              // Display date if it's a new day
              <p className="mx-auto text-center text-xxs text-gray-400 mt-2 mb-1.5 bg-zinc-700 p-1 px-2 rounded-md bg-opacity-75 shadow">
                {formatDate(new Date(message.sendTime))}
              </p>
            ) : null}
            {/* Render individual message */}
            {index === 0 ||
            !isSameId(message.sender, messages[index - 1].sender) ? (
              <Message
                key={index}
                message={message}
                userId={userId}
                sameId={false}
              />
            ) : (
              <Message
                key={index}
                message={message}
                userId={userId}
                sameId={true}
              />
            )}
          </div>
        ))}
      {messages.length === 0 && (
        <div
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 w-full text-gray-300`}
        >
          <span className="block tracking-wide">
            Your messages will appear here....
          </span>
          {/* <span className="block text-sm font-thin">hey!</span> */}
        </div>
      )}
    </div>
  );
}
