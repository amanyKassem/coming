import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";
import {AsyncStorage} from "react-native";


export const profile = (lang , token) => {
    return async (dispatch) => {
        await axios({
            method      : 'GET',
            url         : CONST.url + 'profile',
            params      : { lang },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            const data = response.data;
            dispatch({type: 'profile_data', data})
        })
    }
};

export const updateProfile = (lang , name , phone ,email , avatar , token ) => {
    return async (dispatch) => {
       await axios({
            url: CONST.url + 'edit-profile',
            method      : 'POST',
            params      : { lang },
            headers     : {Authorization: 'Bearer ' + token},
            data        : { name , phone ,email , avatar }
        }).then(response => {

            dispatch({type: 'update_profile', data:response.data.data});

            // if (response.data.success) {
            //     navigation.navigate('profile');
            // }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'flatRegular',
                    textAlign       : 'center'
                }
            });

        })
    }
}

export const changePass = (lang , old_password , current_password , token) => {
    return async (dispatch) => {
       await axios({
            url         : CONST.url + 'edit-password',
            method      : 'POST',
            params      : { lang },
            headers     : {Authorization: 'Bearer ' + token},
            data        : {old_password , current_password }
        }).then(response => {
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

export const logout = (lang , token) => {
    return (dispatch) => {
        AsyncStorage.multiRemove(['token', 'auth', 'profile']);

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'logout',
                method      : 'POST',
                headers     : {Authorization: 'Bearer ' + token},
                data        : { lang ,device_id }
            }).then(response => { });
        });

        dispatch({type: 'logout'})
    }
};

