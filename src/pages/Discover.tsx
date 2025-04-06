
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProjectCard, { ProjectCardProps } from '@/components/ui/project-card';
import { CommandSearch } from '@/components/ui/command-search';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock discover data
const mockProjects: ProjectCardProps[] = [
  {
    id: '1',
    title: 'AI-Powered Health Diagnostics',
    description: 'A machine learning system that helps in early diagnosis of diseases using patient data and symptoms.',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['AI/ML', 'Healthcare', 'Python', 'TensorFlow'],
    authorName: 'Emily Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    rating: 4.9
  },
  {
    id: '2',
    title: 'Sustainable Smart Home System',
    description: 'An IoT system that optimizes energy usage in homes while reducing environmental impact.',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055e2a8f31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['IoT', 'Sustainability', 'Energy', 'Smart Home'],
    authorName: 'Marcus Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.7
  },
  {
    id: '3',
    title: 'Accessible E-Learning Platform',
    description: 'A platform designed to make online education more accessible to students with disabilities.',
    coverImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['Accessibility', 'Education', 'ReactJS', 'NodeJS'],
    authorName: 'Sophia Lee',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.8
  },
  {
    id: '4',
    title: 'Virtual Reality Therapy App',
    description: 'A VR application that assists in mental health therapy sessions for anxiety and PTSD.',
    coverImage: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['VR', 'Mental Health', 'Unity', 'C#'],
    authorName: 'Robert Taylor',
    authorAvatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    rating: 4.9
  },
  {
    id: '5',
    title: 'Community-Driven Waste Management',
    description: 'A mobile app that connects neighborhoods for better waste sorting and recycling initiatives.',
    coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['Environmental', 'Mobile', 'React Native', 'Community'],
    authorName: 'Aisha Patel',
    authorAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    rating: 4.6
  },
  {
    id: '6',
    title: 'Blockchain for Supply Chain Tracking',
    description: 'A decentralized system to track goods from manufacturing to delivery, ensuring authenticity and quality.',
    coverImage: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    skills: ['Blockchain', 'Supply Chain', 'Solidity', 'Web3'],
    authorName: 'Daniel Kim',
    authorAvatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    rating: 4.8
  },
];

// Mock people data
const mockPeople = [
  {
    id: '1',
    name: 'Olivia Martinez',
    title: 'UX/UI Designer',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    skills: ['UI Design', 'User Research', 'Figma', 'Prototyping'],
    rating: 4.9
  },
  {
    id: '2',
    name: 'James Wilson',
    title: 'Full Stack Developer',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    rating: 4.8
  },
  {
    id: '3',
    name: 'Sarah Ahmed',
    title: 'Data Scientist',
    avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
    rating: 4.7
  },
  {
    id: '4',
    name: 'Michael Thompson',
    title: 'DevOps Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    rating: 4.9
  },
  {
    id: '5',
    name: 'Elena Rodriguez',
    title: 'Mobile Developer',
    avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    rating: 4.6
  },
  {
    id: '6',
    name: 'Thomas Chen',
    title: 'Blockchain Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/93.jpg',
    skills: ['Solidity', 'Web3.js', 'Smart Contracts', 'Ethereum'],
    rating: 4.8
  },
];

// Categories
const categories = [
  'All', 'Web Development', 'Mobile', 'AI/ML', 'Blockchain', 
  'Design', 'IoT', 'Sustainability', 'Healthcare', 'Education'
];

const DiscoverPage = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [filteredPeople, setFilteredPeople] = useState(mockPeople);
  const [filters, setFilters] = useState({
    rating: 0,
    skillLevel: "all",
    dateRange: "all",
    availableForWork: false
  });
  const [showFiltersSheet, setShowFiltersSheet] = useState(false);

  // Function to handle advanced filtering
  useEffect(() => {
    // Filter projects based on search query and category
    const projectResults = mockProjects.filter(project => {
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || 
        project.skills.some(skill => skill.includes(selectedCategory)) ||
        project.title.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProjects(projectResults);
    
    // Filter people based on search query
    const peopleResults = mockPeople.filter(person => {
      return searchQuery === '' || 
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    });
    
    setFilteredPeople(peopleResults);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Found ${filteredProjects.length} projects and ${filteredPeople.length} people matching "${searchQuery}"`,
    });
  };

  const handleAdvancedFilter = () => {
    setShowFiltersSheet(false);
    toast({
      title: "Filters Applied",
      description: "The results have been filtered based on your criteria.",
    });
  };

  const FilterOptions = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button 
              key={rating}
              variant={filters.rating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => setFilters({...filters, rating})}
              className="w-8 h-8 p-0"
            >
              {rating}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Skill Level</h4>
        <div className="space-y-2">
          {["all", "beginner", "intermediate", "expert"].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox 
                id={`level-${level}`} 
                checked={filters.skillLevel === level}
                onCheckedChange={() => setFilters({...filters, skillLevel: level})} 
              />
              <Label htmlFor={`level-${level}`} className="capitalize">
                {level === "all" ? "All Levels" : level}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Available for Work</h4>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="available" 
            checked={filters.availableForWork}
            onCheckedChange={(checked) => 
              setFilters({...filters, availableForWork: !!checked})
            } 
          />
          <Label htmlFor="available">Show only available</Label>
        </div>
      </div>

      <Button onClick={handleAdvancedFilter} className="w-full mt-4">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Discover</h1>
      <p className="text-gray-600 mb-8">
        Explore innovative projects and connect with talented individuals.
      </p>
      
      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search skills, projects, or people..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" className="whitespace-nowrap">Search</Button>
            
            {isMobile ? (
              <Sheet open={showFiltersSheet} onOpenChange={setShowFiltersSheet}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <div className="pt-6 pb-12 px-2">
                    <h3 className="text-lg font-semibold mb-6">Advanced Filters</h3>
                    <FilterOptions />
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    Advanced Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72">
                  <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-4">
                    <FilterOptions />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </form>
      
      <div className="mb-8">
        <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2">
          {categories.map((category) => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap flex-shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration Opportunities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No projects found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
          
          {filteredProjects.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More Projects</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="people">
          {filteredPeople.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeople.map((person) => (
                <div key={person.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={person.avatar} alt={person.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h3 className="font-semibold text-lg">{person.name}</h3>
                        <p className="text-brand-600">{person.title}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < Math.floor(person.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-gray-600 text-xs">{person.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {person.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No people found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
          
          {filteredPeople.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More People</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="collaboration">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Collaboration Opportunities</h3>
            <p className="text-gray-600 mb-6">
              Find open projects looking for collaborators or post your own collaboration request.
            </p>
            
            <Button>
              Post Collaboration Request
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiscoverPage;