import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const getFavourites = (lang , token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'my-favourite',
            method      : 'POST',
            params      : { lang },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getFavourites', payload: response.data});
        });
    }
};

export const setFavourite = (lang , provider_id , token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'favourite',
            method      : 'POST',
            params      : { lang },
            data        : {provider_id},
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            Toast.show({
                text: response.data.message,
                type: response.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'flatRegular',
                    textAlign: 'center'
                }
            });
        });
    }
};

