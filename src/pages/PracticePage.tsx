import React, { useState } from 'react';
import { Mic, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AccentToggle } from '../components/ui/AccentToggle';
import { AudioRecorder } from '../components/ui/AudioRecorder';
import { useAuth } from '../hooks/useAuth';
import { AccentType } from '../types';

export const PracticePage: React.FC = () => {
  const { user } = useAuth();
  const [accent, setAccent] = useState<AccentType>(user?.preferredAccent || 'british');
  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; message: string } | null>(null);

  const handleAccentChange = (newAccent: AccentType) => {
    setAccent(newAccent);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleListen = () => {
    // In a real app, this would use a text-to-speech API to pronounce the text
    // with the selected accent
    alert(`Playing ${accent} pronunciation of your text`);
  };

  const resetPractice = () => {
    setInputText('');
    setFeedback(null);
  };

  const handleRecordingComplete = (_: Blob) => {
    // In a real app, this would send the audio to an API for analysis
    // and receive pronunciation feedback
    
    // Mock feedback with random score
    const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-99
    
    let message = '';
    if (score >= 90) {
      message = 'Excellent pronunciation! Keep up the good work.';
    } else if (score >= 80) {
      message = 'Very good! Just a few minor improvements needed.';
    } else if (score >= 70) {
      message = 'Good effort! Try focusing on the stressed syllables.';
    } else {
      message = 'Keep practicing! Pay attention to the vowel sounds.';
    }
    
    setFeedback({ score, message });
    setRecording(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pronunciation Practice</h1>
          <p className="mt-2 text-gray-600">
            Practice your pronunciation skills with any text in {accent} English
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <AccentToggle accent={accent} onChange={handleAccentChange} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Enter Text to Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                rows={6}
                placeholder="Type or paste any text you want to practice pronouncing..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={inputText}
                onChange={handleTextChange}
              ></textarea>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={handleListen}
                  disabled={!inputText.trim()}
                  leftIcon={<Volume2 size={16} />}
                >
                  Listen ({accent})
                </Button>
                <Button
                  variant="outline"
                  onClick={resetPractice}
                  leftIcon={<RotateCcw size={16} />}
                >
                  Reset
                </Button>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Record your pronunciation</h3>
                <AudioRecorder onRecordingComplete={handleRecordingComplete} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Pronunciation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              {feedback ? (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Your Feedback</h3>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-blue-500 text-blue-700 font-bold text-xl">
                      {feedback.score}
                    </div>
                  </div>
                  <p className="text-gray-600">{feedback.message}</p>
                </div>
              ) : (
                <p className="text-gray-600 mb-4">
                  Record yourself saying the text to receive pronunciation feedback.
                </p>
              )}
              
              <h3 className="text-lg font-medium border-t pt-4 mb-2">Common challenges for French speakers:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>The "th" sound (as in "this" or "thanks")</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>The "h" sound at the beginning of words (in French it's silent)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>Distinguishing between short and long vowels</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>Word stress patterns (English has strong stress, French is more even)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>Final consonants (often dropped in French but pronounced in English)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};