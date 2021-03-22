import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const getComments = (lang , token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'provider-comments',
            method      : 'POST',
            params      : { lang },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getComments', payload: response.data});
        });
    }
};
