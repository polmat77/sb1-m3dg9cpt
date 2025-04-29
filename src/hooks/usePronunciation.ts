import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AccentType } from '../types';

interface PronunciationAnalysis {
  accuracy: number;
  fluency: number;
  completeness: number;
  pronunciation: number;
  phonemes: {
    phoneme: string;
    score: number;
    offset: number;
    duration: number;
  }[];
}

export const usePronunciation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzePronunciation = async (
    audioBlob: Blob,
    text: string,
    accent: AccentType
  ): Promise<PronunciationAnalysis> => {
    setLoading(true);
    setError(null);

    try {
      const audioData = await audioBlob.arrayBuffer();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-pronunciation`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audioData: Array.from(new Uint8Array(audioData)),
            text,
            accent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze pronunciation');
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred during pronunciation analysis');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzePronunciation,
    loading,
    error
  };
};