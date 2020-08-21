import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {RegistrationStyles} from './RegistrationStyle'

class Registration extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={RegistrationStyles.rootViewContainer}>
                <HeaderComponent title='Registration'/>
            </View>
        );
    }
};

export default Registration;
