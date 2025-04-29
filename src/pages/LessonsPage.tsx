import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { mockLessons } from '../data/mockLessons';

export const LessonsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  
  // In a real app, this would use the useLessons hook to fetch data from Supabase
  const lessons = mockLessons;
  
  const filteredLessons = lessons
    .filter(lesson => lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     lesson.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(lesson => levelFilter ? lesson.level === levelFilter : true);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilterChange = (level: string | null) => {
    setLevelFilter(level === levelFilter ? null : level);
  };
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">English Lessons</h1>
          <p className="mt-2 text-gray-600">Choose a lesson to start improving your pronunciation</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          {!user && (
            <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700 flex items-center gap-2">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p>
                <Link to="/login" className="font-medium underline">
                  Sign in
                </Link>{' '}
                to save your progress and access all lessons
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant={levelFilter === 'beginner' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('beginner')}
          >
            Beginner
          </Button>
          <Button
            variant={levelFilter === 'intermediate' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('intermediate')}
          >
            Intermediate
          </Button>
          <Button
            variant={levelFilter === 'advanced' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('advanced')}
          >
            Advanced
          </Button>
        </div>
      </div>
      
      {filteredLessons.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={48} className="mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No lessons found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setLevelFilter(null);
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="h-full flex flex-col transition-all duration-150 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{lesson.title}</CardTitle>
                  <span className={`text-xs font-medium py-1 px-2 rounded-full ${
                    lesson.level === 'beginner' ? 'bg-green-100 text-green-800' :
                    lesson.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
                  </span>
                </div>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-500 mb-2">Vocabulary ({lesson.vocabularyItems.length} words):</p>
                <ul className="space-y-1">
                  {lesson.vocabularyItems.slice(0, 3).map((item) => (
                    <li key={item.id} className="text-sm text-gray-700">
                      • {item.word}
                    </li>
                  ))}
                  {lesson.vocabularyItems.length > 3 && (
                    <li className="text-sm text-gray-500 italic">
                      ...and {lesson.vocabularyItems.length - 3} more
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to={`/lessons/${lesson.id}`} className="w-full">
                  <Button variant="primary" className="w-full">
                    Start Lesson
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};