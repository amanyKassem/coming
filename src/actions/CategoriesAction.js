import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const getCategories = (lang) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'categories',
            method      : 'GET',
            params      : { lang },
        }).then(response => {
            dispatch({type: 'getCategories', payload: response.data});
        });
    }
};

export const getProviders = (lang , category_id , rate , latitude , longitude , name) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'providers',
            method      : 'POST',
            params      : { lang},
            data        : { category_id , rate , latitude , longitude , name}
        }).then(response => {
            dispatch({type: 'getProviders', payload: response.data});
        });
    }
};



export const getProvidersEvents = (lang  , rate , latitude , longitude , name) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'provider-events',
            method      : 'POST',
            params      : { lang},
            data        : { rate , latitude , longitude , name}
        }).then(response => {
            dispatch({type: 'getProvidersEvents', payload: response.data});
        });
    }
};


export const getProviderDetails = (lang , id) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'provider-details',
            method      : 'POST',
            params      : { lang },
            data        : { id }
        }).then(response => {
            dispatch({type: 'getProviderDetails', payload: response.data});
        });
    }
};

export const getEvents = (lang , id , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'events',
            method      : 'POST',
            params      : { lang },
            data        : { id },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getEvents', payload: response.data});
        });
    }
};
export const getEvent = (lang , id , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'event-details',
            method      : 'POST',
            params      : { lang },
            data        : { id },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getEvent', payload: response.data});
        });
    }
};

export const sendSpecialOrder = ( lang, details , provider_id, latitude , longitude , address , payment_type , shipping_price , time, token , navigation) => {
    return async (dispatch,) => {


        await axios({
            method      : 'POST',
            url         : CONST.url + 'send-special-order',
            params      : {lang},
            data        : {details , provider_id, latitude , longitude , address , payment_type , shipping_price , time},
            headers     : {Authorization: 'Bearer ' + token}

        }).then(response => {

            if (response.data.success){
                navigation.navigate('orderSentSuccessfully');
            }

            Toast.show({
                text: response.data.message,
                type: response.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'flatRegular',
                    textAlign: 'center'
                }
            });
        })

    }
}


export const sendEventSubscripe = ( lang, event_id , payment_type , token , navigation) => {
    return async (dispatch,) => {


        await axios({
            method      : 'POST',
            url         : CONST.url + 'subscripe-event',
            params      : {lang},
            data        : {event_id , payment_type},
            headers     : {Authorization: 'Bearer ' + token}

        }).then(response => {

            if (response.data.success){
                navigation.navigate('eventSentSuccessfully');
            }

            Toast.show({
                text: response.data.message,
                type: response.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'flatRegular',
                    textAlign: 'center'
                }
            });
        })

    }
}
