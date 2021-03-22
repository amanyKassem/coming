import axios from "axios";
import CONST from "../consts";


export const getAbout = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'about',
            method      : 'GET',
            params      : { lang },
        }).then(response => {
            dispatch({type: 'getAbout', payload: response.data});
        });
    }
};

export const getTerms = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'terms',
            method      : 'GET',
            params      : { lang },
        }).then(response => {
            dispatch({type: 'getTerms', payload: response.data});
        });
    }
};
