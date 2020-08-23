import { StyleSheet } from 'react-native';
import {AppColors} from '../../utils/AppColors';

const HeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%', 
        height: '8%',
        backgroundColor: AppColors.red
    },
    title: {
        color: AppColors.white,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export {HeaderStyle}