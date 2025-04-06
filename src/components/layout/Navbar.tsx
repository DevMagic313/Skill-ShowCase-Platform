
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, Plus, MessageCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-brand-700">Skill ShowCase Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/discover" className="text-gray-600 hover:text-brand-600 font-medium">
            Discover
          </Link>
          <Link to="/projects" className="text-gray-600 hover:text-brand-600 font-medium">
            Projects
          </Link>
          <Link to="/resources" className="text-gray-600 hover:text-brand-600 font-medium">
            Resources
          </Link>
        </nav>

        {/* Search and Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-64 mr-2" 
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={18} />
            </Button>
          )}
          
          <Link to="/messages">
            <Button variant="ghost" size="icon">
              <MessageCircle size={20} />
            </Button>
          </Link>
          
          <Link to="/add-project">
            <Button variant="outline" className="flex items-center">
              <Plus size={16} className="mr-1" />
              Add Project
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          
          <Link to="/signup">
            <Button variant="default">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-gray-50">
          <Input 
            type="search" 
            placeholder="Search for skills, projects, or people..." 
            className="w-full" 
          />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-3 px-4 py-2">
            <Link 
              to="/discover" 
              className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Discover
            </Link>
            <Link 
              to="/projects" 
              className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/resources" 
              className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              to="/messages" 
              className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-2" />
                Messages
              </div>
            </Link>
            <Link 
              to="/add-project" 
              className="px-3 py-2 rounded bg-gray-100 text-brand-600 font-medium flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plus size={16} className="mr-2" />
              Add Project
            </Link>
            <hr className="my-2" />
            <div className="flex space-x-3">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;