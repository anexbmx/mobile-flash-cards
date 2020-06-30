import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { black } from '../utils/colors';
import { Provider } from 'react-redux';
import StackScreen from './StackScreen';
import { createStore } from 'redux';
import reducer from '../reducers';
import middleware from '../middleware';
import { setLocalNotification } from '../utils/helpers';

const Stack = createStackNavigator();
const ScreenNavigatorOptions = {
  headerStyle: { backgroundColor: black },
  headerTintColor: '#fff',
  headerTitleStyle: {
    borderBottomColor: 'red'
  },
};


const store = createStore(reducer, middleware)

export default class App extends Component {

  componentDidMount() {
    setLocalNotification()

  }

  render() {
    return (
      <Provider store={store}>
        <StackScreen />
      </Provider>
    );
  }
}


