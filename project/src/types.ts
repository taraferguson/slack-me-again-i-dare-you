export interface User {
  id: string;
  name: string;
  jobTitle: string;
  profileUrl: string;
  status: {
    type: 'video' | 'song';
    url: string;
    title: string;
  } | null;
  online: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  hasPlayedStatus: string[]; // Array of user IDs who've seen the status
}