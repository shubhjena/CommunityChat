import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useStateProvider } from "../../context/StateProvider";
import { io } from "socket.io-client";

export interface Message {
  text: string;
  sender: string;
  sendTime: Date;
  chatId: string;
}

export default function MessageBox() {
  const [{ selectedChat, userId, socket }, dispatch] = useStateProvider();
  const [input, setInput] = useState("");

  const onMessageRec = useCallback((msg: string) => {
    const { message } = JSON.parse(msg) as { message: Message };
    dispatch({ type: "ADD_MESSAGE", payload: message });
  }, []);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (input.trim() !== "" && socket) {
      const newMessage: Message = {
        text: input,
        sender: userId,
        sendTime: new Date(),
        chatId: selectedChat,
      };
      console.log(selectedChat)
      socket.emit("event:message", { message: newMessage });
      setInput("");
    }
  };

  // Function to handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    //listen to backend for new messages
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRec);
    dispatch({ type: "SET_SOCKET", payload: _socket });

    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      dispatch({ type: "SET_SOCKET", payload: undefined });
    };
  }, [onMessageRec]);

  useEffect(() => {
    setInput("");
  }, [selectedChat]);

  return (
    <div className="items-center relative bottom-0 pt-0.5">
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
