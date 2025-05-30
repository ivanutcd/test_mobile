import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import GetFormScreen from '../screens/GetFormScreen';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#5FD0DF',
        tabBarInactiveTintColor: '#8f8f8f',
        tabBarStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Formularios"
        component={GetFormScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="list" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
