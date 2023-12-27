import React from "react";

interface Message {
  text: string;
  sender: string;
  sendTime: Date;
}

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
const Message = ({ message, userId }: { message: Message; userId: string }) => (
  <div className={message.sender === userId ? "ml-auto" : "mr-auto"}>
    <div
      className={`pt-2 pb-1 px-5 max-w-md text-white inline-block rounded-2xl mb-1.5 ${
        message.sender === userId ? "bg-blue-500" : "bg-slate-500"
      }`}
    >
      <p
        className={`text-xxs font-bold ${
          message.sender === userId ? "hidden" : "block"
        }`}
      >
        {message.sender}
      </p>
      <p className="text-lg">{message.text}</p>
      <p className="text-xxs text-right text-gray-300">
        {formatTime(message.sendTime)}
      </p>
    </div>
  </div>
);

export default Message;
