export interface ChatMessage {
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
} 