import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Form, Icon, Input, Item} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getCartDetails , ChangeProductQuantity , ValidationCoupon , deleteProduct} from '../actions';
import Header from '../common/Header';
import BasketProduct from './BasketProduct';
import COLORS from "../consts/colors";
import { useIsFocused } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.922;
const longitudeDelta = 0.521;

function BasketDetails({navigation,route}) {
    const {id} = route.params;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const cartDetails = useSelector(state => state.cart.cartDetails);
    const cartDetailsLoader = useSelector(state => state.cart.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const validationCoupon = useSelector(state => state.cart.validationCoupon);
    const [coupon, setCoupon] = useState('');


    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getCartDetails(lang , id, coupon , token)).then(() => setScreenLoader(false))
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
            if(cartDetails && cartDetails.count == 0)
                navigation.navigate('basket')
        }
    }, [isFocused , cartDetails && cartDetails.count ? cartDetails.count : null])

    function DeleteProducts(CartId, ProviderId) {
        dispatch(deleteProduct(CartId, ProviderId, lang, token , navigation)).then(() => dispatch(getCartDetails(lang , id, coupon , token)))
    }

    function Increase(CartId, ProviderId, type) {
        dispatch(ChangeProductQuantity(type, CartId, ProviderId, lang, token)).then(() => dispatch(getCartDetails(lang , id, coupon , token)))
    }

    function Decrease(CartId, ProviderId, type) {
        dispatch(ChangeProductQuantity(type, CartId, ProviderId, lang, token)).then(() => dispatch(getCartDetails(lang , id, coupon , token)))
    }

    const changeCoupon = (coupon) => {
        setCoupon(coupon)
        dispatch(ValidationCoupon(coupon, lang, token)).then(() => dispatch(getCartDetails(lang , id, coupon , token)))
    }

    function renderLoader(){
        if (screenLoader){
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

                <Header navigation={navigation} title={ i18n.t('basket') } />

                {
                    cartDetails ?
                        <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100, {overflow:'hidden'}]}>

                            {
                                cartDetails.provider ?
                                    <View style={[styles.borderGray,styles.marginVertical_10 , styles.directionRow , styles.Radius_5 , {padding:10}]}>
                                        <Image source={{uri:cartDetails.provider.avatar}} style={[styles.icon50 , styles.Radius_7]} resizeMode={'cover'} />
                                        <View style={[styles.marginHorizontal_15,{flex:1}]}>
                                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{cartDetails.provider.name}</Text>
                                            <View style={[styles.directionRow , styles.marginTop_5]}>
                                                <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                                <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, {lineHeight:20}]}>{cartDetails.provider.address}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }



                            <View style={[styles.bg_light_gray ,styles.paddingHorizontal_20 , styles.height_45 , styles.marginBottom_5 , styles.directionRow]}>
                                <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_14 ]}>{i18n.t('products') }</Text>
                            </View>

                            {
                                cartDetails.products ?
                                    cartDetails.products.map((pro, i) => {
                                        return (
                                            <BasketProduct key={i} pro={pro} i={i} DeleteProducts={() => DeleteProducts(pro.id, cartDetails.provider.id)} Decrease={() => Decrease(pro.id, cartDetails.provider.id, 'minus')} Increase={() => Increase(pro.id, cartDetails.provider.id, 'increase')}/>
                                        )
                                    })
                                    :
                                    null
                            }


                            <View style={[styles.directionRow ,styles.bg_black ,styles.paddingHorizontal_20 , styles.height_45 , styles.marginTop_20 , styles.marginBottom_10]}>
                                <Image source={require('../../assets/images/percentage.png')} style={[styles.icon25 , {marginRight:15}]} resizeMode={'contain'} />
                                <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{i18n.t('addCoupon') }</Text>
                            </View>

                            <Item style={[styles.item , styles.Width_90 , styles.SelfCenter]}>
                                <Input style={[styles.input , {borderTopRightRadius :25 ,borderTopLeftRadius :25 , borderColor:coupon ? COLORS.mstarda : '#eee', borderWidth:1 , backgroundColor:coupon ? '#fff' : '#eee'}]}
                                       placeholder={ i18n.t('discountCode') }
                                       placeholderTextColor={COLORS.midGray}
                                       onChangeText={(coupon) => changeCoupon(coupon)}
                                       value={coupon}
                                />
                            </Item>

                            <View style={[styles.directionRowSpace , styles.paddingHorizontal_20 , styles.bg_light_gray , styles.marginBottom_5, styles.height_45 ]}>
                                <Text style={[styles.textBold , styles.text_gray , styles.textSize_14]}> {i18n.t('total') } </Text>
                                <Text style={[styles.textBold , styles.text_gray, styles.textSize_14]}>{cartDetails.prices ? cartDetails.prices.total : 0} {i18n.t('RS') }</Text>
                            </View>

                            <View style={[styles.directionRowSpace , styles.paddingHorizontal_20 , styles.bg_light_gray , styles.height_45 ]}>
                                <Text style={[styles.textBold , styles.text_gray , styles.textSize_14]}> {i18n.t('tax') } </Text>
                                <Text style={[styles.textBold , styles.text_gray , styles.textSize_14]}>{cartDetails.prices ? cartDetails.prices.added_value : '0'} {i18n.t('RS') }</Text>
                            </View>

                            {
                                token ?
                                    <TouchableOpacity onPress={() => navigation.navigate('orderData' , {type:cartDetails.provider.type , provider_id:cartDetails.provider.id , coupon})} style={[styles.mstrdaBtn , styles.Width_90 , styles.SelfCenter  , styles.marginTop_40 , styles.marginBottom_25]}>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('confirm') }</Text>
                                    </TouchableOpacity>
                                    :
                                    null
                            }

                        </View>
                        :
                        null
                }


            </Content>
        </Container>
    );
}

export default BasketDetails;


