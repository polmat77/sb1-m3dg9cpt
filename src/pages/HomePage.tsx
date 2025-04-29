import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, BookOpen, Mic, UserRound } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl md:mx-auto text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Perfect your English
                <span className="block text-blue-600">pronunciation</span>
              </h1>
              <p className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8">
                Designed for French students, SayItRight helps you refine your pronunciation 
                with both British and American accent options.
              </p>
              <div className="mt-8 flex justify-center">
                {user ? (
                  <Link to="/lessons">
                    <Button variant="primary" size="lg" rightIcon={<BookOpen size={18} />}>
                      Start Learning
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button variant="primary" size="lg">
                      Sign Up for Free
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to learn English pronunciation
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Tools designed specifically for French speakers to overcome common pronunciation challenges
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative flex flex-col items-center">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Headphones size={24} />
                </div>
                <div className="mt-16 text-center">
                  <h3 className="text-lg font-medium text-gray-900">Choose Your Accent</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Switch between British and American pronunciation models to learn the accent that fits your needs.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col items-center">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Mic size={24} />
                </div>
                <div className="mt-16 text-center">
                  <h3 className="text-lg font-medium text-gray-900">Record & Compare</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Record your own pronunciation and receive instant feedback to improve your speaking skills.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col items-center">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <UserRound size={24} />
                </div>
                <div className="mt-16 text-center">
                  <h3 className="text-lg font-medium text-gray-900">Personalized Learning</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Track your progress and focus on the specific sounds that are challenging for French speakers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to improve your pronunciation?</span>
            <span className="block text-blue-200">Start your learning journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            {user ? (
              <div className="inline-flex rounded-md shadow">
                <Link to="/lessons">
                  <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Go to Lessons
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="inline-flex rounded-md shadow">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Get started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};