import React from 'react';
import {View, TextInput, Text, ScrollView, Image} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {RegistrationStyles} from './RegistrationStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import {AppColors} from '../../utils/AppColors';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      dob: '01-01-1990',
      profession: 'Employed',
      locality: '',
      guestsCount: 0,
      address: '',
    };
  }

  increaseGuestCount = () => {
    this.setState({guestsCount: this.state.guestsCount + 1}, () => {
      if (this.state.guestsCount > 2) {
        this.setState({guestsCount: 2});
      }
    });
  };

  onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({dob: currentDate});
  };

  openDatePicker = () => {
    return (
      <DateTimePicker
        value={new Date()}
        mode={'date'}
        display="default"
        onChange={this.onChangeDate}
      />
    );
  };

  renderDOBView = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 17,
            textAlignVertical: 'center',
            marginTop: 10,
          }}>
          Date of Birth
        </Text>
        <DatePicker
          style={{width: '100%', marginVertical: 10}}
          date={this.state.dob}
          mode="date"
          placeholder="Select Birth Date"
          format="MM-DD-YYYY"
          minDate="01-01-1970"
          maxDate="12-31-2006"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'relative',
            },
            dateInput: {
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 0,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.setState({dob: date});
          }}
        />
      </View>
    );
  };

  renderProfessionView = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '500',
            textAlignVertical: 'center',
            marginTop: 10,
          }}>
          Select Profession
        </Text>
        <View style={RegistrationStyles.inputStyle}>
          <Picker
            mode="dropdown"
            selectedValue={this.state.profession}
            style={{height: 50}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({profession: itemValue})
            }>
            <Picker.Item label="Employed" value="emp" />
            <Picker.Item label="Student" value="stu" />
          </Picker>
        </View>
      </View>
    );
  };

  renderGuestView = () => {
    return (
      <View
        style={[
          RegistrationStyles.inputStyle,
          {
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          },
        ]}>
        <Text
          style={{
            fontSize: 17,
            textAlignVertical: 'center',
          }}>
          No of Guests
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.increaseGuestCount()}>
            <View style={RegistrationStyles.guestBtnStyle}>
              <Text style={{fontSize: 16}}>+</Text>
            </View>
          </TouchableOpacity>

          <Text style={{fontSize: 18, marginHorizontal: 15}}>
            {this.state.guestsCount}
          </Text>

          <TouchableOpacity onPress={() => this.decreaseGuestCount()}>
            <View style={RegistrationStyles.guestBtnStyle}>
              <Text style={{fontSize: 18}}>-</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  submitParticipantData = () => {
      
  }

  renderSubmitButton = () => {
    return (
      <TouchableOpacity onPress={() => this.submitParticipantData()}>
        <View
          style={[
            RegistrationStyles.inputStyle,
            {backgroundColor: AppColors.red, padding: 10},
          ]}>
          <Text
            style={{
              color: AppColors.white,
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            SUBMIT
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  decreaseGuestCount = () => {
    this.setState({guestsCount: this.state.guestsCount - 1}, () => {
      if (this.state.guestsCount < 0) {
        this.setState({guestsCount: 0});
      }
    });
  };

  render() {
    return (
      <View style={RegistrationStyles.rootViewContainer}>
        <HeaderComponent title="Registration" />
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              style={RegistrationStyles.inputStyle}
              textAlign={'left'}
              placeholder="Participant's Name"
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
            {this.renderDOBView()}
            {this.renderProfessionView()}

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

            {this.renderGuestView()}

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

            {this.renderSubmitButton()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Registration;
