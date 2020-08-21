import React from 'react';
import {View, Text} from 'react-native';
import {HeaderStyle} from './HeaderStyle';

const HeaderComponent = props => {

  return (
    <View style={HeaderStyle.container}>
      <Text style={HeaderStyle.title}>{props.title}</Text>
    </View>
  );
};

export default HeaderComponent;
