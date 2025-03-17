import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'MindGuard',
  slug: 'mindguard',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  experiments: {
    tsconfigPaths: true,
  },
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.mindguard.app',
    newArchEnabled: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.mindguard.app',
    newArchEnabled: true
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-router',
    '@react-native-google-signin/google-signin',
    'expo-secure-store',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static'
        }
      }
    ]
  ],
  scheme: 'mindguard',
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    eas: {
      projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID
    }
  }
};

export default config; 