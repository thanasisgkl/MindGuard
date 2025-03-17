/** @type {import('expo/config').ExpoConfig} */
const config = {
  name: 'MindGuard',
  slug: 'mindguard',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'mindguard',
  owner: 'thanasis1622000',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.mindguard.app',
    config: {
      usesNonExemptEncryption: false,
      googleSignIn: {
        reservedClientId: 'com.googleusercontent.apps.1096411820681-iqvhj2u0aqtlqm5ej3f6kqk8ot5enq8q'
      }
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.mindguard.app',
    googleServicesFile: './google-services.json'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-router',
    'expo-web-browser',
    [
      'expo-auth-session',
      {
        scheme: 'mindguard'
      }
    ]
  ],
  extra: {
    eas: {
      projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID
    },
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
  },
  scheme: 'mindguard'
};

module.exports = config; 