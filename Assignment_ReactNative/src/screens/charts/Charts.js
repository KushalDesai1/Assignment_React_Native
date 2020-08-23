import React from 'react';
import {View, Modal, Text, ScrollView} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {ChartStyles} from './ChartStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';
import APIStrings from '../../api/APIStrings';
import AppStrings from '../../utils/AppStrings';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {DrawerActions} from '@react-navigation/native';

const fill = 'rgb(240, 18, 18)';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participantList: [],
      isLoading: false,
      ageRangeData: [],
      ageRange1: 0,
      ageRange2: 0,
      ageRange3: 0,
      professionCount: [],
      employedCount: 0,
      studentCount: 0,
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

  displaySeparator = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#99AAAB',
          marginVertical: 15,
        }}
      />
    );
  };

  ageRangeReports = () => {
    let arrayHolder = this.state.participantList;

    const barData1 = arrayHolder.filter(
      (value) => value.age >= 13 && value.age <= 18,
    ).length;
    const barData2 = arrayHolder.filter(
      (value) => value.age > 18 && value.age <= 25,
    ).length;
    const barData3 = arrayHolder.filter((value) => value.age > 25).length;

    const barData = [barData1, barData2, barData3];

    this.setState({
      ageRangeData: barData,
      ageRange1: barData1,
      ageRange2: barData2,
      ageRange3: barData3,
    });
  };

  calculateGuestCount = () => {
    let arrayHolder = this.state.participantList;

    const barData1 = arrayHolder.filter(
      (value) => value.noOfGuests,
    );
  }

  professionCountReport = () => {
    let arrayHolder = this.state.participantList;

    const barData1 = arrayHolder.filter(
      (value) => value.profession === 'Employed',
    ).length;
    const barData2 = arrayHolder.filter(
      (value) => value.profession === 'Student',
    ).length;

    const barData = [barData1, barData2];

    this.setState({
      professionCount: barData,
      employedCount: barData1,
      studentCount: barData2,
    });
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
          this.ageRangeReports();
          this.professionCountReport();
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      alert(AppStrings.apiError);
    }
  };

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  generateAgeRangeReport = () => {
    return (
      <View style={ChartStyles.chartView}>
        <Text style={ChartStyles.chartHeaderText}>
          Number of people in a given age range
        </Text>
        {this.state.participantList.length > 0 ? (
          <View style={{flexDirection: 'row'}}>
            <YAxis
              data={this.state.ageRangeData}
              contentInset={{top: 30, bottom: 30}}
              svg={{
                fill: 'grey',
                fontSize: 14,
              }}
              numberOfTicks={6}
              formatLabel={(value) => `${value}`}
            />
            <View>
              <BarChart
                style={{height: 300, width: 300}}
                data={this.state.ageRangeData}
                svg={{fill}}
                contentInset={{top: 30, bottom: 30}}>
                <Grid />
              </BarChart>
              <XAxis
                data={this.state.participantList}
                svg={{
                  fill: 'grey',
                  fontSize: 16,
                }}
                formatLabel={(value) => `${value}`}
              />
            </View>
          </View>
        ) : (
          <Text style={ChartStyles.chartNotFound}>
            Chart could not be generated due to request limit exceeded.
          </Text>
        )}
        <View style={{marginTop: 10}}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Age (13-18): </Text>
            {this.state.ageRange1}
          </Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Age (18-25): </Text>
            {this.state.ageRange2}
          </Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Age (above 25): </Text>
            {this.state.ageRange3}
          </Text>
        </View>
      </View>
    );
  };

  generateLocalityReport = () => {
    return (
      <View style={ChartStyles.chartView}>
        <Text style={ChartStyles.chartHeaderText}>
          Number of people by localities
        </Text>
      </View>
    );
  };

  generateGroupSizeReport = () => {
    return (
      <View style={ChartStyles.chartView}>
        <Text style={ChartStyles.chartHeaderText}>
          Average group size of people attending the event(using guest count)
        </Text>
      </View>
    );
  };

  generateProfessionReport = () => {
    return (
      <View style={ChartStyles.chartView}>
        <Text style={ChartStyles.chartHeaderText}>
          Professionals & students count
        </Text>
        {this.state.participantList.length > 0 ? (
        <View style={{flexDirection: 'row'}}>
          <YAxis
            data={this.state.professionCount}
            contentInset={{top: 30, bottom: 30}}
            svg={{
              fill: 'grey',
              fontSize: 14,
            }}
            numberOfTicks={6}
            formatLabel={(value) => `${value}`}
          />
          <View>
            <BarChart
              style={{height: 300, width: 300}}
              data={this.state.professionCount}
              svg={{fill}}
              contentInset={{top: 20, bottom: 30}}>
              <Grid />
            </BarChart>
            <XAxis
              data={this.state.participantList}
              svg={{
                fill: 'grey',
                fontSize: 16,
              }}
              numberOfTicks={2}
              formatLabel={(value) => `${value}`}
            />
          </View>
        </View>
        ) : (
          <Text style={ChartStyles.chartNotFound}>
            Chart could not be generated due to request limit exceeded.
          </Text>
        )}
        <View style={{marginTop: 10}}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Employed: </Text>
            {this.state.employedCount}
          </Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Student: </Text>
            {this.state.studentCount}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={ChartStyles.rootViewContainer}>
        <HeaderComponent
          title="Reports"
          menu={true}
          handleDrawer={() => this.toggleDrawer()}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isLoading}
          onRequestClose={() => {}}>
          <LoaderComponent loading={this.state.isLoading} />
        </Modal>
        <ScrollView>
          {this.generateAgeRangeReport()}
          {this.displaySeparator()}
          {this.generateLocalityReport()}
          {this.displaySeparator()}
          {this.generateGroupSizeReport()}
          {this.displaySeparator()}
          {this.generateProfessionReport()}
        </ScrollView>
      </View>
    );
  }
}

export default Charts;
