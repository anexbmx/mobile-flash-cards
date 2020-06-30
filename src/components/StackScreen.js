import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabHomeScreen from './TabHomeScreen';
import DeckDetail from './DeckDetail';
import AddCard from './AddCard';
import Quiz from './Quiz';
import { black } from '../utils/colors';

const Stack = createStackNavigator();

const ScreenNavigatorOptions = {
  headerStyle: { backgroundColor: black },
  headerTintColor: '#fff',

};


export default function StackScreen() {
    return (
      <SafeAreaProvider >
        <View style={{ flex: 1}}>
          <StatusBar style="light" translucent />
          <NavigationContainer >
            <Stack.Navigator screenOptions={ScreenNavigatorOptions}>
              <Stack.Screen options={{ title: 'Decks' }} name="decks" component={TabHomeScreen} />
              <Stack.Screen options={{ title: 'Deck Name' }} name="deckDetail" component={DeckDetail} />
              <Stack.Screen options={{ title: 'New Card' }} name="addNewCard" component={AddCard} />
              <Stack.Screen options={{ title: 'Quiz' }} name="quiz" component={Quiz} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    );
  }