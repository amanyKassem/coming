import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base'
import CONST from '../consts';


export const getOffers = (lang) => {
    return async (dispatch) => {
       await axios({
            url         : CONST.url + 'offers',
            method      : 'GET',
            params      : {lang},
        }).then(response => {
            dispatch({type: 'getOffers', payload: response.data});
        });
    }
};
export const getOfferProvider = (lang , id) => {
    return async (dispatch) => {
       await axios({
            url         : CONST.url + 'offers-providers',
            method      : 'POST',
            params      : {lang},
            data        : {id},
        }).then(response => {
            dispatch({type: 'getOfferProvider', payload: response.data});
        });
    }
};