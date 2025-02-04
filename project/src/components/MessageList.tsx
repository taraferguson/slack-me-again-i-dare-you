import React from 'react';
import { Message, User } from '../types';

interface MessageListProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
  shouldPlayStatus: boolean;
  onStatusPlayed: () => void;
  onVideoStart: () => void;
}

export function MessageList({ messages, users, currentUserId, shouldPlayStatus, onStatusPlayed, onVideoStart }: MessageListProps) {
  const sarah = users.find(u => u.id === '1');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = React.useState(false);

  React.useEffect(() => {
    if (shouldPlayStatus && !isVideoVisible) {
      setIsVideoVisible(true);
      onVideoStart();
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shouldPlayStatus, onVideoStart]);

  const handleVideoEnd = () => {
    setIsVideoVisible(false);
    onStatusPlayed();
  };

  const OnlineStatus = ({ isOnline }: { isOnline: boolean }) => (
    <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} ring-2 ring-white`} />
  );

  return (
    <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
      {messages.map((message) => {
        const sender = users.find(u => u.id === message.senderId);
        if (!sender) return null;

        return (
          <div key={message.id} className="flex items-start gap-2 sm:gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={sender.profileUrl}
                alt={sender.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5">
                <OnlineStatus isOnline={sender.online} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">{sender.name}</span>
                <span className="text-sm text-gray-500 truncate">{sender.jobTitle}</span>
                <span className="text-xs text-gray-400">
                  {message.timestamp}
                </span>
              </div>
              <p className="mt-1 text-gray-700 break-words">{message.content}</p>
            </div>
          </div>
        );
      })}

      {isVideoVisible && sarah?.status && (
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={sarah.profileUrl}
              alt={sarah.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5">
              <OnlineStatus isOnline={sarah.online} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-semibold text-gray-900">{sarah.name}</span>
              <span className="text-sm text-gray-500 truncate">{sarah.status.title}</span>
            </div>
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-3">
              Clara is in Do Not Disturb Mode and has set this video as her answering machine recording. Enjoy!
            </div>
            <div className="rounded-lg overflow-hidden bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${sarah.status.url}&rel=0&controls=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => {
                  // Calculate video duration (180 seconds = 3 minutes)
                  const videoDuration = 180;
                  setTimeout(handleVideoEnd, videoDuration * 1000);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}