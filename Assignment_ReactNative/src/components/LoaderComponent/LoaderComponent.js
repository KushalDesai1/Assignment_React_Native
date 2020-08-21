import React, { Component } from 'react';
import {
  StyleSheet, View, Modal, ActivityIndicator, BackHandler
} from 'react-native';
import LoaderStyles from './LoaderStyles'

const LoaderComponent = props => {

  const { loading,
    ...attributes
  } = props;


  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => { console.log('close modal') }}>
      <View style={LoaderStyles.modalBackground}>
        <View style={LoaderStyles.activityIndicatorWrapper}>
          <ActivityIndicator size={30} animating={loading} />
        </View>
      </View>
    </Modal>
  )
}

export default LoaderComponent;