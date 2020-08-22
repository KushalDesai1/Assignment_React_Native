import { StyleSheet } from 'react-native';
import {AppColors} from '../../utils/AppColors';

const LoaderStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
     },
     activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     }
});

export default LoaderStyles;