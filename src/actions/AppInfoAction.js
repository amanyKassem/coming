import axios from "axios";
import CONST from "../consts";


export const getAppInfo = (lang) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'app-info',
            method      : 'GET',
            params      : { lang },
        }).then(response => {
            dispatch({type: 'getAppInfo', payload: response.data});
        });
    }
};
