import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {ParticipantStyles} from './ParticipantStyle'
import APIStrings from '../../api/APIStrings';
import AppStrings from '../../utils/AppStrings';

class ParticipantList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            participantList: []
        }
    }

    componentDidMount(){
        this.callParticipantAPI()
    }

    callParticipantAPI = async () => {
        try {
            const response = await fetch(APIStrings.getParticipantList,
                {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                });

            let responseJson = await response.json();
            this.setState({ isLoading: false })
            alert(JSON.stringify(responseJson));
            
        } catch (error) {
            this.setState({
                isLoading: false
            });
            alert(AppStrings.apiError+" "+error)
        }
    }

    render() {
        return (
            <View style={ParticipantStyles.rootViewContainer}>
                <HeaderComponent title='Participants'/>
            </View>
        );
    }
};

export default ParticipantList;
