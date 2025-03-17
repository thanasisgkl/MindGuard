import { createClient } from '@supabase/supabase-js';
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 'https://nxorhjbmswkorebsmoct.supabase.co';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54b3JoamJtc3drb3JlYnNtb2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNjU0NDksImV4cCI6MjA1NzY0MTQ0OX0.rY-jfF85t69JSCGPe8y19J_KewYNqcW5SWmoQgJD8QY';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required');
}

// Create the redirect URL using direct deep linking
const redirectUrl = 'mindguard://';
const redirectUrlCallback = 'mindguard://auth/callback';

console.log('Redirect URL:', redirectUrl);
console.log('Redirect URL Callback:', redirectUrlCallback);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirect_to: redirectUrl,
    url: supabaseUrl,
    site_url: redirectUrl,
    debug: __DEV__,
    skipNonceCheck: true
  }
});

// Add debug listener for auth events
supabase.auth.onAuthStateChange((event: 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'TOKEN_REFRESHED' | 'INITIAL_SESSION', session: any) => {
  if (__DEV__) {
    console.log('Auth state changed:', event);
    console.log('Session details:', session);
  }
});

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    console.log('Starting signup process for:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrlCallback,
        data: {
          email_confirm: true
        }
      }
    });

    if (error) {
      console.error('Detailed signup error:', JSON.stringify(error, null, 2));
      throw error;
    }
    
    console.log('Signup response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

export const signInWithGoogleSupabase = async (token: string) => {
  try {
    console.log('Starting Google sign in with token:', token ? 'Token exists' : 'No token');
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token,
      options: {
        redirectTo: redirectUrl
      }
    });

    if (error) {
      console.error('Detailed Google sign in error:', JSON.stringify(error, null, 2));
      throw error;
    }
    
    console.log('Google sign in response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'mindguard://auth/callback'
    });

    if (error) {
      console.error('Error in forgot password:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in forgot password:', error);
    throw error;
  }
}; 