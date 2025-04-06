
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Github, Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SignupPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    
    if (!acceptTerms) {
      setSignupError("You must accept the terms and conditions to sign up.");
      return;
    }
    
    // In a real app, this would be a request to your backend
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Since this is frontend only, we'll simulate a successful signup
      toast({
        title: "Account created successfully",
        description: "Welcome to TalentConnect! Your profile is ready.",
      });
      
      // Redirect to profile page after successful signup
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create a TalentConnect account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {signupError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {signupError}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Password must be at least 8 characters long.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => {
                  setAcceptTerms(checked === true);
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-brand-600 hover:text-brand-800 underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-brand-600 hover:text-brand-800 underline">
                  privacy policy
                </Link>
              </label>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button variant="outline" type="button" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;