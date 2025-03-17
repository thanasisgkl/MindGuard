import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGoogleAuth } from '../../../services/auth';
import { signInWithGoogleSupabase } from '../../../services/supabase';
import { useRouter } from 'expo-router';
// ... existing code ... 