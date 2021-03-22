import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, I18nManager} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from './Header';
import COLORS from "../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {getWallet} from '../actions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Wallet({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const wallet = useSelector(state => state.wallet.wallet)
    const loader = useSelector(state => state.wallet.loader)
    const user = useSelector(state =>  state.auth.user != null ? state.auth.user.data : null );

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getWallet(lang , token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , loader]);

    function renderLoader(){
        if (loader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }




    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('wallet') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20 , styles.alignCenter, {overflow:'hidden'}]}>

                    <Image source={require("../../assets/images/wallet.png")} style={[styles.icon100 , styles.marginVertical_45]} resizeMode={'contain'}/>

                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_22, styles.textCenter ]}>{ i18n.t('currentBalance') }</Text>

                    {
                        wallet ?
                            <View style={[styles.width_180 , styles.height_100 , styles.bg_light_gray , styles.marginTop_55 , styles.Radius_15 , styles.centerContext]}>
                                <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_24, styles.textCenter ]}>{wallet.amount} { i18n.t('RS') }</Text>
                            </View>
                            :
                            null
                    }



                    <TouchableOpacity onPress={() => navigation.navigate('recharge',{title:i18n.t('recharge')})} style={[styles.height_40 , styles.bg_mstarda , styles.Radius_5 , styles.Width_100, styles.centerContext , styles.marginTop_65]}>
                        <Text style={[styles.textBold , styles.text_White , styles.textSize_15, styles.textCenter ]}>{ i18n.t('recharge') }</Text>
                    </TouchableOpacity>

                    {
                        user && user.user_type === 3 ?
                            <TouchableOpacity onPress={() => navigation.navigate('recharge',{title:i18n.t('recoverBalance')})} style={[styles.height_40 , styles.bg_mstarda , styles.Radius_5 , styles.Width_100, styles.centerContext , styles.marginTop_10]}>
                                <Text style={[styles.textBold , styles.text_White , styles.textSize_15, styles.textCenter ]}>{ i18n.t('recoverBalance') }</Text>
                            </TouchableOpacity>
                            :
                            null
                    }


                </View>

            </Content>
        </Container>
    );
}

export default Wallet;


