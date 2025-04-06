
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Send, Phone, Video } from 'lucide-react';
import MessageList from '@/components/messages/MessageList';
import ConversationList from '@/components/messages/ConversationList';

// Mock conversation data
const mockConversations = [
  {
    id: '1',
    userName: 'Alex Morgan',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    lastMessage: 'Hey, I saw your project and was wondering if you could help me with something?',
    timestamp: '2 hours ago',
    unread: true
  },
  {
    id: '2',
    userName: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Thanks for your help with the React component!',
    timestamp: 'Yesterday',
    unread: false
  },
  {
    id: '3',
    userName: 'Mike Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Would love to collaborate on a project sometime.',
    timestamp: '2 days ago',
    unread: false
  },
  {
    id: '4',
    userName: 'Emily Davis',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    lastMessage: 'Just sent you the design files for review.',
    timestamp: '1 week ago',
    unread: false
  }
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: '1',
    senderId: '2', // Not the current user
    text: 'Hey, I saw your project on Skill ShowCase Platform!',
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    senderId: '1', // Current user
    text: 'Thanks! Which one caught your attention?',
    timestamp: '10:32 AM'
  },
  {
    id: '3',
    senderId: '2',
    text: 'The e-commerce dashboard. I really liked the UI design and the analytics features.',
    timestamp: '10:35 AM'
  },
  {
    id: '4',
    senderId: '1',
    text: 'I appreciate that! I spent a lot of time on the UX flow for that project.',
    timestamp: '10:36 AM'
  },
  {
    id: '5',
    senderId: '2',
    text: 'It shows! Would you be interested in collaborating on a similar project? I have a client who needs a dashboard.',
    timestamp: '10:40 AM'
  }
];

const MessagesPage = () => {
  const { userId } = useParams();
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState<typeof mockConversations[0] | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  
  // Set active conversation based on URL param or default to first conversation
  useEffect(() => {
    if (userId) {
      const conversation = conversations.find(c => c.id === userId);
      if (conversation) {
        setActiveConversation(conversation);
      }
    } else if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [userId, conversations, activeConversation]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: '1', // Current user ID
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Conversations sidebar */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <ConversationList 
            conversations={conversations}
            activeConversationId={activeConversation?.id}
            onSelectConversation={(conversation) => setActiveConversation(conversation)}
          />
        </div>
        
        {/* Chat area */}
        <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={activeConversation.avatar} alt={activeConversation.userName} />
                    <AvatarFallback>{activeConversation.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{activeConversation.userName}</h3>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
                <MessageList messages={messages} currentUserId="1" />
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-grow"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim()}
                    size="icon"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list or start a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;