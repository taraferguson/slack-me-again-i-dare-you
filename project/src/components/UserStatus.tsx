import React from 'react';
import { User } from '../types';

interface UserStatusProps {
  user: User;
  onStatusPlayed: () => void;
  forcePlay?: boolean;
}

export function UserStatus({ user, onStatusPlayed, forcePlay = false }: UserStatusProps) {
  const [isPlaying, setIsPlaying] = React.useState(forcePlay);
  const [isClosing, setIsClosing] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  if (!user.status) return null;

  const getEmbedUrl = (url: string, type: string) => {
    if (type === 'video') {
      // Ensure proper YouTube embed URL with all necessary parameters
      return `https://www.youtube-nocookie.com/embed/${url}?enablejsapi=1&autoplay=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`;
    }
    return url;
  };

  const handleClose = () => {
    setIsClosing(true);
    // Try to stop the video if possible
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.src = iframe.src;
    }
    setTimeout(() => {
      setIsPlaying(false);
      onStatusPlayed();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ display: isPlaying ? 'flex' : 'none' }}
    >
      <div className="bg-white rounded-lg p-4 max-w-2xl w-full mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2 z-10"
        >
          ✕
        </button>
        
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.profileUrl}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.status.title}</p>
          </div>
        </div>
        
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden relative">
          <iframe
            ref={iframeRef}
            src={getEmbedUrl(user.status.url, user.status.type)}
            className="w-full h-full absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}