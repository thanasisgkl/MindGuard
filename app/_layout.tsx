import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function Layout(): React.JSX.Element {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
} 