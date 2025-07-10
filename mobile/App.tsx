import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { config } from './gluestack-style.config';
import RootNavigator from './app/navigation/RootNavigator';
import '@/global.css';
import { StatusBar } from 'expo-status-bar';
import { StyledProvider } from '@gluestack-style/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SQLiteProvider } from 'expo-sqlite';
import { createDbIfNeeded } from './database/database';
import { AuthProvider } from '@/src/context/AuthProvider';
import { ToastProvider } from '@gluestack-ui/toast';


export default function App() {
  return (
    <SQLiteProvider databaseName="utcd-forms.db" onInit={createDbIfNeeded}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StyledProvider config={config}>
          <GluestackUIProvider config={config}>
            <ToastProvider >
            <StatusBar style="auto" />
            <AuthProvider>
              <RootNavigator />
            </AuthProvider>
            </ToastProvider>
          </GluestackUIProvider>
        </StyledProvider>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
