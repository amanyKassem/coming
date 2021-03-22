import axios from "axios";
import CONST from "../consts";


export const getIntro = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'intros',
            method      : 'GET',
            params      : { lang },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            dispatch({type: 'getIntro', payload: response.data});
        });
    }
};
