"use client";
import ChatHeader from "./ChatHeader";
import MessageBox from "./MessageBox";
import MessageContainer from "./MessageContainer";

const Chat: React.FC<{ chatId: string }> = ({ chatId }) => {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader chatId={chatId} />
      <div
        className="px-16 flex-1 flex flex-col bg-cover bg-left-bottom pt-12 pb-5 h-[100vh]"
        style={{ backgroundImage: 'url("/ChatBackground.jpg")' }}
      >
        <MessageContainer />
        <MessageBox />
      </div>
    </div>
  );
};

export default Chat;
