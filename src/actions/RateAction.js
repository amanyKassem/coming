import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const userRate = (lang , rate , comment , quality , clean , dealing , speed , rated_id , token) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'rateComment',
            method      : 'POST',
            params      : { lang },
            data        : { rate , comment , quality , clean , dealing , speed , rated_id },
            headers     : {Authorization: 'Bearer ' + token}
        }).then(response => {
            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'flatRegular',
                    textAlign   : 'center'
                }
            });
        });

    }
};