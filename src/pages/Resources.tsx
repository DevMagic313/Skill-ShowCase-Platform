
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, FileText, Video, Book, Bookmark, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

// Mock resources data
const mockArticles = [
  {
    id: '1',
    title: 'The Complete Guide to Modern Web Development',
    description: 'A comprehensive guide covering HTML, CSS, JavaScript, and modern frameworks.',
    author: 'Alex Johnson',
    date: 'March 15, 2025',
    readTime: '15 min read',
    tags: ['Web Development', 'Frontend', 'Tutorial'],
    type: 'article',
    link: '#'
  },
  {
    id: '2',
    title: 'Mastering React Hooks',
    description: 'Learn how to use React Hooks effectively to build powerful functional components.',
    author: 'Sophia Chen',
    date: 'February 28, 2025',
    readTime: '10 min read',
    tags: ['React', 'JavaScript', 'Web Development'],
    type: 'article',
    link: '#'
  },
  {
    id: '3',
    title: 'Introduction to Machine Learning for Developers',
    description: 'A beginner-friendly approach to understanding machine learning concepts and implementations.',
    author: 'Michael Rodriguez',
    date: 'March 5, 2025',
    readTime: '20 min read',
    tags: ['Machine Learning', 'AI', 'Python'],
    type: 'article',
    link: '#'
  },
  {
    id: '4',
    title: 'Building Scalable Backend Systems',
    description: 'Learn how to design and build backends that can handle high traffic and growth.',
    author: 'Emma Wilson',
    date: 'March 20, 2025',
    readTime: '18 min read',
    tags: ['Backend', 'Architecture', 'Scaling'],
    type: 'article',
    link: '#'
  },
];

const mockTutorials = [
  {
    id: '1',
    title: 'Build a Full-Stack Application with React and Node.js',
    description: 'Step-by-step guide to creating a complete web application with authentication and database.',
    author: 'David Kim',
    duration: '3 hours',
    level: 'Intermediate',
    tags: ['React', 'Node.js', 'MongoDB', 'Full-Stack'],
    type: 'tutorial',
    link: '#'
  },
  {
    id: '2',
    title: 'Create a Responsive Portfolio Website with HTML and CSS',
    description: 'Learn how to build a professional portfolio website that looks great on all devices.',
    author: 'Jennifer Park',
    duration: '2 hours',
    level: 'Beginner',
    tags: ['HTML', 'CSS', 'Responsive Design'],
    type: 'tutorial',
    link: '#'
  },
  {
    id: '3',
    title: 'Introduction to UI/UX Design Principles',
    description: 'Understanding the fundamentals of user interface and user experience design.',
    author: 'Robert Lee',
    duration: '4 hours',
    level: 'Beginner',
    tags: ['UI/UX', 'Design', 'Wireframing'],
    type: 'tutorial',
    link: '#'
  },
  {
    id: '4',
    title: 'Advanced Data Structures and Algorithms',
    description: 'Deep dive into complex data structures and efficient algorithms for technical interviews.',
    author: 'Maria Garcia',
    duration: '6 hours',
    level: 'Advanced',
    tags: ['Algorithms', 'Data Structures', 'Interviews'],
    type: 'tutorial',
    link: '#'
  },
];

const mockEbooks = [
  {
    id: '1',
    title: 'The Frontend Developer\'s Handbook 2025',
    description: 'Everything you need to know about modern frontend development in one comprehensive guide.',
    author: 'TalentConnect Team',
    pages: 350,
    format: 'PDF',
    tags: ['Frontend', 'Web Development', 'Career'],
    type: 'ebook',
    link: '#'
  },
  {
    id: '2',
    title: 'Mastering TypeScript',
    description: 'A complete guide to TypeScript from basics to advanced patterns and practices.',
    author: 'James Williams',
    pages: 280,
    format: 'PDF, EPUB',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    type: 'ebook',
    link: '#'
  },
  {
    id: '3',
    title: 'The Art of Clean Code',
    description: 'Principles and practices for writing maintainable and efficient code.',
    author: 'Sarah Johnson',
    pages: 220,
    format: 'PDF, EPUB, MOBI',
    tags: ['Clean Code', 'Best Practices', 'Software Development'],
    type: 'ebook',
    link: '#'
  },
  {
    id: '4',
    title: 'Cloud Computing: From Basics to DevOps',
    description: 'Understanding cloud infrastructure and implementing DevOps practices.',
    author: 'Michael Chen',
    pages: 400,
    format: 'PDF',
    tags: ['Cloud', 'DevOps', 'AWS', 'Azure'],
    type: 'ebook',
    link: '#'
  },
];

// Categories
const categories = [
  'All', 'Web Development', 'Mobile Development', 'UI/UX Design', 
  'Data Science', 'Machine Learning', 'DevOps', 'Career'
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Learning Resources</h1>
      <p className="text-gray-600 mb-6 sm:mb-8">
        Expand your knowledge with our curated collection of resources.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search resources..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <Filter size={16} />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader className="mb-4">
                <SheetTitle>Filter Resources</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Button 
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="justify-start"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Resource Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <FileText size={14} className="mr-2" />
                      Articles
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Video size={14} className="mr-2" />
                      Tutorials
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Book size={14} className="mr-2" />
                      E-Books
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filters
          </Button>
        )}
      </div>
      
      {/* Categories - horizontal scrollable on mobile */}
      <ScrollArea className="w-full mb-6">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto hide-scrollbar">
          <TabsTrigger value="articles" className="flex items-center gap-1">
            <FileText size={isMobile ? 14 : 16} />
            Articles
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-1">
            <Video size={isMobile ? 14 : 16} />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="ebooks" className="flex items-center gap-1">
            <Book size={isMobile ? 14 : 16} />
            E-Books
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="flex items-center gap-1">
            <Bookmark size={isMobile ? 14 : 16} />
            My Bookmarks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {mockArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                        <div className="text-xs sm:text-sm text-gray-500">{article.date}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{article.readTime}</div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{article.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3">{article.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">By {article.author}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button asChild variant="outline" size="sm" className="flex items-center gap-1 text-xs sm:text-sm">
                          <a href={article.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} className="sm:block hidden" />
                            Read Article
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {mockTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                        <div className="text-xs sm:text-sm text-gray-500">Duration: {tutorial.duration}</div>
                        <div className="text-xs sm:text-sm text-gray-500">Level: {tutorial.level}</div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{tutorial.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3">{tutorial.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">By {tutorial.author}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tutorial.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button asChild variant="outline" size="sm" className="flex items-center gap-1 text-xs sm:text-sm">
                          <a href={tutorial.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} className="sm:block hidden" />
                            Start Tutorial
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Button variant="outline">Load More Tutorials</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="ebooks">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {mockEbooks.map((ebook) => (
              <Card key={ebook.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                        <div className="text-xs sm:text-sm text-gray-500">{ebook.pages} pages</div>
                        <div className="text-xs sm:text-sm text-gray-500">Format: {ebook.format}</div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{ebook.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3">{ebook.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">By {ebook.author}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ebook.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button asChild variant="outline" size="sm" className="flex items-center gap-1 text-xs sm:text-sm">
                          <a href={ebook.link} target="_blank" rel="noopener noreferrer">
                            <Download size={14} className="sm:block hidden" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Button variant="outline">Load More E-Books</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="bookmarks">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-medium mb-2">Your Bookmarked Resources</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              You haven't saved any resources yet. Browse our collection and bookmark items for later.
            </p>
            
            <Button variant="outline">Browse Resources</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;
