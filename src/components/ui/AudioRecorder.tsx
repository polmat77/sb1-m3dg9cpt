import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, RotateCcw } from 'lucide-react';
import { Button } from './Button';
import { PronunciationFeedback } from './PronunciationFeedback';
import { usePronunciation } from '../../hooks/usePronunciation';
import { AccentType } from '../../types';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  text: string;
  accent: AccentType;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete, text, accent }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const { analyzePronunciation, loading: analyzing } = usePronunciation();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        handlePronunciationAnalysis(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handlePronunciationAnalysis = async (audioBlob: Blob) => {
    try {
      const result = await analyzePronunciation(audioBlob, text, accent);
      setFeedback(result);
      onRecordingComplete(audioBlob);
    } catch (error) {
      console.error('Error analyzing pronunciation:', error);
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setFeedback(null);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-center mb-4">
        <div className="w-full max-w-xs bg-gray-100 h-24 rounded-md relative overflow-hidden">
          {audioUrl ? (
            <audio src={audioUrl} controls className="w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full">
              {isRecording ? (
                <div className="flex flex-col items-center animate-pulse">
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-blue-500 rounded-full" 
                        style={{ 
                          height: `${20 + Math.sin(i * 0.5) * 10}px`, 
                          animationDelay: `${i * 0.1}s` 
                        }} 
                      />
                    ))}
                  </div>
                  <span className="text-blue-600 mt-2 font-mono">
                    {formatTime(recordingTime)}
                  </span>
                </div>
              ) : (
                <span className="text-gray-500 text-sm">
                  {audioUrl ? 'Recording saved' : 'Ready to record'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {!isRecording && !audioUrl && (
          <Button 
            onClick={startRecording} 
            variant="primary"
            leftIcon={<Mic size={16} />}
          >
            Record
          </Button>
        )}
        {isRecording && (
          <Button 
            onClick={stopRecording} 
            variant="secondary"
            leftIcon={<Square size={16} />}
          >
            Stop
          </Button>
        )}
        {audioUrl && (
          <>
            <Button 
              onClick={() => {
                const audio = new Audio(audioUrl);
                audio.play();
              }} 
              variant="outline"
              leftIcon={<Play size={16} />}
            >
              Play
            </Button>
            <Button 
              onClick={resetRecording} 
              variant="outline"
              leftIcon={<RotateCcw size={16} />}
            >
              New Recording
            </Button>
          </>
        )}
      </div>
      
      {feedback && (
        <div className="mt-6">
          <PronunciationFeedback {...feedback} />
        </div>
      )}
    </div>
  );
};