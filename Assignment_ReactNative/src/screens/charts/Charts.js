import React from 'react';
import {View, Modal, Text} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {ChartStyles} from './ChartStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';
import APIStrings from '../../api/APIStrings';
import AppStrings from '../../utils/AppStrings';
import {BarChart, Grid} from 'react-native-svg-charts';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participantList: [],
      isLoading: false,
      ageRangeData: [],
      pieChartData: [],
    };
  }

  async componentDidMount() {
    const participantData = await AsyncStorage.getItem('ParticipantData');

    if (participantData !== null) {
      this.setState({participantList: participantData}, () => {
        alert(participantData);
      });
    } else {
      this.setState({isLoading: true}, () => this.callParticipantAPI());
    }
  }

  reports = () => {
    let arrayHolder = this.state.participantList;

    const randomColor = () =>
      ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
        0,
        7,
      );

    const barData1 = arrayHolder.filter(
      (value) => value.age >= 13 && value.age <= 18,
    ).length;
    const barData2 = arrayHolder.filter(
      (value) => value.age > 18 && value.age <= 25,
    ).length;
    const barData3 = arrayHolder.filter((value) => value.age > 25).length;

    const barData = [barData1, barData2, barData3];

    this.setState({ageRangeData: barData});
  };

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
        this.setState({participantList: responseJson}, () => {
          this.reports();
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      alert(AppStrings.apiError);
    }
  };

  render() {
    const fill = 'rgb(240, 18, 18)';
    return (
      <View style={ChartStyles.rootViewContainer}>
        <HeaderComponent title="Reports" />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isLoading}
          onRequestClose={() => {}}>
          <LoaderComponent loading={this.state.isLoading} />
        </Modal>
        <Text>Number of people in a given age range</Text>
        <BarChart
          style={{height: 200, width: '50%', margin: 20}}
          data={this.state.ageRangeData}
          yAccessor = {({item}) => item}
          svg={{fill}}
          contentInset={{top: 30, bottom: 30}}>
          <Grid />
        </BarChart>
        <Text>Number of people by localities</Text>
        <Text>
          Average group size of people attending the event(using guest count)
        </Text>
        <Text>Professionals & students count</Text>
      </View>
    );
  }
}

export default Charts;
