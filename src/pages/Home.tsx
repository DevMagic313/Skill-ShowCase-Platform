
import React from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard, { ProjectCardProps } from '@/components/ui/project-card';
import UserCard, { UserCardProps } from '@/components/ui/user-card';
import { ArrowRight, Search, Award, Users, FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data
const featuredProjects: ProjectCardProps[] = [
  {
    id: '1',
    title: 'E-commerce Dashboard UI Design',
    description: 'A modern dashboard for e-commerce platforms with analytics, inventory management, and customer insights.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['UI/UX', 'Figma', 'Dashboard'],
    authorName: 'Emily Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Mobile App Development - Fitness Tracker',
    description: 'A fitness tracking app built with React Native that allows users to track workouts, set goals, and monitor progress.',
    coverImage: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['React Native', 'Firebase', 'UX Design'],
    authorName: 'Michael Rodriguez',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.5
  },
  {
    id: '3',
    title: 'Machine Learning Portfolio Website',
    description: 'A responsive website showcasing AI/ML projects with interactive visualizations and code samples.',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['JavaScript', 'Python', 'D3.js'],
    authorName: 'Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4.9
  }
];

const topTalents: UserCardProps[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    title: 'Full Stack Developer',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    location: 'San Francisco, CA',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    badges: 3,
    projectCount: 8
  },
  {
    id: '2',
    name: 'Priya Sharma',
    title: 'UX/UI Designer',
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    location: 'New York, NY',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    badges: 2,
    projectCount: 12
  },
  {
    id: '3',
    name: 'David Wilson',
    title: 'Data Scientist',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    location: 'Boston, MA',
    skills: ['Python', 'TensorFlow', 'SQL', 'Data Visualization'],
    badges: 4,
    projectCount: 6
  },
  {
    id: '4',
    name: 'Sophia Lee',
    title: 'Mobile Developer',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    location: 'Austin, TX',
    skills: ['Swift', 'Kotlin', 'React Native', 'Firebase'],
    badges: 1,
    projectCount: 5
  }
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Showcase Your Skills.<br />Connect With Opportunities.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-100">
            A platform for developers, designers, and creators to show their work, skills, and connect with opportunities.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link to="/signup" className="w-full">
              <Button className="w-full py-6 text-lg bg-white text-brand-700 hover:bg-gray-100">
                Join Now
              </Button>
            </Link>
            <Link to="/projects" className="w-full">
              <Button variant="outline" className="w-full py-6 text-lg bg-transparent border-white text-white hover:bg-white/10">
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-brand-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
              <p className="text-gray-600 mt-2">Talented Professionals</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <FileCode className="h-12 w-12 text-brand-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">25,000+</h3>
              <p className="text-gray-600 mt-2">Showcased Projects</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-brand-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">5,000+</h3>
              <p className="text-gray-600 mt-2">Achievements Earned</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Projects</h2>
            <Link to="/projects" className="flex items-center text-brand-600 font-medium">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Talent */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Talent</h2>
            <Link to="/discover" className="flex items-center text-brand-600 font-medium">
              Discover More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTalents.map((talent) => (
              <UserCard key={talent.id} {...talent} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            How Skill ShowCase Platform Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-brand-700">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build your talent profile with your skills, experience, and portfolio items.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-brand-700">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Showcase Your Work</h3>
              <p className="text-gray-600">
                Upload your projects, case studies, and achievements to highlight your expertise.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-brand-700">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Grow</h3>
              <p className="text-gray-600">
                Receive feedback, earn badges, and connect with others in your field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Showcase Your Skills?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-100">
            Join thousands of professionals already building their personal brand on Skill ShowCase Platform.
          </p>
          <Link to="/signup">
            <Button className="py-6 px-8 text-lg bg-white text-brand-700 hover:bg-gray-100">
              Get Started - It's Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;