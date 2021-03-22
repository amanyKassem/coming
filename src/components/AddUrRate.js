import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Radio, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import {userRate} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AddUrRate({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch()

    const {provider , delegate} = route.params;

    const [restStarCount, setRestStarCount] = useState(0);
    const [msgRest, setMsgRest] = useState('');
    const [quality, setQuality] = useState('1');
    const [cleanliness, setCleanliness] = useState('1');

    const [delegateStarCount, setDelegateStarCount] = useState(0);
    const [msgDelegate, setMsgDelegate] = useState('');
    const [handlingWay, setHandlingWay] = useState('1');
    const [deliverySpeed, setDeliverySpeed] = useState('1');

    function renderSubmit() {

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginBottom_20]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        if (msgRest == '' || msgDelegate == '') {
            return (
                <View
                    style={[styles.mstrdaBtn , styles.Width_95 , styles.SelfCenter , styles.marginTop_40 , styles.marginBottom_35 , {
                        backgroundColor:'#ddd'
                    }]}
                >
                    <Text style={[styles.textBold , styles.text_gray , styles.textSize_15]}>{ i18n.t('rate') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity onPress={onConfirm} style={[styles.mstrdaBtn , styles.Width_95 , styles.SelfCenter , styles.marginTop_40 , styles.marginBottom_35]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('rate') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm() {
        setIsSubmitted(true);
        dispatch(userRate(lang , restStarCount , msgRest , quality , cleanliness , handlingWay , deliverySpeed , provider.id , token)).
        then(() => dispatch(userRate(lang , delegateStarCount , msgDelegate , quality , cleanliness , handlingWay , deliverySpeed , delegate.id , token)).
        then(() => {setIsSubmitted(false) ; navigation.navigate('rateSuccessfully')}));
    }

    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('addUrRate') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100, {overflow:'hidden'}]}>

                    <View style={[styles.bg_mstarda , styles.marginTop_30 ,styles.paddingHorizontal_20 ,  styles.centerContext  , styles.height_45]}>
                        <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{i18n.t('restRate') }</Text>
                    </View>

                    <View style={[ styles.flexCenter , styles.Width_100 , styles.marginVertical_20 , styles.paddingHorizontal_20 ]}>
                        <Image source={{uri:provider.avatar}} style={[styles.icon70 , styles.Radius_7]} resizeMode={'cover'} />
                        <Text style={[styles.textRegular , styles.text_gray , styles.marginVertical_10 , styles.textSize_14]}>{provider.name}</Text>
                        <StarRating
                            maxStars={5}
                            rating={restStarCount}
                            selectedStar={(rating) => setRestStarCount(rating)}
                            fullStarColor={'#fec104'}
                            starSize={14}
                            starStyle={{ marginHorizontal: 1 }}
                        />

                        <Item style={[styles.item , styles.marginTop_10]}>
                            <Textarea
                                style={[styles.input , styles.height_150 , styles.paddingVertical_10 ,
                                    {borderTopRightRadius :10 ,borderTopLeftRadius :10, borderRadius :10  , borderColor:msgRest ? COLORS.mstarda : '#eee',
                                        borderWidth:1 , backgroundColor:msgRest ? '#fff' : '#eee' , lineHeight:22}]}
                                placeholder={i18n.t('writeComment') }
                                onChangeText={(msgRest) => setMsgRest(msgRest)}
                                value={msgRest}
                            />
                        </Item>

                        <Text style={[styles.textRegular , styles.text_gray , styles.marginBottom_10 , styles.textSize_14 , styles.alignStart]}>{i18n.t('rateDetails') }</Text>

                        <View style={[styles.directionRowSpace , styles.Width_100 , styles.marginTop_10]}>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('quality') }</Text>
                            <View style={[styles.directionRowSpace , {flex:1 , marginLeft:50}]}>
                                <TouchableOpacity onPress={() => setQuality('1')} style={[styles.directionRow]}>
                                    <Radio
                                        color={quality === '1' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={quality === '1'}
                                        onPress={() => setQuality('1')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('good') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setQuality('2')} style={[styles.directionRow]}>
                                    <Radio
                                        color={quality === '2' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={quality === '2'}
                                        onPress={() => setQuality('2')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('excellent') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setQuality('3')} style={[styles.directionRow]}>
                                    <Radio
                                        color={quality === '3' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={quality === '3'}
                                        onPress={() => setQuality('3')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('bad') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.directionRowSpace , styles.Width_100 , styles.marginTop_15]}>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('cleanliness') }</Text>
                            <View style={[styles.directionRowSpace , {flex:1 , marginLeft:50}]}>
                                <TouchableOpacity onPress={() => setCleanliness('1')} style={[styles.directionRow]}>
                                    <Radio
                                        color={cleanliness === '1' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={cleanliness === '1'}
                                        onPress={() => setCleanliness('1')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('good') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setCleanliness('2')} style={[styles.directionRow]}>
                                    <Radio
                                        color={cleanliness === '2' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={cleanliness === '2'}
                                        onPress={() => setCleanliness('2')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('excellent') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setCleanliness('3')} style={[styles.directionRow]}>
                                    <Radio
                                        color={cleanliness === '3' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={cleanliness === '3'}
                                        onPress={() => setCleanliness('3')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('bad') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <View style={[styles.bg_mstarda , styles.marginTop_30 ,styles.paddingHorizontal_20 ,  styles.centerContext  , styles.height_45]}>
                        <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{i18n.t('delegateRate') }</Text>
                    </View>

                    <View style={[ styles.flexCenter , styles.Width_100 , styles.marginVertical_20 , styles.paddingHorizontal_20 ]}>
                        <Image source={{uri:delegate.avatar}} style={[styles.icon70 , styles.Radius_7]} resizeMode={'cover'} />
                        <Text style={[styles.textRegular , styles.text_gray , styles.marginVertical_10 , styles.textSize_14]}>{delegate.name}</Text>
                        <StarRating
                            maxStars={5}
                            rating={delegateStarCount}
                            selectedStar={(rating) => setDelegateStarCount(rating)}
                            fullStarColor={'#fec104'}
                            starSize={14}
                            starStyle={{ marginHorizontal: 1 }}
                        />

                        <Item style={[styles.item , styles.marginTop_10]}>
                            <Textarea
                                style={[styles.input , styles.height_150 , styles.paddingVertical_10 ,
                                    {borderTopRightRadius :10 ,borderTopLeftRadius :10, borderRadius :10  , borderColor:msgDelegate ? COLORS.mstarda : '#eee',
                                        borderWidth:1 , backgroundColor:msgDelegate ? '#fff' : '#eee' , lineHeight:22}]}
                                placeholder={i18n.t('writeComment') }
                                onChangeText={(msgDelegate) => setMsgDelegate(msgDelegate)}
                                value={msgDelegate}
                            />
                        </Item>

                        <Text style={[styles.textRegular , styles.text_gray , styles.marginBottom_10 , styles.textSize_14 , styles.alignStart]}>{i18n.t('rateDetails') }</Text>

                        <View style={[styles.directionRowSpace , styles.Width_100 , styles.marginTop_10]}>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('handlingWay') }</Text>
                            <View style={[styles.directionRowSpace , {flex:1 , marginLeft:50}]}>
                                <TouchableOpacity onPress={() => setHandlingWay('1')} style={[styles.directionRow]}>
                                    <Radio
                                        color={handlingWay === '1' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={handlingWay === '1'}
                                        onPress={() => setHandlingWay('1')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('good') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setHandlingWay('2')} style={[styles.directionRow]}>
                                    <Radio
                                        color={handlingWay === '2' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={handlingWay === '2'}
                                        onPress={() => setHandlingWay('2')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('excellent') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setHandlingWay('3')} style={[styles.directionRow]}>
                                    <Radio
                                        color={handlingWay === '3' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={handlingWay === '3'}
                                        onPress={() => setHandlingWay('3')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('bad') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.directionRowSpace , styles.Width_100 , styles.marginTop_15]}>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('deliverySpeed') }</Text>
                            <View style={[styles.directionRowSpace , {flex:1 , marginLeft:50}]}>
                                <TouchableOpacity onPress={() => setDeliverySpeed('1')} style={[styles.directionRow]}>
                                    <Radio
                                        color={deliverySpeed === '1' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={deliverySpeed === '1'}
                                        onPress={() => setDeliverySpeed('1')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('good') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setDeliverySpeed('2')} style={[styles.directionRow]}>
                                    <Radio
                                        color={deliverySpeed === '2' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={deliverySpeed === '2'}
                                        onPress={() => setDeliverySpeed('2')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('excellent') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setDeliverySpeed('3')} style={[styles.directionRow]}>
                                    <Radio
                                        color={deliverySpeed === '3' ? COLORS.mstarda : COLORS.midGray}
                                        selectedColor={COLORS.mstarda}
                                        selected={deliverySpeed === '3'}
                                        onPress={() => setDeliverySpeed('3')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , {marginLeft:10}]}>{ i18n.t('bad') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    {
                        renderSubmit()
                    }

                </View>

            </Content>
        </Container>
    );
}

export default AddUrRate;


