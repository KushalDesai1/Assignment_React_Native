/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Registration from './screens/registration/Registration';
import ParticipantList from './screens/participantList/ParticipantList';
import ParticipantDetails from './screens/participantList/ParticipantDetails';
import Charts from './screens/charts/Charts';
import {AppColors} from './utils/AppColors';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function ParticipantScreen({navigation}) {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="ParticipantList" component={ParticipantList} />
      <Stack.Screen name="ParticipantDetails" component={ParticipantDetails} />
    </Stack.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="back"
        drawerContentOptions={{
          activeTintColor: AppColors.drawerActiveTintColor,
        }}>
        <Drawer.Screen name="Registration" component={Registration} />
        <Drawer.Screen name="Participants" component={ParticipantScreen} />
        <Drawer.Screen name="Reports" component={Charts} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
