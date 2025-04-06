
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}

interface CommentSectionProps {
  projectId: string;
  comments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ projectId, comments: initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const form = useForm<{ comment: string }>();

  const handleSubmitComment = (data: { comment: string }) => {
    if (!data.comment.trim()) return;

    // In a real app, this would be an API call
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: '1', // Hardcoded current user ID for demo
      userName: 'Your Name', // Hardcoded current user name for demo
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', // Hardcoded avatar for demo
      text: data.comment,
      timestamp: new Date().toISOString(),
    };

    setComments([...comments, newComment]);
    form.reset();
    toast({
      title: "Comment posted",
      description: "Your comment has been successfully posted."
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      </div>

      {/* Comment form */}
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitComment)} className="space-y-4">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your thoughts on this project..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="flex space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{comment.userName}</h4>
                      <p className="text-xs text-gray-500">{formatDate(comment.timestamp)}</p>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;