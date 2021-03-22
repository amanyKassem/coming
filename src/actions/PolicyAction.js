import axios from "axios";
import CONST from "../consts";


export const getPolicy = (lang) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'policy',
            method      : 'GET',
            params      : { lang },
        }).then(response => {
            dispatch({type: 'getPolicy', payload: response.data});
        });
    }
};
