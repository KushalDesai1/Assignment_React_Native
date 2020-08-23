import React from 'react';
import {View, TextInput, Text, ScrollView, Modal} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {RegistrationStyles} from './RegistrationStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import {AppColors} from '../../utils/AppColors';
import APIStrings from '../../api/APIStrings';
import AppStrings from '../../utils/AppStrings';
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';
import {DrawerActions} from '@react-navigation/native';

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
      isLoading: false,
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
        <View style={[RegistrationStyles.inputStyle, {paddingLeft: 5}]}>
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

  validateName = (text) => {
    let reg = /^[a-zA-Z ]+$/;

    if (reg.test(text) == false) {
      // Invalid name
      return false;
    } else {
      // Correct name
      return true;
    }
  };

  validateEmptyField = (text) => {
    if (text === '') {
      return false;
    } else {
      return true;
    }
  };

  validateData = () => {
    if (!this.validateEmptyField(this.state.name)) {
      alert('Name cannot be empty');
    } else if (!this.validateName(this.state.name)) {
      alert('Please enter a valid name.');
    } else if (!this.validateEmptyField(this.state.age)) {
      alert('Age cannot be empty');
    } else if (parseInt(this.state.age) < 15 && parseInt(this.state.age) > 40) {
      alert('Your age should be above 15 & below 40 years.');
    } else if (!this.validateEmptyField(this.state.locality)) {
      alert('Locality cannot be empty');
    } else if (!this.validateEmptyField(this.state.address)) {
      alert('Address cannot be empty');
    } else {
      this.submitParticipantData();
    }
  };

  clearFormData = () => {
    this.setState({
      name: '',
      age: '',
      dob: '01-01-1990',
      locality: '',
      guestsCount: 0,
      address: '',
    });
  };

  submitParticipantData = async () => {
    this.setState({isLoading: true});
    try {
      const response = await fetch(APIStrings.submitParticipant, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
        }),
      });

      let responseJson = await response.json();
      this.setState({isLoading: false});
      if (responseJson.status === 200) {
        alert(responseJson.message);
        this.clearFormData();
      } else {
        alert(AppStrings.apiError);
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      alert(AppStrings.apiError);
    }
  };

  renderSubmitButton = () => {
    return (
      <TouchableOpacity onPress={() => this.validateData()}>
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

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  render() {
    return (
      <View style={RegistrationStyles.rootViewContainer}>
        <HeaderComponent title="Registration" menu={true}
          handleDrawer={() => this.toggleDrawer()}/>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isLoading}
          onRequestClose={() => {}}>
          <LoaderComponent loading={this.state.isLoading} />
        </Modal>

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
