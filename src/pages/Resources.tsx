
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, FileText, Video, Book, Bookmark, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
      <p className="text-gray-600 mb-8">
        Expand your knowledge with our curated collection of resources.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search resources..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          Filters
        </Button>
      </div>
      
      <div className="mb-8 overflow-x-auto">
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
      </div>
      
      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="articles" className="flex items-center gap-1">
            <FileText size={16} />
            Articles
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-1">
            <Video size={16} />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="ebooks" className="flex items-center gap-1">
            <Book size={16} />
            E-Books
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="flex items-center gap-1">
            <Bookmark size={16} />
            My Bookmarks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {mockArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-500">{article.date}</div>
                        <div className="text-sm text-gray-500">{article.readTime}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-3">{article.description}</p>
                      <p className="text-sm text-gray-500 mb-4">By {article.author}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                          <a href={article.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} />
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
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {mockTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-500">Duration: {tutorial.duration}</div>
                        <div className="text-sm text-gray-500">Level: {tutorial.level}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                      <p className="text-gray-600 mb-3">{tutorial.description}</p>
                      <p className="text-sm text-gray-500 mb-4">By {tutorial.author}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tutorial.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                          <a href={tutorial.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} />
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
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More Tutorials</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="ebooks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {mockEbooks.map((ebook) => (
              <Card key={ebook.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-500">{ebook.pages} pages</div>
                        <div className="text-sm text-gray-500">Format: {ebook.format}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{ebook.title}</h3>
                      <p className="text-gray-600 mb-3">{ebook.description}</p>
                      <p className="text-sm text-gray-500 mb-4">By {ebook.author}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ebook.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                          <a href={ebook.link} target="_blank" rel="noopener noreferrer">
                            <Download size={14} />
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
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More E-Books</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="bookmarks">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Your Bookmarked Resources</h3>
            <p className="text-gray-600 mb-6">
              You haven't saved any resources yet. Browse our collection and bookmark items for later.
            </p>
            
            <Button variant="outline">Browse Resources</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesPage;
