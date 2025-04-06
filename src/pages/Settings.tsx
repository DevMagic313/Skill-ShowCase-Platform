
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff, 
  ChevronDown,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your new password")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  projectUpdates: z.boolean(),
  newMessages: z.boolean(),
  marketingEmails: z.boolean(),
});

const privacySchema = z.object({
  profileVisibility: z.enum(["public", "private", "connections"]),
  showEmail: z.boolean(),
  showLocation: z.boolean(),
  allowTagging: z.boolean(),
});

const SettingsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(true);
  const [isOpenNotifications, setIsOpenNotifications] = useState(true);
  const [isOpenSecurity, setIsOpenSecurity] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Password change form
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });
  
  // Notification settings form
  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      projectUpdates: true,
      newMessages: true,
      marketingEmails: false
    }
  });
  
  // Privacy settings form
  const privacyForm = useForm<z.infer<typeof privacySchema>>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: "public",
      showEmail: false,
      showLocation: true,
      allowTagging: true
    }
  });
  
  const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1500);
  };
  
  const onNotificationSubmit = (data: z.infer<typeof notificationSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Notification preferences saved",
        description: "Your notification settings have been updated.",
      });
    }, 1000);
  };
  
  const onPrivacySubmit = (data: z.infer<typeof privacySchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Privacy settings saved",
        description: "Your privacy settings have been updated.",
      });
    }, 1000);
  };
  
  const handleLogout = () => {
    // In a real app, this would clear auth tokens, session, etc.
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your account details and personal information.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value="Alex Morgan" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value="alex.morgan@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value="alexmorgan" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeZone">Time Zone</Label>
                <select 
                  id="timeZone" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT-07:00) Mountain Time</option>
                  <option>(GMT-06:00) Central Time</option>
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) UTC</option>
                  <option>(GMT+01:00) Central European Time</option>
                </select>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>
                Manage your account status and data.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Deactivate Account</h3>
                  <p className="text-sm text-gray-500">
                    Temporarily disable your account. You can reactivate anytime.
                  </p>
                </div>
                <Button variant="outline">Deactivate</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-destructive">Delete Account</h3>
                  <p className="text-sm text-gray-500">
                    Permanently delete your account and all data. This cannot be undone.
                  </p>
                </div>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your password and account security.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Collapsible open={isOpenSecurity} onOpenChange={setIsOpenSecurity} className="w-full">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isOpenSecurity ? "transform rotate-180" : ""}`} />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="pt-4">
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type={showCurrentPassword ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  {...field} 
                                />
                              </FormControl>
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type={showNewPassword ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  {...field} 
                                />
                              </FormControl>
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                            <FormDescription>
                              Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input 
                                type={showNewPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isLoading} className="mt-2">
                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </form>
                  </Form>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <h3 className="font-medium">Session Management</h3>
                    <p className="text-sm text-gray-500">
                      Manage your active sessions and logged-in devices.
                    </p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <h3 className="font-medium">Log Out Everywhere</h3>
                    <p className="text-sm text-gray-500">
                      Log out from all devices except the current one.
                    </p>
                  </div>
                  <Button variant="outline">Log Out All</Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end border-t pt-6">
              <Button variant="outline" className="flex items-center" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Collapsible open={isOpenNotifications} onOpenChange={setIsOpenNotifications} className="w-full">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isOpenNotifications ? "transform rotate-180" : ""}`} />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="pt-4">
                  <Form {...notificationForm}>
                    <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                              <FormDescription>
                                Receive email notifications for important updates.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="projectUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Project Updates</FormLabel>
                              <FormDescription>
                                Get notified when projects you follow are updated.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="newMessages"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">New Messages</FormLabel>
                              <FormDescription>
                                Get notified when you receive new messages.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="marketingEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Marketing Emails</FormLabel>
                              <FormDescription>
                                Receive promotional emails and newsletters.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isLoading} className="mt-2">
                        {isLoading ? "Saving..." : "Save Preferences"}
                      </Button>
                    </form>
                  </Form>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4">Notification Channels</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">In-App Notifications</p>
                      <p className="text-sm text-gray-500">Show notifications within the app</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Browser Notifications</p>
                      <p className="text-sm text-gray-500">Show desktop notifications in your browser</p>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button type="submit">
                Save All Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control who can see your profile and information.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Collapsible open={isOpenPrivacy} onOpenChange={setIsOpenPrivacy} className="w-full">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                  <h3 className="text-lg font-medium">Profile Visibility</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isOpenPrivacy ? "transform rotate-180" : ""}`} />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="pt-4">
                  <Form {...privacyForm}>
                    <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-4">
                      <FormField
                        control={privacyForm.control}
                        name="profileVisibility"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Who can see your profile?</FormLabel>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={field.value}
                              onChange={field.onChange}
                            >
                              <option value="public">Public (Everyone)</option>
                              <option value="connections">Connections Only</option>
                              <option value="private">Private (Only You)</option>
                            </select>
                            <FormDescription>
                              This controls who can view your full profile information.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={privacyForm.control}
                        name="showEmail"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Show Email Address</FormLabel>
                              <FormDescription>
                                Allow others to see your email address on your profile.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={privacyForm.control}
                        name="showLocation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Show Location</FormLabel>
                              <FormDescription>
                                Display your location information on your profile.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={privacyForm.control}
                        name="allowTagging"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Allow Tagging</FormLabel>
                              <FormDescription>
                                Allow others to tag you in projects and comments.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isLoading} className="mt-2">
                        {isLoading ? "Saving..." : "Save Privacy Settings"}
                      </Button>
                    </form>
                  </Form>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4">Data & Privacy</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Download Your Data</p>
                      <p className="text-sm text-gray-500">Get a copy of all your data</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Usage Tracking</p>
                      <p className="text-sm text-gray-500">Allow anonymous usage data collection to improve the platform</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button type="submit">
                Save All Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;