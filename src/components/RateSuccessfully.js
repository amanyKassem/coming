import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    I18nManager,
    ImageBackground,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Swiper from 'react-native-swiper';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function RateSuccessfully({navigation,route}) {

    // const lang = useSelector(state => state.lang.lang);
    // const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);


    return (
        <Container >
            <ImageBackground source={require('../../assets/images/splash_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>
                <Content contentContainerStyle={[styles.bgFullWidth]}>
                    <View style={[styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_25 , styles.flexCenter]}>

                        <Image source={require('../../assets/images/circle_check.png')} style={[styles.icon70 , styles.marginBottom_40]} resizeMode={'contain'} />
                        <Text style={[styles.textBold , styles.text_black , styles.textSize_18 ,styles.SelfCenter , styles.textCenter , styles.marginBottom_25 , {lineHeight:24}]}>{ i18n.t('ratedSuccessfully') }</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('home')} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginTop_60]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('home') }</Text>
                        </TouchableOpacity>

                    </View>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default RateSuccessfully;


