"use client";
import React, { useEffect } from "react";
import Empty from "../components/Empty";
import ChatList from "../components/ChatList";
import { useStateProvider } from "../context/StateProvider";
import Chat from "../components/Chat/Chat";
import Message from "../components/Chat/Message";
import shortid from "shortid";

export default function page() {
  const [{ selectedChat }, dispatch] = useStateProvider();

  const parseMessage = (rawMessage: {
    id: string;
    text: string;
    sender: string;
    createdAt: string;
    updatedAt: string;
    chatId: string;
  }): Message => {
    try {
      return {
        text: rawMessage.text,
        sender: rawMessage.sender,
        sendTime: new Date(rawMessage.updatedAt),
        chatId: rawMessage.chatId,
      };
    } catch (error) {
      console.error("Error parsing message:", error);
      // Handle the error, or return a default message
      return {
        text: "Error parsing message",
        sender: "Unknown sender",
        sendTime: new Date(),
        chatId: rawMessage.chatId,
      };
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/messages?chatId=${selectedChat}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const messagesData = await response.json();
        const parsedMessages = messagesData.map(parseMessage);
        dispatch({ type: "SET_MESSAGES", payload: parsedMessages });
        // setMessages(parsedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (selectedChat) getMessages();
  }, [selectedChat]);

  useEffect(() => {
    //get userid from local storage
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = shortid.generate();
      localStorage.setItem("userId", storedUserId);
    }
    dispatch({ type: "SET_USER_ID", payload: storedUserId });
  }, []);

  return (
    <div className={`grid grid-cols-[1fr,3fr] h-screen max-h-screen`}>
      <ChatList />
      {selectedChat ? <Chat chatId={selectedChat} /> : <Empty />}
    </div>
  );
}
