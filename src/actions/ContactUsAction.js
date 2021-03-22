import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const contactUs = (lang , name , phone , message) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'contact-us',
            method      : 'POST',
            params      : { lang },
            data        : {name , phone , message }
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

export const sendComplaint = (lang , username , email , subject , description , token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'send-complaint',
            method      : 'POST',
            params      : { lang },
            data        : { username , email , subject , description },
            headers     : {Authorization: 'Bearer ' + token}
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