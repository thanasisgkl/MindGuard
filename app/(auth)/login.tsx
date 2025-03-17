import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGoogleAuth } from '../../services/auth';
import { signInWithGoogleSupabase, signInWithEmail, supabase } from '../../services/supabase';
import { useRouter } from 'expo-router';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSignInLoading, setIsEmailSignInLoading] = useState(false);
  const { signInWithGoogle } = useGoogleAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      setIsEmailSignInLoading(true);
      console.log('Attempting to sign in with email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Sign in response:', { data, error });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          Alert.alert('Error', 'Invalid email or password');
        } else if (error.message.includes('Email not confirmed')) {
          Alert.alert('Error', 'Please verify your email before signing in');
        } else {
          throw error;
        }
        return;
      }

      if (data?.user) {
        console.log('Login successful, user:', data.user);
        router.replace('/');
      } else {
        throw new Error('No user data received');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsEmailSignInLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithGoogle();
      
      if (result?.type === 'success' && result.accessToken) {
        const supabaseData = await signInWithGoogleSupabase(result.accessToken);
        console.log('Supabase login success:', supabaseData);
        router.replace('/');
      } else {
        Alert.alert('Error', 'Failed to sign in with Google');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    router.push('/signup');
  };

  const navigateToForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="displayLarge" style={styles.headerText}>
          MindGuard.
        </Text>
      </View>

      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>
          Sign In
        </Text>
        
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          style={styles.input}
          outlineColor="#000000"
          activeOutlineColor="#000000"
          textColor="#000000"
          disabled={isEmailSignInLoading}
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
              color="#000000"
            />
          }
          style={styles.input}
          outlineColor="#000000"
          activeOutlineColor="#000000"
          textColor="#000000"
          disabled={isEmailSignInLoading}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={[styles.button, { width: '100%' }]}
          labelStyle={styles.buttonText}
          buttonColor="#000000"
          textColor="#ffffff"
          loading={isEmailSignInLoading}
          disabled={isEmailSignInLoading || isLoading}
        >
          {isEmailSignInLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <Divider style={styles.divider} />
        </View>

        <Button
          mode="outlined"
          onPress={handleGoogleLogin}
          style={styles.socialButton}
          icon={() => (
            <MaterialCommunityIcons name="google" size={24} color="#000000" />
          )}
          textColor="#000000"
          loading={isLoading}
          disabled={isLoading || isEmailSignInLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>

        <View style={styles.links}>
          <Button 
            mode="text" 
            onPress={navigateToForgotPassword}
            textColor="#000000"
            disabled={isLoading || isEmailSignInLoading}
          >
            Forgot Password?
          </Button>
          <Button 
            mode="text" 
            onPress={navigateToSignUp}
            textColor="#000000"
            disabled={isLoading || isEmailSignInLoading}
          >
            Create Account
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  headerText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 36,
    fontFamily: 'Times New Roman',
    letterSpacing: -1
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    color: '#000000',
    textAlign: 'left',
    marginBottom: 32,
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff'
  },
  button: {
    marginTop: 8,
    paddingVertical: 6
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  divider: {
    flex: 1,
    backgroundColor: '#000000'
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#000000',
    fontSize: 14
  },
  socialButton: {
    borderColor: '#000000',
    borderWidth: 1
  },
  links: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
}); 