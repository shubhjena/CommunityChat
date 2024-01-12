"use client"
import React from 'react'
import { useStateProvider } from '../context/StateProvider';

export default function ChatList() {
    const [{selectedChat}, dispatch] = useStateProvider(); 
    const chats = ['Chat_1', 'Chat_2', 'Chat_3'];

    const handleChatSelect = (chatId: string) => {
      dispatch({ type: 'SELECT_CHAT', payload: chatId });
    };

  return (
    <div className='h-screen py-5 px-2 bg-blue-950'>
      <h2 className='text-xl mb-4 font-sans font-semibold px-3'>Community Chat App</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat} onClick={() => handleChatSelect(chat)} className={` p-3 text-lg rounded  ${chat === selectedChat? " w-full bg-gray-500":""}`}>
            {chat}
          </li>
        ))}
      </ul>
    </div>
  )
}