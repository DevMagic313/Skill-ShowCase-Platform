
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Camera } from 'lucide-react';

// Mock user data - in a real app would come from context or API
const userData = {
  id: '1',
  name: 'Alex Morgan',
  title: 'Full Stack Developer',
  avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  location: 'San Francisco, CA',
  bio: 'Passionate full-stack developer with 5+ years of experience building web and mobile applications. Focused on creating intuitive, efficient, and scalable solutions that solve real-world problems.',
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 
    'Express', 'GraphQL', 'REST APIs', 'React Native', 'CSS/SCSS',
    'Tailwind CSS', 'AWS', 'Docker', 'Git'
  ],
  contactInfo: {
    email: 'alex.morgan@example.com',
    website: 'https://alexmorgan.dev',
    github: 'github.com/alexmorgan',
    twitter: 'twitter.com/alexmorgan',
    linkedin: 'linkedin.com/in/alexmorgan'
  }
};

// Define form validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  title: z.string().min(2, { message: "Professional title is required." }),
  location: z.string().optional(),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  github: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  skills: z.string()
});

interface EditProfileSheetProps {
  children: React.ReactNode;
}

const EditProfileSheet: React.FC<EditProfileSheetProps> = ({ children }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize the form with user data
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData.name,
      title: userData.title,
      location: userData.location,
      bio: userData.bio,
      email: userData.contactInfo.email,
      website: userData.contactInfo.website,
      github: userData.contactInfo.github,
      twitter: userData.contactInfo.twitter,
      linkedin: userData.contactInfo.linkedin,
      skills: userData.skills.join(', ')
    }
  });

  function onSubmit(data: z.infer<typeof profileFormSchema>) {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Click to change profile image</p>
              </div>
              
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input className="pl-10" {...field} placeholder="City, Country" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Tell us about yourself" 
                        className="min-h-[120px] resize-y"
                      />
                    </FormControl>
                    <FormDescription>
                      Write a short bio about yourself, your experience, and what you're looking for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="JavaScript, React, CSS, ..." />
                    </FormControl>
                    <FormDescription>
                      Enter your skills, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Contact Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://your-website.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="username" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="username" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="username" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <SheetFooter className="pt-4">
                <SheetClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </SheetClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfileSheet;