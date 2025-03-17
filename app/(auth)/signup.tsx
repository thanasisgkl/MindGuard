import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { signUpWithEmail } from '../../services/supabase';
import { useRouter } from 'expo-router';
import { supabase } from '../../services/supabase';

function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://auth.expo.io/thanasis1622000/mindguard/redirect'
        }
      });

      if (error) throw error;

      Alert.alert(
        'Verification Email Sent',
        'Please check your email to verify your account. After verification, you can sign in.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login')
          }
        ]
      );
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Error', error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text variant="displayLarge" style={styles.headerText}>
          MindGuard.
        </Text>
      </View>

      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>
          Create Account
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
          disabled={isLoading}
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
          disabled={isLoading}
        />

        <TextInput
          mode="outlined"
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              color="#000000"
            />
          }
          style={styles.input}
          outlineColor="#000000"
          activeOutlineColor="#000000"
          textColor="#000000"
          disabled={isLoading}
        />

        <Button
          mode="contained"
          onPress={handleSignUp}
          style={styles.button}
          labelStyle={styles.buttonText}
          buttonColor="#000000"
          textColor="#ffffff"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <View style={styles.links}>
          <Button 
            mode="text" 
            onPress={() => router.back()}
            textColor="#000000"
            disabled={isLoading}
          >
            Back to Sign In
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;

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
  links: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  }
}); 