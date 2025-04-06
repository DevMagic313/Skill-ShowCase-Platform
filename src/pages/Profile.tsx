import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Link as LinkIcon, 
  Github, 
  Twitter, 
  Linkedin,
  Edit,
  Award,
  Settings,
  MessageCircle,
  UserPlus,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import SkillBadge from '@/components/ui/skill-badge';
import ProjectCard, { ProjectCardProps } from '@/components/ui/project-card';
import EditProfileSheet from '@/components/profile/EditProfileSheet';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Mock user data
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
  },
  badges: [
    { id: '1', name: 'Top Contributor', icon: 'award' },
    { id: '2', name: 'Code Master', icon: 'code' },
    { id: '3', name: 'Problem Solver', icon: 'lightbulb' }
  ],
  stats: {
    projectCount: 8,
    totalViews: 2540,
    followers: 156,
    following: 89
  }
};

// Mock project data
const userProjects: ProjectCardProps[] = [
  {
    id: '1',
    title: 'E-commerce Dashboard UI Design',
    description: 'A modern dashboard for e-commerce platforms with analytics, inventory management, and customer insights.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['UI/UX', 'Figma', 'Dashboard'],
    authorName: userData.name,
    authorAvatar: userData.avatar,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Task Management Application',
    description: 'A full-stack task management app with user authentication, task assignment, and progress tracking.',
    coverImage: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    authorName: userData.name,
    authorAvatar: userData.avatar,
    rating: 4.6
  },
  {
    id: '3',
    title: 'Weather Forecast Mobile App',
    description: 'A cross-platform mobile app that provides real-time weather forecasts and alerts based on user location.',
    coverImage: 'https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['React Native', 'Weather API', 'Geolocation'],
    authorName: userData.name,
    authorAvatar: userData.avatar,
    rating: 4.9
  },
];

const ProfilePage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    
    if (!isFollowing) {
      toast({
        title: "Success!",
        description: `You are now following ${userData.name}`,
      });
    } else {
      toast({
        title: "Unfollowed",
        description: `You have unfollowed ${userData.name}`,
        variant: "destructive",
      });
    }
  };

  const handleMessage = () => {
    navigate(`/messages/${userData.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header / Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-brand-600 to-brand-800 relative">
          <div className="absolute -bottom-16 left-8 rounded-full border-4 border-white overflow-hidden">
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              className="w-32 h-32 object-cover"
            />
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            
            <EditProfileSheet>
              <Button variant="ghost" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </EditProfileSheet>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-brand-600 text-lg">{userData.title}</p>
              
              {userData.location && (
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{userData.location}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button 
                variant={isFollowing ? "secondary" : "outline"}
                size="sm"
                onClick={handleFollow}
                className={isFollowing ? "bg-brand-100 text-brand-600" : ""}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>

              <Button 
                variant="outline" 
                size="sm"
                onClick={handleMessage}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-2">About</h2>
            <p className="text-gray-600">
              {userData.bio}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <SkillBadge key={index} name={skill} />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">Contact</h2>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${userData.contactInfo.email}`} className="hover:text-brand-600">
                    {userData.contactInfo.email}
                  </a>
                </li>
                <li className="flex items-center text-gray-600">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  <a href={`https://${userData.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
                    {userData.contactInfo.website}
                  </a>
                </li>
                <li className="flex items-center text-gray-600">
                  <Github className="h-4 w-4 mr-2" />
                  <a href={`https://${userData.contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
                    {userData.contactInfo.github}
                  </a>
                </li>
                <li className="flex items-center text-gray-600">
                  <Twitter className="h-4 w-4 mr-2" />
                  <a href={`https://${userData.contactInfo.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
                    {userData.contactInfo.twitter}
                  </a>
                </li>
                <li className="flex items-center text-gray-600">
                  <Linkedin className="h-4 w-4 mr-2" />
                  <a href={`https://${userData.contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
                    {userData.contactInfo.linkedin}
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Badges */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">Badges</h2>
              <div className="flex space-x-4">
                {userData.badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center">
                    <div className="bg-brand-100 rounded-full h-16 w-16 flex items-center justify-center mb-2">
                      <Award className="h-8 w-8 text-brand-600" />
                    </div>
                    <span className="text-sm text-gray-700">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects and Activity Tabs */}
      <div className="mt-8">
        <Tabs defaultValue="projects">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Projects ({userProjects.length})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline">
                View All Projects
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 text-center">
                Activity feed will be displayed here.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="certificates">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 text-center">
                Certificates and achievements will be displayed here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;