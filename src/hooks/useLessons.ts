import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lesson, VocabularyItem } from '../types';

export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch lessons
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (lessonsError) {
          throw lessonsError;
        }

        if (!lessonsData || lessonsData.length === 0) {
          setLessons([]);
          return;
        }

        // Fetch vocabulary items for each lesson
        const lessonIds = lessonsData.map(lesson => lesson.id);
        const { data: vocabData, error: vocabError } = await supabase
          .from('vocabulary_items')
          .select('*')
          .in('lesson_id', lessonIds);
          
        if (vocabError) {
          throw vocabError;
        }

        // Map vocabulary items to their respective lessons
        const lessonsWithVocab = lessonsData.map(lesson => {
          const vocabularyItems = vocabData
            ?.filter(item => item.lesson_id === lesson.id)
            .map(item => ({
              id: item.id,
              word: item.word,
              britishPronunciation: item.british_pronunciation,
              americanPronunciation: item.american_pronunciation,
              definition: item.definition,
              example: item.example
            })) as VocabularyItem[];
          
          return {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            level: lesson.level,
            vocabularyItems
          };
        });

        setLessons(lessonsWithVocab);
      } catch (err: any) {
        console.error('Error fetching lessons:', err);
        setError(err.message || 'An error occurred while fetching lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const getLessonById = (id: string): Lesson | undefined => {
    return lessons.find(lesson => lesson.id === id);
  };

  return {
    lessons,
    loading,
    error,
    getLessonById
  };
};