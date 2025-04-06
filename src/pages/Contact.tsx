
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-brand-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Our Office</h3>
                    <p className="text-gray-600 mt-1">
                      123 Innovation Street<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-brand-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email Us</h3>
                    <p className="text-gray-600 mt-1">
                      info@talentconnect.com<br />
                      support@talentconnect.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-brand-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Call Us</h3>
                    <p className="text-gray-600 mt-1">
                      +1 (555) 123-4567<br />
                      Mon-Fri 9AM to 6PM PST
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and our team will get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="john.doe@example.com" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    placeholder="How can we help you?" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Please provide details about your inquiry..." 
                    rows={5}
                    required 
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;