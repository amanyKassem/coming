import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    I18nManager,
    ActivityIndicator,
    Linking
} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getSpecialOrderDetails, orderCancel} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import Communications from 'react-native-communications';
import Modal from "react-native-modal";
import {useIsFocused} from "@react-navigation/native";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.922;
const longitudeDelta = 0.521;

function SpecialOrderDetails({navigation,route}) {

    // const lang = useSelector(state => state.lang.lang);
    // const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const specialOrderDetails = useSelector(state => state.orders.specialOrderDetails);
    const [screenLoader , setScreenLoader ] = useState(false);
    const id = route.params.id;
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const pathName = route.params.pathName ? route.params.pathName : '';

    function renderCancelOrder(){
        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' }  , styles.Width_100 , styles.bg_White]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' , marginBottom:20 }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={onCancel} style={[styles.mstrdaBtn , styles.Width_100 , styles.Radius_0]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('cancelOrder') }</Text>
            </TouchableOpacity>
        );

    }

    const onCancel = () => {
        setIsSubmitted(true);
        dispatch(orderCancel(lang , id , token , navigation , 'specialOrders')).then(() => {setIsSubmitted(false)});
    }

    const googleMap = (lat , lng) =>{
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }

    return (
        <Container style={[styles.bg_gray]}>
            {
                renderLoader()
            }
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('orderDetails') } />

                {
                    specialOrderDetails ?
                        <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100, {overflow:'hidden'}]}>


                            {
                                specialOrderDetails.provider ?
                                    <View style={[styles.marginTop_10,styles.paddingHorizontal_20]}>
                                        <View style={[styles.borderGray,styles.marginBottom_20 , styles.directionRow , styles.Radius_5 , {flex:1 , padding:15}]}>
                                            <View style={[styles.directionRow , {flex:1}]}>
                                                <Image source={{uri:specialOrderDetails.provider.avatar}} style={[styles.icon70 , styles.Radius_7]} resizeMode={'cover'} />
                                                <View style={[styles.paddingHorizontal_10]}>
                                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.alignStart , styles.marginBottom_5]}>{specialOrderDetails.provider.name}</Text>
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



                            <View style={[styles.marginTop_10 , styles.directionRow , styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.height_45]}>
                                <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14 ]}>{i18n.t('orderDetails') }</Text>
                            </View>

                            <View style={[styles.marginTop_5]}>

                                {
                                    specialOrderDetails.special_details?
                                        <Text style={[styles.textRegular , styles.text_midGray , styles.paddingHorizontal_20 , styles.textSize_13 , styles.marginTop_15 , styles.alignStart , styles.writingDir , {lineHeight:24}]}>
                                            {specialOrderDetails.special_details.details}
                                        </Text>
                                        :
                                        null
                                }

                                <View style={[styles.marginTop_20 , styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('payMethod') }</Text>
                                </View>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{specialOrderDetails.payment_text}</Text>

                                <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('orderStatus') }</Text>
                                </View>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{specialOrderDetails.status_text}</Text>

                                <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('purchasePrice') }</Text>
                                </View>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{specialOrderDetails.sum} {i18n.t('RS') }</Text>

                                <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('totalPrice') }</Text>
                                </View>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{specialOrderDetails.total} {i18n.t('RS') }</Text>

                                <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('deliveryPrice') }</Text>
                                </View>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{specialOrderDetails.shipping} {i18n.t('RS') }</Text>



                                <View style={[styles.bg_light_gray ,styles.paddingHorizontal_20 ,  styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('deliveryDetails') }</Text>
                                </View>

                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{i18n.t('receiptLoc') }</Text>

                                {
                                    specialOrderDetails.address ?
                                        <View style={[styles.directionRow,styles.paddingHorizontal_20 , styles.marginBottom_5 , {flexWrap:'wrap'}]}>
                                            <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{specialOrderDetails.address.address_from}</Text>
                                            <TouchableOpacity onPress={() => googleMap(specialOrderDetails.address.latitude_from ,specialOrderDetails.address.longitude_from ) } style={{marginLeft:5}}>
                                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13]}>( { i18n.t('seeLocation') } )</Text>
                                            </TouchableOpacity>

                                        </View>
                                        :
                                        null
                                }

                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{i18n.t('deliveryLoc') }</Text>

                                {
                                    specialOrderDetails.address ?
                                        <View style={[styles.directionRow,styles.paddingHorizontal_20 , styles.marginBottom_25, {flexWrap:'wrap'}]}>
                                            <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{specialOrderDetails.address.address_to}</Text>
                                            <TouchableOpacity onPress={() => googleMap(specialOrderDetails.address.latitude_to ,specialOrderDetails.address.longitude_to ) } style={{marginLeft:5}}>
                                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13]}>( { i18n.t('seeLocation') } )</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        null
                                }

                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginBottom_10 , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{i18n.t('deliveryTime') }</Text>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginBottom_25 , styles.text_midGray , styles.textSize_13 , styles.alignStart]}>{specialOrderDetails.time}</Text>

                            </View>




                        </View>
                        :
                        null
                }

            </Content>

            {
                specialOrderDetails && (specialOrderDetails.status === 'READY' || specialOrderDetails.status === 'WAITING_OFFER' )?
                    renderCancelOrder()
                    :
                    specialOrderDetails &&  specialOrderDetails.status === 'DELIVERED' ?
                        <TouchableOpacity onPress={() => navigation.navigate('addUrRate' , {provider:specialOrderDetails.provider , delegate:specialOrderDetails.delegate})} style={[styles.mstrdaBtn , styles.Width_100 , styles.Radius_0]}>
                            <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('addUrRate') }</Text>
                        </TouchableOpacity>
                        :
                        null
            }


        </Container>
    );
}

export default SpecialOrderDetails;


