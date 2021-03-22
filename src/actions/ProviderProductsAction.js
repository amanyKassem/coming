import axios from "axios";
import CONST from "../consts";

export const getProviderProducts = (lang ,menu_id , page , provider_id) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'products',
            method      : 'POST',
            params      : {lang},
            data        : { menu_id , page , provider_id }
        }).then(response => {
            dispatch({type: 'getProviderProducts', payload: response.data});
        });
    }
};