import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useStateProvider } from "../../context/StateProvider";
import { useSocket } from "../../context/SocketProvider";

export default function MessageBox() {
  const { sendMessage } = useSocket();
  const [{ selectedChat, userId }] = useStateProvider();
  const [input, setInput] = useState("");

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      sendMessage({
        text: input,
        sender: userId,
        sendTime: new Date(),
        chatId: selectedChat,
      });
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

  return (
    <div className="items-center fixed bottom-8 w-8/12">
      <div className="flex bg-zinc-950 border border-gray-500 w-full rounded-2xl">
        <input
          type="text"
          className="flex-1 p-4 bg-transparent border-gray-500 rounded-l-2xl outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-4 rounded-r-2xl text-sky-200 hover:text-blue-700 transition-all duration-200 text-2xl"
          onClick={handleSendMessage}
        >
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
}
