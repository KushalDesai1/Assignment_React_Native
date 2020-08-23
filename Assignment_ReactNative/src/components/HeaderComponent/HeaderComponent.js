import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {HeaderStyle} from './HeaderStyle';
import AppImages from '../../utils/AppImages';

const HeaderComponent = (props) => {
  return (
    <View style={HeaderStyle.container}>
      {props.menu ? (
        <TouchableOpacity onPress={props.handleDrawer}>
          <Image
            source={AppImages.menu}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      ) : props.back ? (
        <TouchableOpacity onPress={props.handleBackButton}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color:'white'}}>{'<'}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Image source={null} style={{width: 25, height: 25, marginLeft: 5}} />
      )}

      <Text style={HeaderStyle.title}>{props.title}</Text>
      <Image source={null} style={{width: 25, height: 25, marginLeft: 5}} />
    </View>
  );
};

export default HeaderComponent;
