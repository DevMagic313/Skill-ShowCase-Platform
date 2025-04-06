
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Heart, Share2, Eye, MessageSquare, Calendar, Star, Globe } from 'lucide-react';
import SkillBadge from '@/components/ui/skill-badge';
import CommentSection from '@/components/comments/CommentSection';

// Mock project data (in a real app, this would come from an API)
const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Dashboard UI Design',
    description: 'A modern dashboard for e-commerce platforms with analytics, inventory management, and customer insights.',
    fullDescription: `This project focuses on creating an intuitive and comprehensive dashboard for e-commerce businesses. The design prioritizes data visualization and user experience to help businesses make informed decisions.

The dashboard includes:
- Real-time sales analytics and trends
- Inventory management with low stock alerts
- Customer behavior insights and demographics
- Order processing and fulfillment tracking
- Marketing campaign performance metrics

The UI is designed with accessibility in mind, ensuring that all users can easily navigate and utilize the dashboard's features. The color scheme is carefully selected to highlight important information while maintaining visual appeal.`,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['UI/UX', 'Figma', 'Dashboard', 'E-commerce', 'Analytics'],
    authorName: 'Alex Morgan',
    authorAvatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    authorId: '1',
    rating: 4.8,
    views: 1245,
    likes: 87,
    comments: 32,
    createdAt: '2023-11-15T10:30:00Z',
    liveUrl: 'https://example.com/ecommerce-dashboard',
    sourceCodeUrl: 'https://github.com/alexmorgan/ecommerce-dashboard',
    additionalImages: [
      'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591017403997-5e073f03b798?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: '2',
    title: 'Task Management Application',
    description: 'A full-stack task management app with user authentication, task assignment, and progress tracking.',
    fullDescription: `This task management application is designed to help teams organize and track their work effectively. Built with a modern tech stack, it offers a seamless experience across devices.

Key features include:
- User authentication and team management
- Task creation, assignment, and deadline setting
- Progress tracking with customizable statuses
- File attachments and commenting system
- Email notifications for due dates and mentions
- Detailed reporting and productivity metrics

The application uses React for the frontend, Node.js for the backend, and MongoDB for data storage. Real-time updates are implemented using WebSockets to ensure that all team members see the latest changes instantly.`,
    coverImage: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'WebSockets'],
    authorName: 'Alex Morgan',
    authorAvatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    authorId: '1',
    rating: 4.6,
    views: 890,
    likes: 56,
    comments: 18,
    createdAt: '2023-09-22T14:15:00Z',
    liveUrl: 'https://example.com/task-manager',
    sourceCodeUrl: 'https://github.com/alexmorgan/task-manager',
    additionalImages: [
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: '3',
    title: 'Weather Forecast Mobile App',
    description: 'A cross-platform mobile app that provides real-time weather forecasts and alerts based on user location.',
    fullDescription: `This weather forecast application provides users with accurate, real-time weather information for their current location and any saved locations. The app focuses on a clean, intuitive interface that makes weather information easy to understand.

Features include:
- Current conditions with temperature, wind, humidity, and pressure
- 7-day forecast with hourly breakdowns
- Severe weather alerts and notifications
- Radar maps with precipitation and temperature layers
- Location-based forecasts with GPS integration
- Customizable widgets for home screen

The app is built using React Native, allowing it to run on both iOS and Android devices from a single codebase. Weather data is obtained from a reliable meteorological API with global coverage.`,
    coverImage: 'https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['React Native', 'Weather API', 'Geolocation', 'Mobile Development'],
    authorName: 'Alex Morgan',
    authorAvatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    authorId: '1',
    rating: 4.9,
    views: 1560,
    likes: 124,
    comments: 47,
    createdAt: '2023-07-08T09:45:00Z',
    liveUrl: 'https://example.com/weather-app',
    sourceCodeUrl: 'https://github.com/alexmorgan/weather-app',
    additionalImages: [
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534794048419-48e110dca88e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  }
];

// Mock comments for demo
const mockComments = [
  {
    id: '1',
    userId: '2',
    userName: 'Sarah Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    text: "This is an amazing project! I love the attention to detail in the UI design and how you've prioritized user experience. The color scheme is really effective at highlighting important information.",
    timestamp: '2024-03-15T14:22:00Z',
  },
  {
    id: '2',
    userId: '3',
    userName: 'Michael Chen',
    userAvatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    text: 'Great work on the dashboard layout! Have you considered adding dark mode support? I think it would complement this design really well.',
    timestamp: '2024-03-16T09:45:00Z',
  },
];

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/discover">
          <Button>Back to Discover</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/discover" className="flex items-center text-brand-600 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discover
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2">
          {/* Project Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(project.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{project.views} views</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" />
                <span>{project.rating}</span>
              </div>
            </div>
          </div>

          {/* Main Project Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={project.coverImage} 
              alt={project.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Project Content Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="discussions">Comments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Project Description</h2>
                <div className="whitespace-pre-line text-gray-700">
                  {project.fullDescription}
                </div>
                
                <h3 className="text-lg font-semibold mt-8 mb-4">Technologies & Skills</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.skills.map((skill, index) => (
                    <SkillBadge key={index} name={skill} />
                  ))}
                </div>

                {(project.liveUrl || project.sourceCodeUrl) && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Project Links</h3>
                    <div className="flex flex-wrap gap-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-brand-600 hover:text-brand-700"
                        >
                          <Globe className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                      {project.sourceCodeUrl && (
                        <a 
                          href={project.sourceCodeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-brand-600 hover:text-brand-700"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="images">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.additionalImages && project.additionalImages.map((img, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden">
                    <img 
                      src={img} 
                      alt={`${project.title} screenshot ${idx + 1}`} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="discussions">
              <CommentSection projectId={project.id} comments={mockComments} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          {/* Author Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Project Creator</h3>
              <Link to={`/profile`} className="flex items-center space-x-3 mb-4">
                <img 
                  src={project.authorAvatar} 
                  alt={project.authorName} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-brand-600">{project.authorName}</h4>
                  <p className="text-sm text-gray-600">View Profile</p>
                </div>
              </Link>
              <Button variant="outline" className="w-full mb-2">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Creator
              </Button>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Project Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Like Project
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Project
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Similar Projects (placeholder) */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Similar Projects</h3>
              <div className="text-center py-4 text-gray-500">
                <p>Similar projects will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
