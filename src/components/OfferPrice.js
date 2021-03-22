import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getSpecialOrderDetails , orderCancel , orderAccept} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";
import {useIsFocused} from "@react-navigation/native";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function OfferPrice({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const specialOrderDetails = useSelector(state => state.orders.specialOrderDetails);
    const [screenLoader , setScreenLoader ] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmittedAccept, setIsSubmittedAccept] = useState(false);
    const id = route.params.id;

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getSpecialOrderDetails(lang , id, token)).then(() => setScreenLoader(false))
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused])

    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function renderCancelOrder(){
        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' }  , styles.Width_90  , styles.marginTop_15, styles.SelfCenter]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={onCancel} style={[styles.mstrdaBtn , styles.Width_90  , styles.marginTop_15, styles.SelfCenter ]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('refuse') }</Text>
            </TouchableOpacity>
        );

    }

    const onCancel = () => {
        setIsSubmitted(true);
        dispatch(orderCancel(lang , id , token , navigation , 'specialOrders')).then(() => {setIsSubmitted(false)});
    }


    function renderAcceptOrder(){
        if (isSubmittedAccept){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' }  , styles.Width_90  , styles.marginTop_65, styles.SelfCenter]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={onAccept} style={[styles.mstrdaBtn , styles.Width_90 , styles.marginTop_65 , styles.SelfCenter , styles.bg_black]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('accept') }</Text>
            </TouchableOpacity>
        );

    }

    const onAccept = () => {
        setIsSubmittedAccept(true);
        dispatch(orderAccept(lang , id , token , navigation)).then(() => {setIsSubmittedAccept(false)});
    }

    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('offerPrice') } />

                {
                    specialOrderDetails ?
                        <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20, {overflow:'hidden'}]}>

                            {
                                specialOrderDetails.provider ?
                                    <View style={[styles.marginTop_10,styles.marginBottom_20]}>
                                        <View style={[styles.borderGray , styles.directionRow , styles.Radius_5 , {flex:1 , padding:15}]}>
                                            <View style={[styles.directionRow , {flex:1}]}>
                                                <Image source={{uri:specialOrderDetails.provider.avatar}} style={[styles.icon70 , styles.Radius_7]} resizeMode={'cover'} />
                                                <View style={[styles.paddingHorizontal_10 , {flex:1}]}>
                                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.alignStart , styles.marginBottom_5 , styles.writingDir]}>{specialOrderDetails.provider.name}</Text>
                                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , styles.alignStart]}>{specialOrderDetails.date}</Text>
                                                </View>
                                            </View>
                                            <View style={[{borderLeftWidth:1 , borderLeftColor:'#ddd' , paddingLeft:15} , styles.heightFull , styles.centerContext]}>
                                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 , styles.marginBottom_5]}>{i18n.t('orderNum') }</Text>
                                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{specialOrderDetails.order_id}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }


                            <View style={[styles.directionRowCenter , {borderBottomWidth:1 , borderColor:'#ddd' , paddingBottom:20}]}>
                                <View style={[{flex:1}]}>
                                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13 , styles.textCenter , styles.marginBottom_5]}>{specialOrderDetails.distance}</Text>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13 , styles.textCenter]}>{ i18n.t('away') }</Text>
                                </View>
                                <View style={[styles.paddingHorizontal_10 , styles.marginHorizontal_5 , {flex:1 , borderRightWidth:1 , borderLeftWidth:1 , borderColor:'#ddd' }]}>
                                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13 , styles.textCenter , styles.marginBottom_5]}>{specialOrderDetails.shipping} {i18n.t('RS') }</Text>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13 , styles.textCenter]}>{ i18n.t('deliveryCost') }</Text>
                                </View>
                                <View style={[{flex:1}]}>
                                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13 , styles.textCenter , styles.marginBottom_5]}>{specialOrderDetails.time}</Text>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13 , styles.textCenter]}>{ i18n.t('deliveryTime') }</Text>
                                </View>
                            </View>


                            {
                                specialOrderDetails.sum == '0' ?

                                    <>
                                        <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow , styles.marginTop_35  , styles.height_45]}>
                                            <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('orderStatus') }</Text>
                                        </View>
                                        <View style={[styles.directionRow , styles.paddingHorizontal_20 , styles.marginVertical_15 ]}>
                                            <Icon type={'Entypo'} name={'back-in-time'} style={[styles.textSize_17 , styles.text_red , {marginRight:5}]} />
                                            <Text style={[styles.textRegular, styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{specialOrderDetails.status_text}</Text>
                                        </View>

                                    </>
                                    :
                                    <>
                                        <View style={[styles.flexCenter , styles.marginTop_60]}>
                                            <Text style={[styles.textBold , styles.text_gray , styles.textSize_20 , styles.marginBottom_5, styles.textCenter]}>{i18n.t('priceOffered') }</Text>
                                            <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_20 , styles.textCenter]}>{specialOrderDetails.sum} {i18n.t('RS') } </Text>
                                        </View>

                                        {renderAcceptOrder()}

                                        {renderCancelOrder()}
                                    </>
                            }





                        </View>
                        :
                        null
                }

            </Content>
        </Container>
    );
}

export default OfferPrice;


