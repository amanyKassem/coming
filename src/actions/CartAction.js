import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base'
import CONST from '../consts';


export const getCart = (lang) => {
    return async (dispatch) => {
        await AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'cart',
                method      : 'POST',
                params      : {lang},
                data        : { device_id }
            }).then(response => {
                dispatch({type: 'getCart', payload: response.data});
            });
        })

    }
};



export const getCartCount = (lang , token) => {
    return async (dispatch) => {
        await AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'cart-count',
                method      : 'POST',
                params      : {lang},
                data        : { device_id },
                headers     : {Authorization: 'Bearer ' + token},
            }).then(response => {
                dispatch({type: 'getCartCount', payload: response.data});
            });
        })

    }
};

export const getCartDetails = (lang , id, coupon , token) => {
    return async (dispatch) => {
        await AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'cart-details',
                method      : 'POST',
                params      : {lang},
                data        : { id, coupon, device_id},
                headers: {Authorization: 'Bearer ' + token}
            }).then(response => {
                dispatch({type: 'getCartDetails', payload: response.data});
            });
        })

    }
};

export const addToCart = (lang , product_id , quantity ,price ,extras , token , navigation , orderTime) => {
    return async (dispatch) => {
        await AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'add-cart',
                method      : 'POST',
                params      : {lang},
                data        : { device_id , product_id , quantity ,price ,extras},
                headers     : {Authorization: 'Bearer ' + token}
            }).then(response => {
                if (response.data.success && orderTime === 'now'){
                    navigation.navigate('basket');
                }

                Toast.show({
                    text        	: response.data.message,
                    type			: response.data.success ? "success" : "danger",
                    duration    	: 3000,
                    textStyle   	: {
                        color       	: "white",
                        fontFamily  	: 'flatRegular',
                        textAlign   	: 'center'
                    }
                });

            });
        })

    }
};

export const ChangeProductQuantity = (type, cart_id, id, lang, token) => {
    return async (dispatch) => {
        await axios({
            method      : 'POST',
            url         : CONST.url + 'change-quantity',
            params      : {lang},
            data        : { type, cart_id, id},
            headers     : {Authorization: 'Bearer ' + token}

        }).then(response => {
            Toast.show({
                text        	: response.data.message,
                type			: response.data.success ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'flatRegular',
                    textAlign   	: 'center'
                }
            });

        });
    }
}


export const ValidationCoupon = (coupon, lang, token) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: CONST.url + 'validate/coupon',
            params      : {lang},
            data        : {coupon},
            headers     : {Authorization: 'Bearer ' + token}

        }).then((response) => {
            if (response.data.success) {
                dispatch({type: 'ValidationCoupon', payload: response.data});
            }

            Toast.show({
                text        	: response.data.message,
                type			: response.data.success ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'flatRegular',
                    textAlign   	: 'center'
                }
            });

        })
    }
}


export const deleteProduct = (cart_id, id, lang, token , navigation) => {
    return async (dispatch,) => {


        await axios({
            method      : 'POST',
            url         : CONST.url + 'delete-cart-item',
            params      : {lang},
            data        : {cart_id, id},
            headers     : {Authorization: 'Bearer ' + token}

        }).then(response => {

            if (response.data.success && (response.data.data.products).length == 0 ){
                navigation.navigate('basket');
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


export const sendOrder = ( lang, provider_id, latitude , longitude , address , payment_type, shipping_price , coupon , time, token , navigation) => {
    return async (dispatch,) => {


        await axios({
            method      : 'POST',
            url         : CONST.url + 'send-order',
            params      : {lang},
            data        : {provider_id, latitude , longitude , address , payment_type , shipping_price , coupon, time},
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

export const getDeliveryPrice = ( lang, id, latitude , longitude , token ) => {
    return async (dispatch,) => {


        await axios({
            method      : 'POST',
            url         : CONST.url + 'delivery-price',
            params      : {lang},
            data        : {id, latitude , longitude},
            headers     : {Authorization: 'Bearer ' + token}

        }).then(response => {

            if (response.data.success) {
                dispatch({type: 'getDeliveryPrice', payload: response.data});
            }

        })

    }
}