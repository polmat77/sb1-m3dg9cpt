import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { AccentToggle } from '../components/ui/AccentToggle';
import { AudioRecorder } from '../components/ui/AudioRecorder';
import { useAuth } from '../hooks/useAuth';
import { mockLessons } from '../data/mockLessons';
import { AccentType, Lesson, VocabularyItem } from '../types';

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [accent, setAccent] = useState<AccentType>(user?.preferredAccent || 'british');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{ score: number; message: string } | null>(null);

  // In a real app, this would fetch the lesson details from Supabase
  useEffect(() => {
    setLoading(true);
    const foundLesson = mockLessons.find(l => l.id === id);
    
    if (foundLesson) {
      setLesson(foundLesson);
    } else {
      // Handle lesson not found
      navigate('/lessons');
    }
    
    setLoading(false);
  }, [id, navigate]);

  const currentWord = lesson?.vocabularyItems[currentWordIndex];

  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setFeedback(null);
    }
  };

  const handleNextWord = () => {
    if (lesson && currentWordIndex < lesson.vocabularyItems.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setFeedback(null);
    }
  };

  const handleAccentChange = (newAccent: AccentType) => {
    setAccent(newAccent);
  };

  const playPronunciation = () => {
    if (!currentWord) return;
    
    const audioUrl = accent === 'british' 
      ? currentWord.britishPronunciation 
      : currentWord.americanPronunciation;

    // In a real app, this would play the actual audio file
    console.log('Playing pronunciation:', audioUrl);
    // Mock audio playback - would be replaced with actual audio playback
    alert(`Playing ${accent} pronunciation of "${currentWord.word}"`);
  };

  const toggleSavedWord = (wordId: string) => {
    const newSavedWords = new Set(savedWords);
    
    if (newSavedWords.has(wordId)) {
      newSavedWords.delete(wordId);
    } else {
      newSavedWords.add(wordId);
    }
    
    setSavedWords(newSavedWords);
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
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!lesson || !currentWord) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p>Lesson not found.</p>
        <Button variant="outline" onClick={() => navigate('/lessons')} className="mt-4">
          Back to Lessons
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/lessons')}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Lessons
        </button>
        
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="mt-2 text-gray-600">{lesson.description}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <AccentToggle accent={accent} onChange={handleAccentChange} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <span className="text-sm text-gray-500">
                Word {currentWordIndex + 1} of {lesson.vocabularyItems.length}
              </span>
              <div className="flex items-center">
                <h2 className="text-3xl font-bold text-gray-900 mr-3">{currentWord.word}</h2>
                <button
                  onClick={() => toggleSavedWord(currentWord.id)}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label={savedWords.has(currentWord.id) ? "Unsave word" : "Save word"}
                >
                  {savedWords.has(currentWord.id) ? (
                    <BookmarkCheck size={20} className="text-amber-500" />
                  ) : (
                    <Bookmark size={20} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={playPronunciation}
                className="flex items-center"
                aria-label={`Play ${accent} pronunciation`}
              >
                <Volume2 size={16} className="mr-2" />
                Listen ({accent})
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500">Definition</h3>
            <p className="mt-1 text-gray-900">{currentWord.definition}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Example</h3>
            <p className="mt-1 text-gray-900 italic">"{currentWord.example}"</p>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Pronunciation</h3>
          <AudioRecorder onRecordingComplete={handleRecordingComplete} />
          
          {feedback && (
            <div className="mt-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Pronunciation Feedback</h4>
                      <p className="text-gray-600 mt-1">{feedback.message}</p>
                    </div>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-blue-500 text-blue-700 font-bold text-xl">
                      {feedback.score}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevWord}
            disabled={currentWordIndex === 0}
          >
            Previous
          </Button>
          <Button 
            variant="primary" 
            onClick={handleNextWord}
            disabled={currentWordIndex === lesson.vocabularyItems.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};