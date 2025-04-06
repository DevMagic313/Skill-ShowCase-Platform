
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SkillBadge from './skill-badge';
import { Link } from 'react-router-dom';
import { MapPin, Award } from 'lucide-react';

export interface UserCardProps {
  id: string;
  name: string;
  title: string;
  avatar: string;
  location: string;
  skills: string[];
  badges: number;
  projectCount: number;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  title,
  avatar,
  location,
  skills,
  badges,
  projectCount
}) => {
  return (
    <Link to={`/profiles/${id}`}>
      <Card className="overflow-hidden card-hover h-full">
        <CardContent className="p-6 text-center">
          {/* Avatar */}
          <div className="relative mx-auto mb-4">
            <img 
              src={avatar} 
              alt={name} 
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-brand-100"
            />
            {badges > 0 && (
              <div className="absolute bottom-0 right-0 bg-brand-600 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">
                <Award className="h-4 w-4" />
              </div>
            )}
          </div>
          
          {/* User Info */}
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-brand-600 font-medium text-sm mt-1">{title}</p>
          
          {location && (
            <div className="flex items-center justify-center text-gray-500 text-sm mt-2">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{location}</span>
            </div>
          )}
          
          {/* Skills */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
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
        
        <CardFooter className="px-6 py-3 bg-gray-50 flex justify-center items-center text-sm">
          <span className="text-gray-600">
            {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default UserCard;