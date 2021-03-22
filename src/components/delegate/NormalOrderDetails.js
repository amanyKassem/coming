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
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getOrderDetails, orderCancel , updateOrder} from '../../actions';
import Header from '../../common/Header';
import COLORS from "../../consts/colors";
import Communications from 'react-native-communications';
import {useIsFocused} from "@react-navigation/native";
import Modal from "react-native-modal";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function NormalOrderDetails({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const orderDetails = useSelector(state => state.orders.orderDetails);
    const [screenLoader , setScreenLoader ] = useState(false);
    const [isUpdateSubmitted, setIsUpdateSubmitted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const id = route.params.id;

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [extras , setExtras ] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function toggleModal (proExtras) {
        setShowModal(!showModal);
        setExtras(proExtras)
    };

    function fetchData(){
        setScreenLoader(true)
        dispatch(getOrderDetails(lang , id, token)).then(() => setScreenLoader(false))
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused])


    const [showClientDetails, setShowClientDetails] = useState(false);

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
                <View style={[{ justifyContent: 'center', alignItems: 'center' }  , styles.marginTop_10 , styles.marginBottom_35 , styles.flexCenter , styles.Width_90]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' , marginBottom:20 }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={onCancel} style={[styles.mstrdaBtn , styles.bg_gray , styles.marginTop_10  , styles.marginBottom_35 , styles.flexCenter , styles.Width_90]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('refuseOrder') }</Text>
            </TouchableOpacity>
        );

    }

    const onCancel = () => {
        setIsSubmitted(true);
        dispatch(orderCancel(lang , id , token , navigation , 'home')).then(() => {setIsSubmitted(false)});
    }



    function renderUpdateOrder(){
        if (isUpdateSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' }  ,  styles.marginTop_35 , styles.flexCenter , styles.Width_90]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' , marginBottom:20 }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={onUpdate} style={[styles.mstrdaBtn  , styles.marginTop_35 , styles.flexCenter , styles.Width_90]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('iWillDeliver') }</Text>
            </TouchableOpacity>
        );

    }

    const onUpdate = () => {
        setIsUpdateSubmitted(true);
        dispatch(updateOrder(lang , id , token , navigation , 'READY')).then(() => {setIsUpdateSubmitted(false)});
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
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('orderDetails') } />

                {
                    orderDetails ?
                        <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100, {overflow:'hidden'}]}>


                            <View style={[styles.bg_lightMstarda , styles.marginHorizontal_20 ,styles.paddingHorizontal_15 , styles.marginVertical_10  , styles.height_45 , styles.directionRowSpace]}>
                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 ]}>{i18n.t('deliveryPrice') }</Text>
                                <View style={[styles.paddingHorizontal_25 ,{borderLeftWidth:1 , borderRightWidth:1 , borderColor:COLORS.mstarda}]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{orderDetails.shipping} {i18n.t('RS') }</Text>
                                </View>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ]}>{orderDetails.distance}</Text>
                            </View>

                            <View style={[styles.marginTop_10,styles.paddingHorizontal_20]}>

                                {
                                    orderDetails.provider?
                                        <View style={[styles.borderGray,styles.marginBottom_20 , styles.directionRow , styles.Radius_5 , styles.paddingVertical_10 , {flex:1}]}>
                                            <View style={[styles.directionRow , styles.paddingHorizontal_10 , {flex:1}]}>
                                                <Image source={{uri:orderDetails.provider.avatar}} style={[styles.icon70 , styles.Radius_7]} resizeMode={'cover'} />
                                                <View style={[styles.paddingHorizontal_10 , {flex:1}]}>
                                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12 , styles.alignStart , styles.marginBottom_5 , {lineHeight:20}]}>{orderDetails.provider.name}</Text>
                                                    <View style={[styles.directionRow , styles.marginBottom_5 , {flex:1}]}>
                                                        <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_12 , styles.text_mstarda , {marginRight:5}]} />
                                                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_12 , styles.writingDir, {lineHeight:20}]}>{orderDetails.provider.address}</Text>
                                                    </View>
                                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_12 , styles.alignStart]}>{orderDetails.provider.phone}</Text>
                                                </View>
                                            </View>
                                            <View style={[{borderLeftWidth:1 , borderLeftColor:'#ddd'} , styles.heightFull , styles.paddingHorizontal_10 , styles.centerContext]}>
                                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_12 , styles.marginBottom_5]}>{i18n.t('orderNum') }</Text>
                                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12]}>{id}</Text>
                                            </View>
                                        </View>
                                        :
                                        null
                                }

                            </View>

                            <View style={[styles.marginTop_10 , styles.bg_light_gray , styles.directionRowSpace ,styles.paddingHorizontal_20 , styles.height_45]}>
                                <Text style={[styles.textBold , styles.text_gray , styles.textSize_14 ]}>{i18n.t('orderDetails') }</Text>
                            </View>

                            <View style={[styles.marginTop_5]}>

                                {
                                    orderDetails.products ?
                                        orderDetails.products.map((pro, i) => {
                                            return (
                                                <View key={i} style={[styles.borderGray ,styles.paddingHorizontal_20 , styles.paddingVertical_10 , styles.marginBottom_5 , styles.directionRowSpace]}>
                                                    <View style={[styles.directionRow]}>
                                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12 , styles.alignStart , {marginRight:5}]}>{pro.quantity} {pro.name}</Text>

                                                        {
                                                            pro.extras && ( pro.extras).length > 0?
                                                                <TouchableOpacity onPress={() => toggleModal(pro.extras)}>
                                                                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_12 , styles.alignStart]}>( {i18n.t('details') } )</Text>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                                        }


                                                    </View>
                                                    <View style={{borderLeftWidth:1 , borderColor:'#ddd' , paddingLeft:10 , marginLeft:10 }}>
                                                        <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13]}>{pro.price} {i18n.t('RS') }</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                        :
                                        null
                                }

                                <View style={[styles.marginTop_20 , styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_gray , styles.textSize_14]}>{i18n.t('payMethod') }</Text>
                                </View>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{orderDetails.payment_text}</Text>
                                <View style={[styles.bg_light_gray ,styles.paddingHorizontal_20 ,  styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_gray , styles.textSize_14]}>{i18n.t('total') }</Text>
                                </View>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{orderDetails.total} {i18n.t('RS') }</Text>
                                <View style={[styles.bg_light_gray ,styles.paddingHorizontal_20 ,  styles.directionRow  , styles.height_45]}>
                                    <Text style={[styles.textBold , styles.text_gray , styles.textSize_14]}>{i18n.t('deliveryDetails') }</Text>
                                </View>
                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{i18n.t('orderLocation') }</Text>

                                {
                                    orderDetails.address ?
                                        <View style={[styles.directionRow,styles.paddingHorizontal_20 , styles.marginBottom_25 , {flexWrap:'wrap'}]}>
                                            <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{orderDetails.address.address_from}</Text>
                                            <TouchableOpacity onPress={() => googleMap(orderDetails.address.latitude_from ,orderDetails.address.longitude_from ) } style={{marginLeft:5}}>
                                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13]}>( { i18n.t('seeLocation') } )</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        null
                                }



                                <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginBottom_15 , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{i18n.t('desiredPlace') }</Text>

                                {
                                    orderDetails.address ?
                                        <View style={[styles.directionRow,styles.paddingHorizontal_20 , styles.marginBottom_25 , {flexWrap:'wrap'}]}>
                                            <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{orderDetails.address.address_to}</Text>
                                            <TouchableOpacity onPress={() => googleMap(orderDetails.address.latitude_to ,orderDetails.address.longitude_to ) } style={{marginLeft:5}}>
                                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13]}>( { i18n.t('seeLocation') } )</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        null
                                }


                            </View>


                            <TouchableOpacity onPress={() => setShowClientDetails(!showClientDetails)} style={[styles.marginTop_20 , styles.bg_light_gray , styles.directionRowSpace ,styles.paddingHorizontal_20 , styles.height_45]}>
                                <Text style={[styles.textBold , showClientDetails ? styles.text_mstarda : styles.text_gray , styles.textSize_14 ]}>{i18n.t('clientInfo') }</Text>
                                <Icon type={'AntDesign'} name={showClientDetails ?  'caretup' : 'caretdown'} style={[styles.textSize_12 , showClientDetails ? styles.text_mstarda : styles.text_gray]} />
                            </TouchableOpacity>

                            {
                                showClientDetails && orderDetails.user?
                                    <View style={[styles.marginTop_5 ,styles.marginBottom_25]}>

                                        <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{i18n.t('clientName') }</Text>

                                        <View style={[styles.marginTop_5 ,styles.flexCenter , styles.bg_light_gray , styles.Width_90 ,styles.paddingHorizontal_20 , styles.directionRowSpace  , styles.height_45]}>
                                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12]}>{orderDetails.user.name}</Text>
                                            <TouchableOpacity onPress={() => Communications.phonecall(orderDetails.user.phone, true)}>
                                                <Image source={require("../../../assets/images/phone-ringing.png")} style={[styles.icon17]} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    :
                                    null
                            }

                            {renderUpdateOrder()}

                            { renderCancelOrder()}


                        </View>
                        :
                        null
                }

            </Content>
            <Modal
                onBackdropPress                 ={() => setShowModal(false)}
                onBackButtonPress               = {() => setShowModal(false)}
                isVisible                       = {showModal}
                style                           = {styles.bgModel}
                avoidKeyboard                    = {true}
            >

                <View style={[styles.bg_White, styles.overHidden, styles.Width_100, {borderTopStartRadius:5 , borderTopEndRadius:5}]}>

                    <View style={[styles.bg_gray , styles.Width_100 , styles.paddingVertical_15 , styles.paddingHorizontal_20]}>
                        <Text style={[styles.textBold , styles.text_White , styles.textSize_15 , styles.alignStart]}>{ i18n.t('details') }</Text>
                    </View>

                    <View style={[styles.paddingHorizontal_20 , styles.paddingVertical_20]}>
                        {
                            extras  && extras.map((extra, i) => {
                                return (
                                    <View style={[styles.directionRowSpace]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 , styles.marginBottom_10 , styles.alignStart]}>- {extra.name}</Text>
                                        <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 , styles.marginBottom_10 , styles.alignStart]}>{extra.price} { i18n.t('RS') }</Text>
                                    </View>
                                )
                            })
                        }
                    </View>


                </View>

            </Modal>

        </Container>
    );
}

export default NormalOrderDetails;


