export type AccentType = 'british' | 'american';

export interface User {
  id: string;
  email: string;
  preferredAccent: AccentType;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  vocabularyItems: VocabularyItem[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  britishPronunciation: string; // URL to audio file
  americanPronunciation: string; // URL to audio file
  definition: string;
  example: string;
}

export interface PronunciationAttempt {
  id: string;
  userId: string;
  vocabularyItemId: string;
  recordingUrl: string;
  feedback: PronunciationFeedback;
  createdAt: string;
}

export interface PronunciationFeedback {
  accuracy: number; // 0-100
  suggestions: string[];
}