import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from './Decks';
import AddDeck from './AddDeck';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { green, black } from '../utils/colors';
import { useSafeArea } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// create bottom tab
const Tab = createBottomTabNavigator();

const TabHomeScreen = ({ navigation, route}) => {
    const insets = useSafeArea();
    
    const padding = { 
        paddingTop: 0,
        paddingBottom: insets.bottom
    }
    
    navigation.setOptions({ 
        headerTitle: getFocusedRouteNameFromRoute(route) || 'Decks'
    })

    return (

        <View style={{ flex: 1, ...padding}}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {

                        let inputName = route.name === 'Decks'
                            ? 'cards-outline'
                            : 'plus-box-outline'
                        return <MaterialCommunityIcons name={inputName} size={24} color={color} />
                    },

                })}
                tabBarOptions={{
                    activeTintColor: green,
                    inactiveTintColor: '#fff',
                    labelStyle: {
                        fontWeight: 'bold'
                    },
                    tabStyle: {
                        height: 60,
                        padding: 5
                    },
                    style: {
                        backgroundColor: black,
                        borderRadius: 30,
                        margin: 10,
                        height: 60,
                    },
                    labelPosition: 'beside-icon'
                }}

            >
                <Tab.Screen options={{ tabBarLabel: 'Decks!' }} name="Decks" component={Decks} />
                <Tab.Screen options={{ tabBarLabel: 'Add Deck!' }} name="Add Deck" component={AddDeck} />
            </Tab.Navigator>
        </View>
    )
}


export default TabHomeScreen;