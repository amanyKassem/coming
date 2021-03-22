import axios from "axios";
import CONST from "../consts";

export const updateLocation = (lang , latitude , longitude, token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'update-location',
            method      : 'POST',
            params      : { lang },
            data        : {latitude , longitude },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            // dispatch({type: 'getDelegateOrders', payload: response.data});
        });
    }
};
