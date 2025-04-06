
import React from 'react';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, className }) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-100 text-brand-800 hover:bg-brand-200 transition-colors", 
        className
      )}
    >
      {name}
    </span>
  );
};

export default SkillBadge;