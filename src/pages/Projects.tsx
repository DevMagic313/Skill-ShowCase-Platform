
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProjectCard, { ProjectCardProps } from '@/components/ui/project-card';
import { Search, Filter, Sliders } from 'lucide-react';
import SkillBadge from '@/components/ui/skill-badge';

// Mock data - more extensive than on homepage
const projectsData: ProjectCardProps[] = [
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
  },
  {
    id: '4',
    title: 'Personal Finance Management App',
    description: 'An application that helps users track expenses, set budgets, and visualize spending patterns with a clean interface.',
    coverImage: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    authorName: 'James Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    rating: 4.6
  },
  {
    id: '5',
    title: 'Event Management Platform',
    description: 'A comprehensive platform for organizing and managing events, including ticketing, participant management, and scheduling.',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['Vue.js', 'Express', 'MySQL', 'UI Design'],
    authorName: 'Olivia Martinez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    rating: 4.3
  },
  {
    id: '6',
    title: 'AI-powered Image Recognition Tool',
    description: 'A web application that uses deep learning to recognize and classify objects in images with high accuracy.',
    coverImage: 'https://images.unsplash.com/photo-1558346547-4439467bd1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['Python', 'TensorFlow', 'Flask', 'Computer Vision'],
    authorName: 'David Kim',
    authorAvatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    rating: 4.7
  }
];

// Popular categories for filtering
const categories = [
  'All Categories',
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Data Science',
  'Machine Learning',
  'Game Development',
  'DevOps',
  'Blockchain'
];

// Popular skills for filtering
const popularSkills = [
  'JavaScript',
  'React',
  'Python',
  'UI/UX',
  'Node.js',
  'Vue.js',
  'TensorFlow',
  'Firebase',
  'MongoDB'
];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  // Handle skill selection/deselection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  // Filter projects based on search, skills, and category
  const filteredProjects = projectsData.filter(project => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Skills filter
    const matchesSkills = 
      selectedSkills.length === 0 || 
      selectedSkills.some(skill => project.skills.includes(skill));
    
    // Category filter (for a frontend demo, we'll just look for keywords in title/description)
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      project.title.includes(selectedCategory) || 
      project.description.includes(selectedCategory);
    
    return matchesSearch && matchesSkills && matchesCategory;
  });
  
  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'highest_rated') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest_rated') {
      return a.rating - b.rating;
    } else {
      // For demo, sort by ID as a proxy for date (newer projects have higher IDs)
      return sortBy === 'newest' 
        ? parseInt(b.id) - parseInt(a.id) 
        : parseInt(a.id) - parseInt(b.id);
    }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Projects</h1>
        <p className="text-gray-600">
          Discover creative projects from talented developers, designers, and creators around the world.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Search projects, skills, or keywords..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest_rated">Highest Rated</SelectItem>
                <SelectItem value="lowest_rated">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
              {selectedSkills.length > 0 && (
                <span className="bg-brand-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {selectedSkills.length}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        {/* Extended filters */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="font-medium text-gray-700 flex items-center">
                <Sliders size={16} className="mr-2" />
                Filter by:
              </div>
              
              <div className="flex-grow">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <div className="font-medium text-gray-700 mb-2">Popular Skills:</div>
              <div className="flex flex-wrap gap-2">
                {popularSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`skill-tag cursor-pointer transition-colors ${
                      selectedSkills.includes(skill) 
                        ? 'bg-brand-600 text-white' 
                        : 'bg-brand-100 text-brand-800'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSelectedSkills([]);
                  setSelectedCategory('All Categories');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
        
        {/* Active filters display */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSkills.map((skill) => (
              <div key={skill} className="flex items-center bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm">
                {skill}
                <button 
                  onClick={() => toggleSkill(skill)}
                  className="ml-2 text-brand-600 hover:text-brand-800"
                >
                  ✕
                </button>
              </div>
            ))}
            
            <button 
              onClick={() => setSelectedSkills([])}
              className="text-sm text-brand-600 hover:text-brand-800 underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Projects grid */}
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No projects found matching your criteria.</p>
          <Button 
            onClick={() => {
              setSearchQuery('');
              setSelectedSkills([]);
              setSelectedCategory('All Categories');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
      
      {/* Pagination placeholder (since this is frontend only) */}
      <div className="mt-10 flex justify-center">
        <div className="flex space-x-1">
          <Button variant="outline" size="icon" disabled>
            &lt;
          </Button>
          <Button variant="default" size="icon">1</Button>
          <Button variant="outline" size="icon">2</Button>
          <Button variant="outline" size="icon">3</Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;