import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    I18nManager,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Swiper from 'react-native-swiper';
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Recharge({navigation,route}) {

    const title = route.params.title;

    const payOnline = () => {
        Toast.show({
            text        	: i18n.t('soon'),
            type			: "success",
            duration    	: 3000,
            textStyle   	: {
                color       	: "white",
                fontFamily  	: 'flatRegular',
                textAlign   	: 'center'
            }
        });
    }


    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ title } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20 , styles.flexCenter, {overflow:'hidden'}]}>


                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_18 ,styles.SelfCenter , styles.marginBottom_40]}>{ title }</Text>

                    {
                        title === i18n.t('recoverBalance') ?
                            <TouchableOpacity onPress={() => navigation.navigate('bankTransfer' , {title})} style={[styles.height_40 , styles.bg_mstarda , styles.Radius_5 , styles.Width_100, styles.centerContext , styles.marginBottom_15]}>
                                <Text style={[styles.textBold , styles.text_White , styles.textSize_15, styles.textCenter ]}>{ i18n.t('bankTransfer') }</Text>
                            </TouchableOpacity>
                            :

                            <>
                                <TouchableOpacity onPress={() => navigation.navigate('banks')} style={[styles.height_40 , styles.bg_mstarda , styles.Radius_5 , styles.Width_100, styles.centerContext , styles.marginBottom_15]}>
                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_15, styles.textCenter ]}>{ i18n.t('bankTransfer') }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={payOnline} style={[styles.height_40 , styles.bg_mstarda , styles.Radius_5 , styles.Width_100, styles.centerContext ]}>
                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_15, styles.textCenter ]}>{ i18n.t('online') }</Text>
                                </TouchableOpacity>
                            </>

                    }


                </View>

            </Content>
        </Container>
    );
}

export default Recharge;


