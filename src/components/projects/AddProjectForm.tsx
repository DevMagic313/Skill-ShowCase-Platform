
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Upload, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Skill options for the select dropdown
const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'React Native', 'Node.js', 
  'Python', 'Django', 'Flask', 'AWS', 'Docker', 'Kubernetes',
  'UI/UX', 'Figma', 'Adobe XD', 'HTML', 'CSS', 'SCSS',
  'Angular', 'Vue.js', 'GraphQL', 'MongoDB', 'PostgreSQL', 
  'MySQL', 'Firebase', 'Mobile Development', 'Web Development'
];

const AddProjectForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    liveUrl: '',
    sourceCodeUrl: '',
    coverImage: null as File | null,
    additionalImages: [] as File[],
    selectedSkills: [] as string[]
  });
  
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillSelect = (skill: string) => {
    // Add skill if not already selected
    if (!formData.selectedSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        selectedSkills: [...prev.selectedSkills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSkills: prev.selectedSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, coverImage: file }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Limit to 5 additional images
      const totalImages = formData.additionalImages.length + newFiles.length;
      if (totalImages > 5) {
        toast({
          title: "Too many images",
          description: "You can upload a maximum of 5 additional images",
          variant: "destructive"
        });
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...newFiles]
      }));
      
      // Create image previews
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setAdditionalImagePreviews(prev => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
    
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title || !formData.description || !formData.coverImage || formData.selectedSkills.length === 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate upload process
    setUploading(true);
    
    // In a real app, you would upload files to a server here
    setTimeout(() => {
      setUploading(false);
      
      toast({
        title: "Project submitted successfully",
        description: "Your project has been uploaded and is now visible on your profile"
      });
      
      // Redirect to profile page
      navigate('/profile');
    }, 1500);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Project Title *</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Enter a descriptive title for your project"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Short Description *</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="A brief summary of your project (max 150 characters)"
                maxLength={150}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length}/150 characters
              </p>
            </div>
            
            <div>
              <Label htmlFor="fullDescription">Full Description *</Label>
              <Textarea 
                id="fullDescription" 
                name="fullDescription" 
                value={formData.fullDescription} 
                onChange={handleInputChange} 
                placeholder="Detailed description of your project, including goals, implementation details, challenges, etc."
                className="min-h-[200px]"
                required
              />
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <Label>Skills & Technologies Used *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.selectedSkills.map((skill) => (
                <div 
                  key={skill} 
                  className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-brand-600 hover:text-brand-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <Select onValueChange={handleSkillSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Add skills" />
              </SelectTrigger>
              <SelectContent>
                {skillOptions
                  .filter(skill => !formData.selectedSkills.includes(skill))
                  .map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          
          {/* Project URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="liveUrl">Live Demo URL</Label>
              <Input 
                id="liveUrl" 
                name="liveUrl" 
                value={formData.liveUrl} 
                onChange={handleInputChange} 
                placeholder="https://yourdemo.com"
              />
            </div>
            
            <div>
              <Label htmlFor="sourceCodeUrl">Source Code URL</Label>
              <Input 
                id="sourceCodeUrl" 
                name="sourceCodeUrl" 
                value={formData.sourceCodeUrl} 
                onChange={handleInputChange} 
                placeholder="https://github.com/yourusername/project"
              />
            </div>
          </div>
          
          {/* Cover Image Upload */}
          <div>
            <Label>Cover Image *</Label>
            <div className="mt-2">
              {coverImagePreview ? (
                <div className="relative w-full h-60 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={coverImagePreview} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover" 
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImagePreview('');
                      setFormData(prev => ({ ...prev, coverImage: null }));
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-60 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-brand-300 transition-colors">
                  <Label 
                    htmlFor="coverImage" 
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">Click to upload cover image</span>
                    <span className="text-gray-500 text-sm mt-1">SVG, PNG, JPG or GIF (max. 2MB)</span>
                  </Label>
                  <Input 
                    id="coverImage" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleCoverImageChange} 
                    className="hidden" 
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Additional Images Upload */}
          <div>
            <Label>Additional Images (Optional)</Label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Display image previews */}
              {additionalImagePreviews.map((preview, index) => (
                <div key={index} className="relative h-40 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              ))}
              
              {/* Add image button (show only if less than 5 images) */}
              {additionalImagePreviews.length < 5 && (
                <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-2 cursor-pointer hover:border-brand-300 transition-colors">
                  <Label 
                    htmlFor="additionalImages" 
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                  >
                    <Plus className="h-8 w-8 text-gray-400 mb-1" />
                    <span className="text-gray-600 text-sm text-center">Add image</span>
                  </Label>
                  <Input 
                    id="additionalImages" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAdditionalImagesChange} 
                    className="hidden" 
                  />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Upload up to 5 additional images showcasing your project
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/profile')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Submit Project'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddProjectForm;