import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Globe, BookOpen, Mic, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "French Student",
      text: "SayItRight helped me master the 'th' sound in just weeks. The British accent option was exactly what I needed!",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    },
    {
      name: "Thomas Laurent",
      role: "Business Professional",
      text: "The instant feedback on my pronunciation has improved my confidence in international meetings significantly.",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      name: "Sophie Martin",
      role: "University Student",
      text: "Being able to switch between American and British accents has made my English learning journey so much more effective.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 transform -skew-y-6"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-base font-semibold text-blue-600">
                  Pour les étudiants français
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  Perfect Your English Pronunciation
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Master both British and American accents with personalized feedback and real-time pronunciation analysis. Start speaking English with confidence today.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                  {user ? (
                    <Link to="/home">
                      <Button variant="primary" size="lg" rightIcon={<BookOpen size={20} />}>
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/register">
                        <Button variant="primary" size="lg">
                          Start Free Trial
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button variant="outline" size="lg">
                          Sign In
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg"
                    alt="Student practicing English pronunciation"
                  />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-white bg-opacity-75 backdrop-blur-sm"
                      leftIcon={<Mic size={24} />}
                    >
                      Try Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to improve your English pronunciation
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Globe className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">British & American Accents</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Choose between British and American pronunciation models to match your learning goals.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Mic className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Feedback</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Get instant feedback on your pronunciation with detailed suggestions for improvement.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Structured Lessons</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Follow our carefully designed curriculum tailored for French speakers.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Progress Tracking</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Monitor your improvement with detailed progress analytics and achievements.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by French Students
            </p>
          </div>
          
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to improve your English?</span>
            <span className="block text-blue-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            {user ? (
              <div className="inline-flex rounded-md shadow">
                <Link to="/home">
                  <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Go to Dashboard
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