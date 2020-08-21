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

import Registration from './screens/registration/Registration';
import ParticipantList from './screens/participantList/ParticipantList';
import Charts from './screens/charts/Charts';
import {AppColors} from './utils/AppColors';

const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="back"
        drawerContentOptions={{
          activeTintColor: AppColors.drawerActiveTintColor,
        }}>
        <Drawer.Screen name="Registration" component={Registration} />
        <Drawer.Screen name="Participants" component={ParticipantList} />
        <Drawer.Screen name="Charts" component={Charts} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
