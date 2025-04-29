import React, { useState } from 'react';
import { UserRound, Settings, BookOpen, History, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AccentToggle } from '../components/ui/AccentToggle';
import { useAuth } from '../hooks/useAuth';
import { AccentType } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, signOut, updateUserPreferences } = useAuth();
  const [accent, setAccent] = useState<AccentType>(user?.preferredAccent || 'british');
  const [isPending, setIsPending] = useState(false);
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <UserRound size={48} className="mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">You need to be logged in</h3>
          <p className="mt-2 text-gray-500">Please sign in to view your profile</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => window.location.href = '/login'}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }
  
  const handleAccentChange = async (newAccent: AccentType) => {
    setAccent(newAccent);
    
    try {
      setIsPending(true);
      await updateUserPreferences({ preferredAccent: newAccent });
    } catch (error) {
      console.error('Error updating accent preference:', error);
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <UserRound size={40} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-medium">{user.email}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <Button
                  variant="outline"
                  className="mt-6 w-full"
                  onClick={signOut}
                  leftIcon={<LogOut size={16} />}
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings size={20} className="mr-2" /> Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Accent
                </label>
                <AccentToggle accent={accent} onChange={handleAccentChange} />
                {isPending && (
                  <p className="text-sm text-gray-500 mt-2">Saving your preference...</p>
                )}
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Email Notifications
                </h3>
                <div className="flex items-center">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                    Receive learning reminders and new content updates
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen size={20} className="mr-2" /> Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Beginner Lessons</span>
                      <span className="text-sm font-medium text-gray-700">2/4</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Intermediate Lessons</span>
                      <span className="text-sm font-medium text-gray-700">1/2</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Advanced Lessons</span>
                      <span className="text-sm font-medium text-gray-700">0/2</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History size={20} className="mr-2" /> Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Completed "Basic Greetings"</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Practiced "Restaurant Vocabulary"</p>
                      <p className="text-xs text-gray-500">5 days ago</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      In Progress
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Saved 5 words</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Vocabulary
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};