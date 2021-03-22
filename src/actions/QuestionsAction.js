import axios from "axios";
import CONST from "../consts";


export const getQuestions = (lang) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'questions',
            method      : 'GET',
            params      : { lang },
        }).then(response => {
            dispatch({type: 'getQuestions', payload: response.data});
        });
    }
};
