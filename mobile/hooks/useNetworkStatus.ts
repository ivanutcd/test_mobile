import { useEffect, useState } from 'react';
import {
  getNetworkStateAsync,
  NetworkStateType,
  addNetworkStateListener,
  NetworkState,
} from 'expo-network';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [networkState, setNetworkState] = useState<NetworkState | null>(null);

  useEffect(() => {
    const checkInitialNetwork = async () => {
      const initialState = await getNetworkStateAsync();
      setIsConnected(
        initialState.type !== NetworkStateType.NONE &&
          (initialState.isConnected ?? false),
      );
      setNetworkState(initialState);
    };

    checkInitialNetwork();

    const subscription = addNetworkStateListener(state => {
      const connected =
        state.type !== NetworkStateType.NONE && (state.isConnected ?? false);
      setIsConnected(connected);
      setNetworkState(state);
    });

    return () => {
      subscription.remove(); // Limpieza del listener
    };
  }, []);

  return {
    isConnected,
    networkState,
  };
};

export default useNetworkStatus;
