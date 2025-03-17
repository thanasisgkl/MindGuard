import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';
import { supabase } from './supabase';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = 'https://auth.expo.io/@thanasis1622000/mindguard';

const config = {
  clientId: '1096411820681-iqvhj2u0aqtlqm5ej3f6kqk8ot5enq8q.apps.googleusercontent.com',
  androidClientId: '1096411820681-iqvhj2u0aqtlqm5ej3f6kqk8ot5enq8q.apps.googleusercontent.com',
  iosClientId: '1096411820681-iqvhj2u0aqtlqm5ej3f6kqk8ot5enq8q.apps.googleusercontent.com'
};

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: config.clientId,
    androidClientId: config.androidClientId,
    iosClientId: config.iosClientId,
    redirectUri,
    responseType: AuthSession.ResponseType.Token,
    scopes: ['openid', 'profile', 'email'],
    useProxy: true
  });

  const signInWithGoogle = async () => {
    try {
      if (!request) {
        console.log('Auth request not ready');
        return null;
      }

      console.log('Starting Google Sign In...');
      console.log('Using redirect URI:', redirectUri);
      console.log('Using client ID:', config.clientId);
      
      const result = await promptAsync();
      console.log('Auth Result:', JSON.stringify(result, null, 2));
      
      if (result?.type === 'success') {
        const { authentication } = result;
        if (authentication?.accessToken) {
          return {
            type: 'success',
            accessToken: authentication.accessToken
          };
        }
      }
      
      console.log('Authentication failed:', result?.type);
      if (result?.type === 'error') {
        console.error('Auth Error:', result.error);
      }
      return null;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  return { signInWithGoogle };
};

export const handleVerification = async () => {
  const url = await Linking.getInitialURL();
  
  if (url) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: url.split('#access_token=')[1],
      type: 'email',
    });

    if (error) {
      console.error('Verification error:', error);
      return { success: false, error };
    }

    if (data?.user) {
      console.log('Email verified successfully');
      router.replace('/');
      return { success: true, user: data.user };
    }
  }

  return { success: false, error: 'No verification URL found' };
};

// Listen for incoming links
Linking.addEventListener('url', async ({ url }) => {
  if (url) {
    await handleVerification();
  }
}); 