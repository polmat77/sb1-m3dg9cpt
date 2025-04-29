import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { AccentType, User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, preferredAccent: AccentType) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserPreferences: (data: { preferredAccent?: AccentType }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Fetch user profile data
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (data && !error) {
          setUser({
            id: data.id,
            email: data.email,
            preferredAccent: data.preferred_accent as AccentType,
            createdAt: data.created_at
          });
        } else {
          console.error('Error fetching user data:', error);
        }
      }
      
      setLoading(false);
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Fetch user profile data
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (data && !error) {
            setUser({
              id: data.id,
              email: data.email,
              preferredAccent: data.preferred_accent as AccentType,
              createdAt: data.created_at
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      toast.success('Successfully signed in!');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, preferredAccent: AccentType) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email,
            preferred_accent: preferredAccent
          });

        if (profileError) {
          throw profileError;
        }
      }
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign up');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign out');
    }
  };

  const updateUserPreferences = async (data: { preferredAccent?: AccentType }) => {
    if (!user) return;

    try {
      const updates: Record<string, any> = {};
      
      if (data.preferredAccent) {
        updates.preferred_accent = data.preferredAccent;
      }
      
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Update local user state
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          preferredAccent: data.preferredAccent || prev.preferredAccent
        };
      });
      
      toast.success('Preferences updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while updating your preferences');
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserPreferences
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};