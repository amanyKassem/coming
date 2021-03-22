import axios from "axios";
import CONST from "../consts";


export const getWallet = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'wallet',
            method      : 'GET',
            params      : { lang },
            headers: {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getWallet', payload: response.data});
        });
    }
};
