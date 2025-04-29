/*
  # Create initial database schema for SayItRight

  1. New Tables
    - `users` - stores user profile information
    - `lessons` - stores lesson content
    - `vocabulary_items` - stores vocabulary words with pronunciations
    - `pronunciation_attempts` - records user practice attempts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and modify their own data
*/

-- Users table to store user preferences and profile info
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT NOT NULL UNIQUE,
  preferred_accent TEXT NOT NULL DEFAULT 'british',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lessons table to store lesson content
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Vocabulary items table with pronunciation audio paths for different accents
CREATE TABLE IF NOT EXISTS vocabulary_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id),
  word TEXT NOT NULL,
  british_pronunciation TEXT NOT NULL,
  american_pronunciation TEXT NOT NULL,
  definition TEXT NOT NULL,
  example TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pronunciation attempts table to track user practice
CREATE TABLE IF NOT EXISTS pronunciation_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  vocabulary_item_id UUID NOT NULL REFERENCES vocabulary_items(id),
  recording_url TEXT NOT NULL,
  feedback JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pronunciation_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for lessons table
CREATE POLICY "Lessons are readable by everyone"
  ON lessons
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for vocabulary_items table
CREATE POLICY "Vocabulary items are readable by everyone"
  ON vocabulary_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for pronunciation_attempts table
CREATE POLICY "Users can read their own pronunciation attempts"
  ON pronunciation_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pronunciation attempts"
  ON pronunciation_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);