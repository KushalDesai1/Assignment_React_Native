import React from 'react';
import {View, Text} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {ChartStyles} from './ChartStyle';
import AsyncStorage from '@react-native-community/async-storage';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        participantList: [],
    };
  }

  async componentDidMount() {
    const participantData = await AsyncStorage.getItem("ParticipantData");
    this.setState({ participantList: participantData })
  }

  callParticipantAPI = async () => {
    try {
      const response = await fetch(APIStrings.getParticipantList, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let responseJson = await response.json();
      this.setState({isLoading: false});
      if (responseJson.length > 0) {
        this.setState({participantList: responseJson});
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      alert(AppStrings.apiError);
    }
  };

  render() {
    return (
      <View style={ChartStyles.rootViewContainer}>
        <HeaderComponent title="Charts" />
        <Text>Charts Screen</Text>
      </View>
    );
  }
}

export default Charts;
