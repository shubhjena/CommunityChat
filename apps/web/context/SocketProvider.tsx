"use client";
import React, { useState, useCallback, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import shortid from 'shortid';

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface Message {
  text: string;
  sender: string;
  sendTime: Date;
}

interface ISocketContext {
  sendMessage: (msg: Message) => any;
  messages: Message[];
  userId: string;
}

// context for socket
const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("socket state is undfined");
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);

  const userId = localStorage.getItem('userId') || shortid.generate(); // Retrieve or generate user ID

  useEffect(() => {
    localStorage.setItem('userId', userId); // Save the user ID to local storage
  }, [userId]);

  const parseMessage = (rawMessage: { text: string }): Message => {
    console.log(rawMessage.text);
  
    try {
      const parsedMessage = JSON.parse(rawMessage.text);
      return {
        ...parsedMessage.message,
        sendTime: new Date(parsedMessage.message.sendTime),
      };
    } catch (error) {
      console.error('Error parsing message:', error);
      // Handle the error, or return a default message
      return {
        text: 'Error parsing message',
        sender: 'Unknown sender',
        sendTime: new Date(),
      };
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8000/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const messagesData = await response.json();
      const parsedMessages = messagesData.map(parseMessage);
      console.log(parsedMessages)
      setMessages(parsedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      // console.log("Send message", msg);
      if (socket) {
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );

  const onMessageRec = useCallback((msg: string) => {
    const { message } = JSON.parse(msg) as { message: Message };
    console.log("Parsed From Server Msg Rec", message);

    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRec);
    setSocket(_socket);

    fetchMessages();

    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);
  return (
    <SocketContext.Provider value={{ sendMessage, messages, userId }}>
      {children}
    </SocketContext.Provider>
  );
};
