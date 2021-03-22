import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const getSpecialOrders = (lang , status , token , type) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'my-special-orders',
            method      : 'POST',
            params      : { lang },
            data        : {status , type},
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getSpecialOrders', payload: response.data});
        });
    }
};

export const getOrders = (lang , status , token , type) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'my-orders',
            method      : 'POST',
            params      : { lang },
            data        : {status , type},
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getOrders', payload: response.data});
        });
    }
};

export const getOrderDetails = (lang , id , token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'order-details',
            method      : 'POST',
            params      : { lang },
            data        : {id},
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getOrderDetails', payload: response.data});
        });
    }
};

export const getSpecialOrderDetails = (lang , id , token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'special-order-details',
            method      : 'POST',
            params      : { lang },
            data        : {id},
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getSpecialOrderDetails', payload: response.data});
        });
    }
};


export const getDelegateOrders = (lang , latitude , longitude , status , token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'delegates/orders',
            method      : 'POST',
            params      : { lang },
            data        : {latitude , longitude , status},
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getDelegateOrders', payload: response.data});
        });
    }
};

export const orderCancel = (lang , id , token , navigation , path) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'cancel-order',
            method      : 'POST',
            params      : { lang },
            data        : {id },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {

            if (response.data.success) {
                navigation.navigate(path);
            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'flatRegular',
                    textAlign   : 'center'
                }
            });
        });

    }
};

export const orderAccept = (lang , id , token , navigation ) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'accept-special-price',
            method      : 'POST',
            params      : { lang },
            data        : {id },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {

            if (response.data.success) {
                navigation.navigate('specialOrders');
            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'flatRegular',
                    textAlign   : 'center'
                }
            });
        });

    }
};

export const updateOrder = (lang , id , token , navigation , status) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'delegates/update-orders',
            method      : 'POST',
            params      : { lang },
            data        : {id },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {

            if (response.data.success && status === 'READY') {
                navigation.navigate('orderDetails' , {id});
            } else if (response.data.success && status === 'DELEGATEARRIVED') {
                navigation.navigate('orderDeliveredSuccessfully');
            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'flatRegular',
                    textAlign   : 'center'
                }
            });
        });

    }
};