import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, Linking, ActivityIndicator} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getOrderDetails, orderCancel} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import Communications from 'react-native-communications';
import Modal from "react-native-modal";
import {useIsFocused} from "@react-navigation/native";

function OrderDetails({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const orderDetails = useSelector(state => state.orders.orderDetails);
    const [screenLoader , setScreenLoader ] = useState(false);
    const [extras , setExtras ] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const id = route.params.id;

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getOrderDetails(lang , id, token)).then(() => setScreenLoader(false))
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused])

    const pathName = route.params.pathName ? route.params.pathName : '';

    const [showDetails, setShowDetails] = useState(false);
    const [showDelegateDetails, setShowDelegateDetails] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function toggleModal (proExtras) {
        setShowModal(!showModal);
        setExtras(proExtras)
    };

    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }


    function checkOrderStatus(orderStatus, currentStatus){
        if (currentStatus === 'PROGRESS'){
            if (orderStatus === 'PROGRESS'
                || orderStatus === 'READY'
                || orderStatus === 'DELEGATEACCEPT'
                || orderStatus === 'DELEGATEARRIVED'
                || orderStatus === 'DELIVEREDTODELEGATE'
                || orderStatus === 'ONWAY'
                || orderStatus === 'ARRIVED'
                || orderStatus === 'DELIVER'
                || orderStatus === 'DELIVERED' ){
                return true
            }
        }  else if(currentStatus === 'READY'){
            if (orderStatus === 'READY'
                || orderStatus === 'DELEGATEACCEPT'
                || orderStatus === 'DELEGATEARRIVED'
                || orderStatus === 'DELIVEREDTODELEGATE'
                || orderStatus === 'ONWAY'
                || orderStatus === 'ARRIVED'
                || orderStatus === 'DELIVER'
                || orderStatus === 'DELIVERED' ){
                return true
            }
        } else if(currentStatus === 'DELEGATEACCEPT'){
            if (orderStatus === 'DELEGATEACCEPT'
                || orderStatus === 'DELEGATEARRIVED'
                || orderStatus === 'DELIVEREDTODELEGATE'
                || orderStatus === 'ONWAY'
                || orderStatus === 'ARRIVED'
                || orderStatus === 'DELIVER'
                || orderStatus === 'DELIVERED' ){
                return true
            }
        } else if(currentStatus === 'DELEGATEARRIVED'){
            if (orderStatus === 'DELEGATEARRIVED'
                || orderStatus === 'DELIVEREDTODELEGATE'
                || orderStatus === 'ONWAY'
                || orderStatus === 'ARRIVED'
                || orderStatus === 'DELIVER'
                || orderStatus === 'DELIVERED' ){
                return true
            }
        }
    }

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
        dispatch(orderCancel(lang , id , token , navigation , 'myOrders')).then(() => {setIsSubmitted(false)});
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

                            {
                                orderDetails.provider ?
                                    <View style={[styles.marginTop_10,styles.paddingHorizontal_20]}>
                                        <View style={[styles.borderGray,styles.marginBottom_20 , styles.directionRow , styles.Radius_5 , {flex:1 , padding:10}]}>
                                            <View style={[styles.directionRow , {flex:1}]}>
                                                <Image source={{uri:orderDetails.provider.avatar}} style={[styles.icon70 , styles.Radius_7]} resizeMode={'cover'} />
                                                <View style={[styles.paddingHorizontal_10  , {flex:1}]}>
                                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.alignStart , styles.marginBottom_5 , {lineHeight:20}]}>{orderDetails.provider.name}</Text>
                                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , styles.alignStart]}>{orderDetails.date}</Text>
                                                </View>
                                            </View>
                                            <View style={[{borderLeftWidth:1 , borderLeftColor:'#ddd' , paddingLeft:15} , styles.heightFull , styles.centerContext]}>
                                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 , styles.marginBottom_5]}>{i18n.t('orderNum') }</Text>
                                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{orderDetails.order_id}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }


                            <View style={[styles.bg_light_gray ,styles.paddingHorizontal_20 ,  styles.directionRow  , styles.height_45]}>
                                <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('followOrder') }</Text>
                            </View>
                            <View style={[styles.marginTop_20,styles.paddingHorizontal_20 , styles.Width_100]}>
                                <View style={styles.followStep}>
                                    <View style={[styles.skyCircle ,
                                        {backgroundColor: checkOrderStatus(orderDetails.status, 'PROGRESS')  ? COLORS.mstarda : '#fff',
                                            borderColor:  checkOrderStatus(orderDetails.status, 'PROGRESS')  ? COLORS.mstarda : COLORS.gray}]}>
                                        <Icon type={'Feather'} name={'check'} style={[styles.checkCircle]} />
                                    </View>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{i18n.t('orderHasReceived')}</Text>
                                    <View style={[styles.stepLine ,
                                        {backgroundColor: checkOrderStatus(orderDetails.status, 'PROGRESS') ? COLORS.mstarda :COLORS.gray,}]}/>
                                </View>

                                <View style={[styles.followStep ]}>
                                    <View style={[styles.skyCircle ,
                                        {backgroundColor:checkOrderStatus(orderDetails.status, 'READY') ? COLORS.mstarda :'#fff',
                                            borderColor:checkOrderStatus(orderDetails.status, 'READY') ? COLORS.mstarda :COLORS.gray}]}>
                                        <Icon type={'Feather'} name={'check'} style={[styles.checkCircle]} />
                                    </View>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{i18n.t('prepCompleted')}</Text>
                                    <View style={[styles.stepLine ,
                                        {backgroundColor:checkOrderStatus(orderDetails.status, 'READY')? COLORS.mstarda :COLORS.gray,}]}/>
                                </View>

                                <View style={[styles.followStep ]}>
                                    <View style={[styles.skyCircle ,
                                        {backgroundColor:checkOrderStatus(orderDetails.status, 'DELEGATEACCEPT') ? COLORS.mstarda : '#fff',
                                            borderColor:checkOrderStatus(orderDetails.status, 'DELEGATEACCEPT')   ? COLORS.mstarda : COLORS.gray}]}>
                                        <Icon type={'Feather'} name={'check'} style={[styles.checkCircle]} />
                                    </View>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{i18n.t('orderDelegate')}</Text>
                                    <View style={[styles.stepLine ,
                                        {backgroundColor:checkOrderStatus(orderDetails.status, 'DELEGATEACCEPT') ? COLORS.mstarda :COLORS.gray,}]}/>
                                </View>

                                <View style={[styles.followStep ]}>
                                    <View style={[styles.skyCircle ,
                                        {backgroundColor:checkOrderStatus(orderDetails.status, 'DELEGATEARRIVED')? COLORS.mstarda : '#fff',
                                            borderColor:checkOrderStatus(orderDetails.status, 'DELEGATEARRIVED')? COLORS.mstarda : COLORS.gray}]}>
                                        <Icon type={'Feather'} name={'check'} style={[styles.checkCircle]} />
                                    </View>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{i18n.t('orderDelivered')}</Text>
                                </View>
                            </View>



                            <TouchableOpacity onPress={() => setShowDetails(!showDetails)} style={[styles.marginTop_20 , styles.bg_light_gray , styles.directionRowSpace ,styles.paddingHorizontal_20 , styles.height_45]}>
                                <Text style={[styles.textBold , showDetails ? styles.text_mstarda : styles.text_gray , styles.textSize_14 ]}>{i18n.t('orderDetails') }</Text>
                                <Icon type={'AntDesign'} name={showDetails ?  'caretup' : 'caretdown'} style={[styles.textSize_12 , showDetails ? styles.text_mstarda : styles.text_gray]} />
                            </TouchableOpacity>

                            {
                                showDetails?
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

                                                            <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_12]}>{pro.price} {i18n.t('RS') }</Text>
                                                        </View>)
                                                })
                                                :
                                                null
                                        }



                                        <View style={[styles.marginTop_20 , styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                            <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('payMethod') }</Text>
                                        </View>
                                        <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{orderDetails.payment_text}</Text>

                                        <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                            <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('orderStatus') }</Text>
                                        </View>
                                        <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{orderDetails.status_text}</Text>

                                        <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                            <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('purchasePrice') }</Text>
                                        </View>
                                        <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{orderDetails.sum} {i18n.t('RS') }</Text>

                                        <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                            <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('totalPrice') }</Text>
                                        </View>
                                        <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{orderDetails.total} {i18n.t('RS') }</Text>

                                        <View style={[ styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.directionRow  , styles.height_45]}>
                                            <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('deliveryPrice') }</Text>
                                        </View>
                                        <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{orderDetails.shipping} {i18n.t('RS') }</Text>

                                        <View style={[styles.bg_light_gray ,styles.paddingHorizontal_20 ,  styles.directionRow  , styles.height_45]}>
                                            <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14]}>{i18n.t('deliveryDetails') }</Text>
                                        </View>

                                        <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{i18n.t('receiptLoc') }</Text>

                                        {
                                            orderDetails.address ?
                                                <View style={[styles.directionRow,styles.paddingHorizontal_20 , styles.marginBottom_5 , {flexWrap:'wrap'}]}>
                                                    <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{orderDetails.address.address_from}</Text>
                                                    <TouchableOpacity onPress={() => googleMap(orderDetails.address.latitude_from ,orderDetails.address.longitude_from ) } style={{marginLeft:5}}>
                                                        <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13]}>( { i18n.t('seeLocation') } )</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                null
                                        }


                                        <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{i18n.t('deliveryLoc') }</Text>

                                        {
                                            orderDetails.address ?
                                                <View style={[styles.directionRow,styles.paddingHorizontal_20 , styles.marginBottom_25, {flexWrap:'wrap'}]}>
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
                                    :
                                    null
                            }


                            {
                                checkOrderStatus(orderDetails.status, 'READY') ?

                                    <View>

                                        <TouchableOpacity onPress={() => setShowDelegateDetails(!showDelegateDetails)} style={[styles.marginTop_20 , styles.bg_light_gray , styles.directionRowSpace ,styles.paddingHorizontal_20 , styles.height_45]}>
                                            <Text style={[styles.textBold , showDelegateDetails ? styles.text_mstarda : styles.text_gray , styles.textSize_14 ]}>{i18n.t('delegateInfo') }</Text>
                                            <Icon type={'AntDesign'} name={showDelegateDetails ?  'caretup' : 'caretdown'} style={[styles.textSize_12 , showDelegateDetails ? styles.text_mstarda : styles.text_gray]} />
                                        </TouchableOpacity>

                                        {
                                            showDelegateDetails && orderDetails.delegate?
                                                <View style={[styles.marginTop_5 ,styles.marginBottom_25]}>

                                                    <Text style={[styles.textRegular,styles.paddingHorizontal_20 , styles.marginVertical_15 , styles.text_gray , styles.textSize_14 ,styles.alignStart]}>{i18n.t('delegateName') }</Text>

                                                    <View style={[styles.marginTop_5 ,styles.flexCenter , styles.bg_light_gray , styles.Width_90 ,styles.paddingHorizontal_20 , styles.directionRowSpace  , styles.height_45]}>
                                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12]}>{orderDetails.delegate.name}</Text>
                                                        <TouchableOpacity onPress={() => Communications.phonecall(orderDetails.delegate.phone, true)}>
                                                            <Image source={require("../../assets/images/phone-ringing.png")} style={[styles.icon17]} resizeMode={'contain'} />
                                                        </TouchableOpacity>
                                                    </View>

                                                    <TouchableOpacity onPress={() => googleMap(orderDetails.delegate.latitude ,orderDetails.delegate.longitude ) } style={{marginLeft:5}}>
                                                        <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_13]}>( { i18n.t('seeLocation') } )</Text>
                                                    </TouchableOpacity>

                                                </View>
                                                :
                                                null
                                        }

                                    </View>
                                    :
                                    null
                            }




                        </View>
                        :
                        null
                }



            </Content>

            {
                orderDetails && orderDetails.status === 'WAITING' ?

                    renderCancelOrder()
                    :
                    orderDetails &&  orderDetails.status === 'DELIVERED' ?
                        <TouchableOpacity onPress={() => navigation.navigate('addUrRate' , {provider:orderDetails.provider , delegate:orderDetails.delegate})} style={[styles.mstrdaBtn , styles.Width_100 , styles.Radius_0]}>
                            <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('addUrRate') }</Text>
                        </TouchableOpacity>
                        :
                        null
            }



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

export default OrderDetails;


