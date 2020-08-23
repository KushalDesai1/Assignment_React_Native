import React from 'react';
import {View, FlatList, Text} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {ParticipantStyles} from './ParticipantStyle';
import APIStrings from '../../api/APIStrings';
import AppStrings from '../../utils/AppStrings';
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {DrawerActions} from '@react-navigation/native';

class ParticipantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      participantList: [],
    };
  }

  componentDidMount() {
    //   Call Api
    this.callParticipantAPI();
  }

//   Pull refresh
  onRefresh() {
    this.setState({isLoading: true}, () => {
      this.callParticipantAPI();
    });
  }

  saveData = async () => {
    await AsyncStorage.setItem('ParticipantData', JSON.stringify(responseJson))
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
        this.setState({participantList: responseJson}, () => {
            this.saveData();
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      alert(AppStrings.apiError);
    }
  };

  goToParticipantDetail = (item) => {
    this.props.navigation.navigate('ParticipantDetails', {
      item,
    });
  };

  renderParticipantData = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.goToParticipantDetail(item)}>
        <View
          style={ParticipantStyles.participantView}>
          <View style={ParticipantStyles.participantView2}>
            <Text style={ParticipantStyles.participantInfoText1}>
              <Text style={ParticipantStyles.participantInfoText2}>Name: </Text>
              {item.name}
            </Text>
            <Text style={ParticipantStyles.participantInfoText1}>
              <Text style={ParticipantStyles.participantInfoText2}>Locality: </Text>
              {item.locality}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  render() {
    return (
      <View style={ParticipantStyles.rootViewContainer}>
        <HeaderComponent title="Participants" menu={true}
          handleDrawer={() => this.toggleDrawer()}/>
        {this.state.isLoading ? (
          <LoaderComponent loading={this.state.isLoading} />
        ) : this.state.participantList.length === 0 ? (
          <View style={ParticipantStyles.noDataView}>
            <Text>No data available</Text>
          </View>
        ) : null}

        {this.state.participantList.length > 0 ? (
          <FlatList
            data={this.state.participantList}
            extraData={this.state.participantList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index) => index.toString()}
            renderItem={({item, index}) =>
              this.renderParticipantData(item, index)
            }
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isLoading}
          />
        ) : null}
      </View>
    );
  }
}

export default ParticipantList;
