
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// This is a mock search index - in a real app, this would be fetched from the backend
const searchIndex = {
  projects: [
    { id: "p1", name: "E-commerce Dashboard UI Design", type: "UI/UX", path: "/projects/1" },
    { id: "p2", name: "Mobile App Development - Fitness Tracker", type: "Mobile", path: "/projects/2" },
    { id: "p3", name: "Machine Learning Portfolio Website", type: "AI/ML", path: "/projects/3" },
    { id: "p4", name: "AI-Powered Health Diagnostics", type: "Healthcare", path: "/projects/4" },
    { id: "p5", name: "Sustainable Smart Home System", type: "IoT", path: "/projects/5" },
    { id: "p6", name: "Accessible E-Learning Platform", type: "Education", path: "/projects/6" },
  ],
  people: [
    { id: "u1", name: "Alex Morgan", title: "Full Stack Developer", path: "/user/alex-morgan" },
    { id: "u2", name: "Priya Sharma", title: "UX/UI Designer", path: "/user/priya-sharma" },
    { id: "u3", name: "David Wilson", title: "Data Scientist", path: "/user/david-wilson" },
    { id: "u4", name: "Sophia Lee", title: "Mobile Developer", path: "/user/sophia-lee" }
  ],
  skills: [
    { id: "s1", name: "React", category: "Frontend", path: "/skills/react" },
    { id: "s2", name: "Node.js", category: "Backend", path: "/skills/nodejs" },
    { id: "s3", name: "Figma", category: "Design", path: "/skills/figma" },
    { id: "s4", name: "Python", category: "Programming", path: "/skills/python" },
    { id: "s5", name: "Machine Learning", category: "AI", path: "/skills/machine-learning" },
    { id: "s6", name: "TensorFlow", category: "AI", path: "/skills/tensorflow" },
    { id: "s7", name: "React Native", category: "Mobile", path: "/skills/react-native" }
  ]
};

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Open with keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Handle navigation when an item is selected
  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
    toast({
      title: "Search Result Selected",
      description: `Navigating to ${path}`,
    });
  };

  // Function to search across all categories
  const fuzzySearch = (query: string, items: unknown[], searchKeys: string[]) => {
    if (!query) return [];
    
    const lowerCaseQuery = query.toLowerCase();
    return items.filter(item => {
      return searchKeys.some(key => {
        const value = item[key]?.toLowerCase() || '';
        return value.includes(lowerCaseQuery);
      });
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search anything...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for projects, people, or skills..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Projects">
            {searchIndex.projects.map((project) => (
              <CommandItem 
                key={project.id}
                onSelect={() => handleSelect(project.path)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  <span>{project.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{project.type}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandGroup heading="People">
            {searchIndex.people.map((person) => (
              <CommandItem 
                key={person.id} 
                onSelect={() => handleSelect(person.path)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  <span>{person.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{person.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandGroup heading="Skills">
            {searchIndex.skills.map((skill) => (
              <CommandItem 
                key={skill.id} 
                onSelect={() => handleSelect(skill.path)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  <span>{skill.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{skill.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}