import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookListScreen from '@screens/books/BookListScreen';
import BookFormScreen from '@screens/books/BookFormScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type AppTabsParamList = {
  Books: undefined;
  AddBook: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

const AppTabs: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name="Books"
        component={BookListScreen}
        options={{
          title: 'Meus livros',
          tabBarIcon: ({ color, size }) => <Icon name="library-books" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="AddBook"
        component={BookFormScreen}
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color, size }) => <Icon name="add-circle-outline" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <Icon name="person" color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
