
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';

interface Conversation {
  id: string;
  userName: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold flex-grow">Messages</h2>
          <Button variant="ghost" size="icon" className="text-brand-600">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {filteredConversations.length > 0 ? (
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <Link
                to={`/messages/${conversation.id}`}
                key={conversation.id}
                className={`
                  block px-4 py-3 hover:bg-gray-50 transition-colors
                  ${activeConversationId === conversation.id ? 'bg-gray-100' : ''}
                `}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex items-start">
                  <div className="relative">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={conversation.avatar} alt={conversation.userName} />
                      <AvatarFallback>{conversation.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.unread && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-brand-600 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.userName}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;