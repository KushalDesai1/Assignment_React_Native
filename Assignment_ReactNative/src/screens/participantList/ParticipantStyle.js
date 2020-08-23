import {AppColors} from '../../utils/AppColors';
const ParticipantStyles = {
  rootViewContainer: {
    flex: 1,
    backgroundColor: AppColors.screenBGColor,
  },
  participantView: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 3,
  },
  participantView2: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  participantInfoText1: {
    fontSize: 16,
  },
  participantInfoText2: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  noDataView: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
};

export {ParticipantStyles};
