import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    I18nManager,
    KeyboardAvoidingView, Platform, ActivityIndicator
} from "react-native";
import {Container, Content, Form, Icon, Input , Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Swiper from 'react-native-swiper';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {sendEventSubscripe} from "../actions";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function EventPayMethod({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const {id} = route.params;
    const [payType, setPayType] = useState('cash');

    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();

    function renderSubmit() {

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_55, styles.marginBottom_10]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }


        return (
            <TouchableOpacity onPress={confirmOrder} style={[styles.mstrdaBtn , styles.SelfCenter , styles.marginTop_55  , styles.marginBottom_10]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>
        );
    }

    const confirmOrder = () => {
        setIsSubmitted(true);
        dispatch(sendEventSubscripe(lang , id , payType , token , navigation)).then(() => {setIsSubmitted(false)});
    };

    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('orderDetails') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20 , styles.paddingVertical_20, {overflow:'hidden'}]}>

                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ,styles.marginBottom_25 , styles.alignStart]}>{ i18n.t('selectPayMethod') }</Text>

                    <View style={[IS_IPHONE_X ? styles.directionRowCenter : styles.rowGroup , styles.Width_100 , {flexWrap: 'wrap'}]}>

                        <TouchableOpacity onPress={() => setPayType('cash')} style={[payType === 'cash' ?styles.bg_light_gray : null, styles.marginBottom_10  , styles.Radius_10 , styles.overHidden , styles.width_90 , styles.height_70 , styles.centerContext]}>
                            <Image source={require('../../assets/images/money_cash.png')} style={[styles.icon50 ]} resizeMode={'contain'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPayType('online')} style={[payType === 'online' ?styles.bg_light_gray : null, styles.marginBottom_10  , styles.Radius_10 , styles.overHidden , styles.width_90 , styles.height_70 , styles.centerContext]}>
                            <Image source={require('../../assets/images/mastercard.png')} style={[styles.icon50 ]} resizeMode={'contain'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPayType('wallet')} style={[payType === 'wallet' ?styles.bg_light_gray : null, styles.marginBottom_10  , styles.Radius_10 , styles.overHidden , styles.width_90 , styles.height_70 , styles.centerContext]}>
                            <Image source={require('../../assets/images/payWallet.png')} style={[styles.icon50 ]} resizeMode={'contain'} />
                        </TouchableOpacity>

                    </View>


                    {renderSubmit()}


                </View>

            </Content>
        </Container>
    );
}

export default EventPayMethod;


