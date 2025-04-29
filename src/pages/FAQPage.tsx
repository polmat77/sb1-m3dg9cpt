import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "What makes SayItRight different from other language learning apps?",
      answer: "SayItRight is specifically designed for French speakers learning English pronunciation. We focus on the unique challenges that French speakers face and offer both British and American accent options. Our feedback system targets specific pronunciation issues that are common for native French speakers."
    },
    {
      question: "How does the accent selection work?",
      answer: "When you create an account, you can choose your preferred accent (British or American). This setting affects the pronunciation models used throughout the app. You can change your accent preference at any time from your profile settings."
    },
    {
      question: "How accurate is the pronunciation feedback?",
      answer: "Our pronunciation feedback uses advanced speech recognition technology to analyze your pronunciation against native speaker models. While no technology is perfect, our system can identify common issues in rhythm, intonation, and specific sounds that are challenging for French speakers."
    },
    {
      question: "Do I need to create an account to use SayItRight?",
      answer: "You can access basic features without an account, but creating a free account allows you to save your progress, track your improvement over time, and access all lessons and features."
    },
    {
      question: "How often should I practice to improve my pronunciation?",
      answer: "Consistent practice is key to improving pronunciation. We recommend at least 15-20 minutes of focused practice 3-4 times per week. Short, regular sessions are more effective than occasional longer sessions."
    },
    {
      question: "Can I use SayItRight on my mobile device?",
      answer: "Yes, SayItRight is fully responsive and works on smartphones and tablets as well as desktop computers. You can practice your pronunciation anywhere with an internet connection."
    },
    {
      question: "Why do I need to allow microphone access?",
      answer: "Microphone access is necessary for the pronunciation practice features. SayItRight needs to record your voice to provide accurate feedback on your pronunciation. Your audio is processed securely and is not stored permanently unless you explicitly save a recording."
    },
    {
      question: "Are there any premium features that require payment?",
      answer: "SayItRight offers a free tier with access to essential learning tools. Premium features, including advanced pronunciation analysis, personalized learning plans, and unlimited saved vocabulary, are available through a subscription plan."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <HelpCircle size={48} className="mx-auto text-blue-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find answers to common questions about SayItRight
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <dl className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="px-6 py-6 sm:px-8">
              <dt className="text-lg font-medium text-gray-900">
                {faq.question}
              </dt>
              <dd className="mt-2 text-gray-600">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          If you couldn't find the answer to your question, please contact our support team.
        </p>
        <a
          href="mailto:support@sayitright.com"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};