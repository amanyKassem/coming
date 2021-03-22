import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";



export const getNotifications = (lang , token) => {
    return (dispatch) => {
        Notifications(lang, token, dispatch)
    }
};



export const deleteNoti = (lang , id , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'delete-notification',
            method      : 'POST',
            data        : {id},
            params      : { lang },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            Notifications(lang , token , dispatch);
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


const Notifications = (lang , token , dispatch ) => {
    axios({
        url         : CONST.url + 'notifications',
        method      : 'GET',
        params      : { lang },
        headers     : {Authorization: 'Bearer ' + token}
    }).then(response => {
        dispatch({type: 'getNotifications', payload: response.data});
    });
};


export const getNoti = (lang , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'allow-notifications',
            method      : 'POST',
            headers     : {Authorization: 'Bearer ' + token},
            params      : { lang },
        }).then(response => {
            dispatch({type: 'isNotify'});
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
