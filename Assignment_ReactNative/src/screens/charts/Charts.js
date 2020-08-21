import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {ChartStyles} from './ChartStyle'

class Charts extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={ChartStyles.rootViewContainer}>
                <HeaderComponent title='Charts'/>
                <Text>Charts Screen</Text>
            </View>
        );
    }
};

export default Charts;
