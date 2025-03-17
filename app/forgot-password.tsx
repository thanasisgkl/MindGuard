import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { forgotPassword } from '../services/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(email);
      Alert.alert(
        'Success',
        'If an account exists with this email, you will receive password reset instructions.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Reset password error:', error);
      Alert.alert('Error', 'Failed to send reset password email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Reset Password
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Enter your email address and we'll send you instructions to reset your password.
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
          disabled={loading}
        />

        <Button
          mode="contained"
          onPress={handleResetPassword}
          loading={loading}
          disabled={loading}
          style={styles.button}
          buttonColor="#000000"
          textColor="#ffffff"
        >
          Send Reset Instructions
        </Button>

        <Button
          mode="text"
          onPress={() => router.back()}
          style={styles.backButton}
          textColor="#000000"
        >
          Back to Login
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 10,
    padding: 4,
  },
  backButton: {
    marginTop: 20,
  },
}); 