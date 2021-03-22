import React, {useEffect, useState} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {sendOrder, getDeliveryPrice , sendSpecialOrder} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

function OrderData({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const {type} = route.params;
    const provider_id = route.params.provider_id ? route.params.provider_id : null;
    const coupon = route.params.coupon ? route.params.coupon : null;
    const details = route.params.details ? route.params.details : null;
    const [payType, setPayType] = useState('cash');
    const [cityName, setCityName]       = useState('');
    const deliveryPrice = useSelector(state => state.cart.deliveryPrice);

    const [isDatePickerVisible , setIsDatePickerVisible ] = useState(false);
    const [date , setDate ] = useState('');
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [time , setTime ] = useState('');
    const [isDeliveryTimePickerVisible, setDeliveryTimePickerVisibility] = useState(false);
    const [timeDelivery , setTimeDelivery ] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [mapRegion, setMapRegion]     = useState({
        latitude: null,
        longitude: null,
        latitudeDelta,
        longitudeDelta
    });

    const dispatch = useDispatch();

    function renderSubmit() {

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_55, styles.marginBottom_10]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        if (mapRegion.latitude == null || timeDelivery == '') {
            return (
                <View
                    style={[styles.mstrdaBtn , styles.Width_100  , styles.marginTop_55, styles.marginBottom_10 , {
                        backgroundColor:'#ddd'
                    }]}
                >
                    <Text style={[styles.textBold , styles.text_gray , styles.textSize_15]}>{ i18n.t('send') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity onPress={confirmOrder} style={[styles.mstrdaBtn , styles.SelfCenter , styles.marginTop_55  , styles.marginBottom_10]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>
        );
    }

    const confirmOrder = () => {
        setIsSubmitted(true);
        if(details){
            dispatch(sendSpecialOrder( lang, details , provider_id, mapRegion.latitude , mapRegion.longitude , cityName , payType , deliveryPrice.delivery , timeDelivery, token , navigation)).
            then(() => {setIsSubmitted(false) ; setTimeDelivery('') ; setPayType('cash') ; setCityName('') ; setMapRegion({
                latitude: null,
                longitude: null,
                latitudeDelta,
                longitudeDelta
            })});
        }
        else{
            dispatch(sendOrder(lang, provider_id, mapRegion.latitude , mapRegion.longitude , cityName , payType, deliveryPrice.delivery , coupon , timeDelivery, token , navigation)).
            then(() => {setIsSubmitted(false) ; setTimeDelivery('') ; setPayType('cash') ; setCityName('') ; setMapRegion({
                latitude: null,
                longitude: null,
                latitudeDelta,
                longitudeDelta
            })});
        }
    };

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const handleConfirmDate = myDate => {
        // console.warn("A date has been picked: ", myDate);
        let formatted_date = myDate.getFullYear() + "-" + ("0"+(myDate.getMonth() + 1)).slice(-2) + "-" + ("0" +myDate.getDate()).slice(-2);
        hideDatePicker();
        setDate(formatted_date);
    };
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = myTime => {
        hideTimePicker();
        setTime(myTime.toLocaleTimeString());
    };

    const showDeliveryTimePicker = () => {
        setDeliveryTimePickerVisibility(true);
    };

    const hideDeliveryTimePicker = () => {
        setDeliveryTimePickerVisibility(false);
    };

    const handleConfirmTimeDelivery = myTime => {
        hideDeliveryTimePicker();
        setTimeDelivery(myTime.toLocaleTimeString());
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.cityName && route.params.pathName == 'getLoc') {
                setCityName(route.params.cityName.substr(0, 40))
                setMapRegion(route.params.mapRegion)
                dispatch(getDeliveryPrice(lang, provider_id, route.params?.mapRegion.latitude , route.params?.mapRegion.longitude , token))
            }else {
                setMapRegion({
                    latitude: null,
                    longitude: null,
                    latitudeDelta,
                    longitudeDelta
                })
            }
        });


        return unsubscribe;
    }, [navigation, route.params?.cityName, route.params?.pathName, route.params?.mapRegion]);


    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('orderDetails') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20 , styles.paddingVertical_20, {overflow:'hidden'}]}>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <Item style={[styles.item]}>
                                <Label style={[styles.label]}>{ i18n.t('deliveryLoc') }</Label>
                                <Input style={[styles.input , {paddingRight:35 , borderTopLeftRadius: 5 , borderTopRightRadius: 5 , borderRadius: 5}]}
                                       value={cityName ? cityName : ''}
                                       disabled={true}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate('getLocation', { pathName: 'orderData' , latitude:mapRegion.latitude , longitude : mapRegion.longitude})} style={[{position:'absolute' , right:10  , bottom:13}]}>
                                    <Icon type={'FontAwesome'} name={"map-marker"}
                                          style={[styles.textSize_18,styles.text_gray]} />
                                </TouchableOpacity>

                            </Item>


                            {
                                type === 'meals'?

                                    <View style={[styles.Width_100]}>
                                        <Item style={[styles.item]}>
                                            <Label style={[styles.label]}>{ i18n.t('banquetDay') }</Label>
                                            <Input style={[styles.input , {paddingRight:35 , borderTopLeftRadius: 5 , borderTopRightRadius: 5 , borderRadius: 5}]}
                                                   value={date}
                                                   disabled={true}
                                            />
                                            <TouchableOpacity onPress={showDatePicker} style={[{position:'absolute' , right:10  , bottom:13}]}>
                                                <Icon type={'AntDesign'} name={"calendar"}
                                                      style={[styles.textSize_18,styles.text_mstarda]} />
                                            </TouchableOpacity>

                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                onConfirm={handleConfirmDate}
                                                onCancel={hideDatePicker}
                                            />

                                        </Item>

                                        <Item style={[styles.item]}>
                                            <Label style={[styles.label]}>{ i18n.t('banquetTime') }</Label>
                                            <Input style={[styles.input , {paddingRight:35 , borderTopLeftRadius: 5 , borderTopRightRadius: 5 , borderRadius: 5}]}
                                                   value={time}
                                                   disabled={true}
                                            />
                                            <TouchableOpacity onPress={showTimePicker} style={[{position:'absolute' , right:10  , bottom:13}]}>
                                                <Icon type={'AntDesign'} name={"clockcircleo"}
                                                      style={[styles.textSize_18,styles.text_mstarda]} />
                                            </TouchableOpacity>

                                            <DateTimePickerModal
                                                isVisible={isTimePickerVisible}
                                                mode="time"
                                                date={new Date()}
                                                onConfirm={handleConfirmTime}
                                                onCancel={hideTimePicker}
                                            />

                                        </Item>
                                    </View>
                                    :
                                    null

                            }



                            <Item style={[styles.item]}>
                                <Label style={[styles.label]}>{ i18n.t('deliveryTime') }</Label>
                                <Input style={[styles.input , {paddingRight:35 , borderTopLeftRadius: 5 , borderTopRightRadius: 5 , borderRadius: 5}]}
                                       value={timeDelivery}
                                       disabled={true}
                                />
                                <TouchableOpacity onPress={showDeliveryTimePicker} style={[{position:'absolute' , right:10  , bottom:13}]}>
                                    <Icon type={'AntDesign'} name={"clockcircleo"}
                                          style={[styles.textSize_18,styles.text_gray]} />
                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={isDeliveryTimePickerVisible}
                                    mode="time"
                                    date={new Date()}
                                    onConfirm={handleConfirmTimeDelivery}
                                    onCancel={hideDeliveryTimePicker}
                                />


                            </Item>

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

                            <View style={[styles.bg_lightMstarda , styles.Width_100 ,styles.paddingHorizontal_15  , styles.height_45 , styles.directionRowSpace , styles.marginTop_20]}>
                                <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14 ]}>{i18n.t('deliveryPrice') }  :  {deliveryPrice && cityName? deliveryPrice.delivery : 0} {i18n.t('RS') }</Text>
                            </View>

                            {
                               renderSubmit()
                            }


                        </Form>
                    </KeyboardAvoidingView>


                </View>

            </Content>
        </Container>
    );
}

export default OrderData;


