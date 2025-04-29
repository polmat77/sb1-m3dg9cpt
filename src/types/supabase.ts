export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lessons: {
        Row: {
          id: string
          title: string
          description: string
          level: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          level: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          level?: string
          created_at?: string
        }
        Relationships: []
      }
      pronunciation_attempts: {
        Row: {
          id: string
          user_id: string
          vocabulary_item_id: string
          recording_url: string
          feedback: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vocabulary_item_id: string
          recording_url: string
          feedback: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          vocabulary_item_id?: string
          recording_url?: string
          feedback?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pronunciation_attempts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pronunciation_attempts_vocabulary_item_id_fkey"
            columns: ["vocabulary_item_id"]
            referencedRelation: "vocabulary_items"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          preferred_accent: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          preferred_accent?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          preferred_accent?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "auth.users"
            referencedColumns: ["id"]
          }
        ]
      }
      vocabulary_items: {
        Row: {
          id: string
          lesson_id: string
          word: string
          british_pronunciation: string
          american_pronunciation: string
          definition: string
          example: string
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          word: string
          british_pronunciation: string
          american_pronunciation: string
          definition: string
          example: string
          created_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          word?: string
          british_pronunciation?: string
          american_pronunciation?: string
          definition?: string
          example?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vocabulary_items_lesson_id_fkey"
            columns: ["lesson_id"]
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}