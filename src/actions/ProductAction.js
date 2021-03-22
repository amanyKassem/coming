import axios from "axios";
import CONST from "../consts";

export const getProduct = (lang ,id) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'product',
            method      : 'POST',
            params      : {lang},
            data        : { id }
        }).then(response => {
            dispatch({type: 'getProduct', payload: response.data});
        });
    }
};