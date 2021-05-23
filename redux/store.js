import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import Reducer from './reducer';

const store = createStore(Reducer);

export default store;