import { combineReducers } from 'redux';

import auth from '../features/auth/authSlice';
import signIn from '../features/auth/signInReducer';
import conference from '../features/conference/conferenceSlice';
import chat from '../features/chat/chatSlice';
import createConference from '../features/conference/createConferenceSlice';
import media from '../features/media/mediaSlice';
import signalr from './conference-signal/reducer';

const rootReducer = combineReducers({
   auth,
   signIn,
   conference,
   createConference,
   chat,
   signalr,
   media,
});

export default rootReducer;
