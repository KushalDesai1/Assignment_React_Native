import React from 'react';
import {View, TextInput, Text} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {RegistrationStyles} from './RegistrationStyle';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      dob: '',
      profession: '',
      locality: '',
      guests: 0,
      address: '',
    };
  }

  render() {
    return (
      <View style={RegistrationStyles.rootViewContainer}>
        <HeaderComponent title="Registration" />
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <TextInput
            style={RegistrationStyles.inputStyle}
            textAlign={'left'}
            placeholder="Name"
            placeholderTextColor="grey"
            keyboardType="default"
            autoCapitalize="none"
            value={this.state.name}
            onChangeText={(value) => this.setState({name: value})}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.firstInput.focus();
            }}
          />
          <TextInput
            ref={(input) => {
              this.firstInput = input;
            }}
            style={RegistrationStyles.inputStyle}
            textAlign={'left'}
            placeholder="Age"
            placeholderTextColor="grey"
            keyboardType="number-pad"
            maxLength={2}
            value={this.state.age}
            onChangeText={(value) => this.setState({age: value})}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.secondInput.focus();
            }}
          />
          <TextInput
            ref={(input) => {
              this.secondInput = input;
            }}
            style={RegistrationStyles.inputStyle}
            textAlign={'left'}
            placeholder="Locality"
            placeholderTextColor="grey"
            keyboardType="default"
            value={this.state.locality}
            onChangeText={(value) => this.setState({locality: value})}
          />
          <View
            style={[
              RegistrationStyles.inputStyle,
              {
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
              },
            ]}>
            <Text>No of Guests</Text>
            <View style={{flexDirection: 1}}>
              <View style={{
                  backgroundColor: '#7B8788', 
                  width: 20, 
                  height: 20,
                  borderRadius: 10
                }}>
                <Text>+</Text>
              </View>

              <Text>1</Text>
              <Text>-</Text>
            </View>
          </View>
          <TextInput
            style={RegistrationStyles.inputStyle}
            textAlign={'left'}
            placeholder="Address"
            placeholderTextColor="grey"
            multiline
            numberOfLines={4}
            keyboardType="default"
            value={this.state.address}
            onChangeText={(value) => this.setState({address: value})}
          />
        </View>
      </View>
    );
  }
}

export default Registration;
