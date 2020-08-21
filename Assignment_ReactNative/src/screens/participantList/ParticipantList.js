import React from 'react';
import {View, FlatList, Text} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {ParticipantStyles} from './ParticipantStyle';
import APIStrings from '../../api/APIStrings';
import AppStrings from '../../utils/AppStrings';
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';

class ParticipantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      participantList: [],
    };
  }

  componentDidMount() {
    this.callParticipantAPI();
  }

  onRefresh() {
    this.setState({isLoading: true}, () => {
      this.callParticipantAPI();
    });
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

  goToParticipantDetail = (item) => {
    this.props.navigation.navigate('ParticipantDetails', {
      item,
    });
  };

  renderParticipantData = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.goToParticipantDetail(item)}>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            shadowOffset: {width: 0, height: 5},
            shadowColor: 'grey',
            shadowOpacity: 0.5,
            shadowRadius: 0,
            elevation: 3,
          }}>
          <View style={{marginHorizontal: 20, marginVertical: 10}}>
            <Text style={{fontSize: 16}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Name: </Text>
              {item.name}
            </Text>
            <Text style={{fontSize: 16}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Locality: </Text>
              {item.locality}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={ParticipantStyles.rootViewContainer}>
        <HeaderComponent title="Participants" />
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
