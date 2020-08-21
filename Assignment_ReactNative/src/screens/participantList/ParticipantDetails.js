import React from 'react';
import {View, Text} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {ParticipantStyles} from './ParticipantStyle';

class ParticipantDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participantData: this.props.route.params.item.name,
    };
  }

  componentDidMount() {}

  displaySeparator = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#EAF0F1',
          marginVertical: 15,
        }}
      />
    );
  };

  render() {
    return (
      <View style={ParticipantStyles.rootViewContainer}>
        <HeaderComponent title="Participant Details" />
        <View
          style={ParticipantStyles.participantView}>
          <View style={ParticipantStyles.participantView2}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {this.props.route.params.item.name}
              </Text>
              <Text style={{fontSize: 18}}>
                <Text style={{fontWeight: 'bold'}}>Age: </Text>
                {this.props.route.params.item.age}
              </Text>
            </View>
            {this.displaySeparator()}
            <Text style={{fontSize: 20}}>
              <Text style={{fontWeight: 'bold'}}>DOB: </Text>
              {this.props.route.params.item.dob}
            </Text>
            {this.displaySeparator()}
            <Text style={{fontSize: 20}}>
              <Text style={{fontWeight: 'bold'}}>Profession: </Text>
              {this.props.route.params.item.profession}
            </Text>
            {this.displaySeparator()}
            <Text style={{fontSize: 20}}>
              <Text style={{fontWeight: 'bold'}}>Locality: </Text>
              {this.props.route.params.item.locality}
            </Text>
            {this.displaySeparator()}
            <Text style={{fontSize: 20}}>
              <Text style={{fontWeight: 'bold'}}>Guests: </Text>
              {this.props.route.params.item.noOfGuests}
            </Text>
            {this.displaySeparator()}
            <Text style={{fontSize: 20}}>
              <Text style={{fontWeight: 'bold'}}>Address: </Text>
              {this.props.route.params.item.address}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ParticipantDetails;
