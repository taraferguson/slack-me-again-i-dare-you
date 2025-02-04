import { User, Message } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'Clara Pergamun',
    jobTitle: 'Senior Product Manager',
    profileUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    status: {
      type: 'video',
      url: 'uejh-bHa4To?si=6iCjtJ_Re1kEoBK7&autoplay=1&start=67',
      title: 'Limited avail due to family emergency'
    },
    online: false
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    jobTitle: 'Account Executive',
    profileUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    status: {
      type: 'song',
      url: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT',
      title: 'Crushing SaaS and kicking A$$'
    },
    online: true
  },
];

export const messages: Message[] = [
  {
    id: '1',
    senderId: '2',
    content: 'Hey C, could you review the latest set of feature requests from the client and provide a timeline for dev? Thx',
    timestamp: '1 hour ago',
    hasPlayedStatus: []
  },
  {
    id: '2',
    senderId: '2',
    content: 'Hey Clara.... Still waiting on your review. I know your busy, but if I dont hear back soon, I might have to loop in Boss so he knows the client onboarding timeline is jeopardized. I would hate for this opp to end up Closed Lost because product is not appropriately enabling new business?! Let me know when you have a chance. Thanks.',
    timestamp: '5 minutes ago',
    hasPlayedStatus: []
  }
];