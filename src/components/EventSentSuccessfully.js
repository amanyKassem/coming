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

function EventSentSuccessfully({navigation,route}) {


    return (
        <Container >
            <ImageBackground source={require('../../assets/images/splash_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>
                <Content contentContainerStyle={[styles.bgFullWidth]}>
                    <View style={[styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_25 , styles.flexCenter]}>

                        <Image source={require('../../assets/images/success_icon.png')} style={[styles.icon100 , styles.marginBottom_40]} resizeMode={'contain'} />

                        <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_18 ,styles.SelfCenter , styles.textCenter , styles.marginBottom_5 , {lineHeight:24}]}>{ i18n.t('OrderSentSuccessfully') }</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('home')} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginTop_60]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('home') }</Text>
                        </TouchableOpacity>

                    </View>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default EventSentSuccessfully;


