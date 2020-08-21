import React, { Component } from 'react';
import {
  View, ActivityIndicator,
} from 'react-native';
import LoaderStyles from './LoaderStyles'

const LoaderComponent = props => {

  const {loading} = props;
  return (
    <View style = {LoaderStyles.container}>
            <ActivityIndicator
               animating = {loading}
               color = '#bc2b78'
               size = "large"
               style = {LoaderStyles.activityIndicator}/>
         </View>
  )
}

export default LoaderComponent;