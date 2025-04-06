
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  // Helper function to group consecutive messages from the same user
  const groupMessagesBySender = (msgs: Message[]) => {
    const groups: Message[][] = [];
    let currentGroup: Message[] = [];
    let currentSenderId = '';

    msgs.forEach((message) => {
      if (message.senderId !== currentSenderId) {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
        }
        currentGroup = [message];
        currentSenderId = message.senderId;
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  const messageGroups = groupMessagesBySender(messages);

  return (
    <div className="space-y-4">
      {messageGroups.map((group, groupIndex) => {
        const isCurrentUser = group[0].senderId === currentUserId;
        
        return (
          <div 
            key={`group-${groupIndex}`} 
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
              {/* Avatar (only show for other users) */}
              {!isCurrentUser && (
                <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
              
              <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                {group.map((message, i) => (
                  <div 
                    key={message.id} 
                    className={`mb-1 ${i === group.length - 1 ? 'mb-0' : ''}`}
                  >
                    <div 
                      className={`py-2 px-3 rounded-lg ${
                        isCurrentUser 
                          ? 'bg-brand-600 text-white rounded-tr-none' 
                          : 'bg-gray-200 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                    
                    {i === group.length - 1 && (
                      <div className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                        {message.timestamp}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;