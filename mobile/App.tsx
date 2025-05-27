import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { config } from './gluestack-style.config';
import RootNavigator from './app/navigation/RootNavigator';
import '@/global.css';
import { StatusBar } from 'expo-status-bar';
import { StyledProvider } from '@gluestack-style/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StyledProvider config={config}>
        <GluestackUIProvider config={config}>
          <StatusBar style="auto" />
          <RootNavigator />
        </GluestackUIProvider>
      </StyledProvider>
    </SafeAreaProvider>
  );
}
