
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SkillBadge from './skill-badge';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  skills: string[];
  authorName: string;
  authorAvatar: string;
  rating: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  coverImage,
  skills,
  authorName,
  authorAvatar,
  rating
}) => {
  return (
    <Link to={`/projects/${id}`}>
      <Card className="overflow-hidden card-hover h-full flex flex-col transition-all duration-200 hover:shadow-md">
        {/* Project Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-lg truncate">{title}</h3>
          
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {description}
          </p>
          
          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <SkillBadge key={index} name={skill} />
            ))}
            {skills.length > 3 && (
              <span className="text-xs text-gray-500 flex items-center">
                +{skills.length - 3} more
              </span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 border-t bg-gray-50 flex justify-between items-center">
          {/* Author Info */}
          <div className="flex items-center space-x-2">
            <img 
              src={authorAvatar} 
              alt={authorName} 
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-700">{authorName}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
