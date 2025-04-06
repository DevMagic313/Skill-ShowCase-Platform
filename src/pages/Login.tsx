
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
import { Eye, EyeOff, Github, Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// In a real app, this would come from a database or API
// This is just a mock for the frontend demo
const mockRegisteredUsers = [
  { email: "alex.morgan@example.com", password: "password123" },
  { email: "user@example.com", password: "password123" }
];

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    // In a real app, this would be a request to your backend
    setIsLoading(true);
    
    // Check if user exists in our mock data
    const userExists = mockRegisteredUsers.find(
      user => user.email === email && user.password === password
    );
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (userExists) {
        // Successful login
        toast({
          title: "Logged in successfully",
          description: "Welcome back to TalentConnect!",
        });
        
        // Redirect to profile page after successful login
        navigate('/profile');
      } else {
        // Check if the email exists but password is wrong
        const emailExists = mockRegisteredUsers.some(user => user.email === email);
        
        if (emailExists) {
          setLoginError("Invalid password. Please try again.");
        } else {
          setLoginError("Account not found. Please sign up first.");
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {loginError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {loginError}
                </AlertDescription>
              </Alert>
            )}
            
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Forgot password?
                </Link>
              </div>
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
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
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
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-brand-600 hover:text-brand-700">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;