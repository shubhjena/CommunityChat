import React from "react";
import { Message } from "./MessageBox";

// Function to format the time
const formatTime = (date: Date | string): string => {
  if (!date) return "";
  const dateObject = new Date(date);
  return isNaN(dateObject.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(dateObject);
};

// Component to render individual messages
const Message = ({
  message,
  userId,
  sameId,
}: {
  message: Message;
  userId: string;
  sameId: boolean;
}) => (
  <div
    className={`flex flex-col pt-2 pb-1 px-5 max-w-md text-white mb-0.5 rounded-2xl ${
      message.sender === userId
        ? `bg-blue-500 ml-auto ${sameId ? "" : "rounded-se"}`
        : `bg-slate-500 mr-auto ${sameId ? "" : "rounded-ss"}`
    } ${sameId ? "" : "mt-1"} `}
  >
    <p
      className={`text-xxs font-bold ${
        message.sender === userId || sameId ? "hidden" : "block"
      }`}
    >
      {message.sender}
    </p>
    <p className="text-md break-words">{message.text}</p>
    <p className="text-xxs text-right text-gray-300">
      {formatTime(message.sendTime)}
    </p>
  </div>
);

export default Message;
