import React, { useState } from 'react';
import { MessageList } from './components/MessageList';
import { users, messages as initialMessages } from './data';
import { MessageCircle, Users, Send, Menu, X } from 'lucide-react';

function App() {
  const currentUserId = '2'; // Marcus
  const activeChatUser = users.find(u => u.id === '1'); // Clara
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [shouldPlayStatus, setShouldPlayStatus] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim() || isVideoPlaying) return;

    const newMessageObj = {
      id: String(Date.now()),
      senderId: currentUserId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      hasPlayedStatus: []
    };

    setMessages(prev => [...prev, newMessageObj]);
    setNewMessage('');
    setShouldPlayStatus(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isVideoPlaying) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const OnlineStatus = ({ isOnline }: { isOnline: boolean }) => (
    <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} ring-2 ring-white`} />
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`
        w-64 bg-[#4A1D3F] text-white flex flex-col
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-200 ease-in-out
      `}>
        <div className="p-4 border-b border-[#5D2850] flex justify-between items-center">
          <h1 className="text-xl font-bold">Fack</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-[#5D2850] rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-2">
          <div className="flex items-center gap-2 p-2 bg-[#5D2850] rounded-md">
            <MessageCircle size={20} />
            <span>#nag-a-coworker</span>
          </div>
          
          <div className="flex items-center gap-2 p-2 opacity-60 hover:opacity-100">
            <Users size={20} />
            <span>People</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="p-4 border-t border-[#5D2850]">
            {/* Current user */}
            {users.find(u => u.id === currentUserId) && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={users.find(u => u.id === currentUserId)?.profileUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <OnlineStatus isOnline={users.find(u => u.id === currentUserId)?.online ?? false} />
                  </div>
                </div>
                <div>
                  <div className="font-medium">
                    {users.find(u => u.id === currentUserId)?.name}
                  </div>
                  <div className="text-sm opacity-75">
                    {users.find(u => u.id === currentUserId)?.jobTitle}
                  </div>
                  <div className="text-xs text-[#FFD700] font-medium mt-1">
                    {users.find(u => u.id === currentUserId)?.status?.title}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Copyright line */}
          <div className="px-4 pb-2 text-xs text-gray-400">
  github: 
  <a href="https://github.com/taraferguson" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
    @taraferguson
  </a>
</div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        <div className="h-20 border-b bg-white px-4 flex items-center gap-3">
          {/* Menu button moved to the left side of the header */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Menu size={24} />
          </button>
          
          {activeChatUser && (
            <>
              <div className="relative">
                <img
                  src={activeChatUser.profileUrl}
                  alt={activeChatUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="absolute -bottom-0.5 -right-0.5">
                  <OnlineStatus isOnline={activeChatUser.online} />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold truncate">{activeChatUser.name}</h2>
                <div className="text-sm text-gray-500 truncate">{activeChatUser.jobTitle}</div>
                <div className="text-xs text-red-500 font-medium truncate">Unavailable until Monday at 9 AM ET</div>
              </div>
            </>
          )}
        </div>

        <MessageList
          messages={messages}
          users={users}
          currentUserId={currentUserId}
          shouldPlayStatus={shouldPlayStatus}
          onStatusPlayed={() => {
            setShouldPlayStatus(false);
            setIsVideoPlaying(false);
          }}
          onVideoStart={() => setIsVideoPlaying(true)}
        />

        {/* Message input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isVideoPlaying}
              placeholder={isVideoPlaying ? "You were warned..." : (window.innerWidth < 640 ? "Message one more time..." : "Message Clara again, I dare you...")}
              className={`flex-1 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A1D3F] focus:border-transparent ${
                isVideoPlaying ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <button
              onClick={handleSendMessage}
              disabled={isVideoPlaying}
              className={`px-4 py-2 bg-[#4A1D3F] text-white rounded-md hover:bg-[#5D2850] transition-colors flex items-center gap-2 whitespace-nowrap ${
                isVideoPlaying ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Send size={18} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;