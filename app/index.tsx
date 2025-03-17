import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const handlePress = () => {
    router.push('/(auth)/login');
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text variant="headlineLarge" style={styles.text}>
        Welcome to MindGuard
      </Text>
      <Text variant="bodyMedium" style={styles.subtext}>
        Tap anywhere to continue
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16
  },
  subtext: {
    color: '#666666',
    textAlign: 'center'
  }
}); 