import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    I18nManager,
    KeyboardAvoidingView, ActivityIndicator
} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label, Radio, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from "react-redux";
import {sendTrans , withdraw} from "../actions";
import Header from './Header';
import COLORS from "../consts/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function BankTransfer({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const bank = route.params && route.params.bank ? route.params.bank : null;
    const title = route.params && route.params.title ? route.params.title : '';
    const dispatch = useDispatch();

    const [bankName, setBankName] = useState('');
    const [accHolderName, setAccHolderName] = useState('');
    const [accNum, setAccNum] = useState('');
    const [amountToBeCharged, setAmountToBeCharged] = useState('');
    const [base64, setBase64] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hwalaImg, setHwalaImg] = useState('');

    function renderSubmit() {

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_40, styles.marginBottom_20]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        if (bankName == '' || accHolderName == '' || accNum == ''  || amountToBeCharged == '' || (title !== i18n.t('recoverBalance') ? base64 == '' : null )) {
            return (
                <View
                    style={[styles.mstrdaBtn , styles.Width_100  , styles.marginBottom_20 , styles.marginTop_40 , styles.Radius_5 , {
                        backgroundColor:'#ddd'
                    }]}
                >
                    <Text style={[styles.textBold , styles.text_gray , styles.textSize_14]}>{ i18n.t('send') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_20 , styles.marginTop_40 , styles.Radius_5 ]}>
                <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('send') }</Text>
            </TouchableOpacity>
        );
    }

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };
    const _pickImage = async () => {

        askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true
        });

        if (!result.cancelled) {
            setHwalaImg(result.uri);
            setBase64(result.base64);
        }
    };

    function onConfirm() {
        setIsSubmitted(true);
        if(title !== i18n.t('recoverBalance')){
            dispatch(sendTrans(lang , bankName , accHolderName ,accNum , amountToBeCharged , bank.id , base64 , token, navigation)).then(() => {setIsSubmitted(false) ; setHwalaImg(null)});
        } else {
            dispatch(withdraw(lang , accNum , bankName , accHolderName , amountToBeCharged , token, navigation)).then(() => {setIsSubmitted(false)});
        }
    }

    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('bankTransfer') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20 , styles.alignCenter, {overflow:'hidden'}]}>

                    <View style={[styles.Width_100]}>

                        {
                            title !== i18n.t('recoverBalance') ?
                                <View style={[styles.bg_gray , styles.paddingHorizontal_20 , styles.paddingVertical_15 , styles.Width_100 , styles.marginTop_25 , styles.Radius_10]}>

                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_13 , styles.alignStart]}>{ i18n.t('accName') } : {bank.account_name}</Text>
                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_13 , styles.marginTop_10 , styles.alignStart]}>{ i18n.t('bankName') } : {bank.bank_name}</Text>
                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_13 , styles.marginTop_10 , styles.alignStart]}>{ i18n.t('accNum') } : {bank.account_number}</Text>
                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_13 , styles.marginTop_10 , styles.alignStart]}>{bank.iban_number} : { i18n.t('iabn') }</Text>

                                </View>
                                :
                                null
                        }


                        <KeyboardAvoidingView style={[styles.Width_100 , styles.marginTop_20 , styles.marginBottom_10]}>
                            <Form style={[styles.Width_100 , styles.flexCenter]}>

                                {
                                    title !== i18n.t('recoverBalance') ?
                                        <View style={[styles.directionColumnCenter , styles.marginVertical_25]}>
                                            <TouchableOpacity style={[styles.icon80 , styles.Radius_50 , styles.borderGray , styles.marginBottom_7 ,{ padding: 3 }]} onPress={_pickImage}>
                                                <Image source={hwalaImg ? { uri: hwalaImg } : require('../../assets/images/image_placeholder.png')} style={[styles.Width_100 , styles.heightFull , styles.Radius_50]} resizeMode='cover' />
                                            </TouchableOpacity>
                                            <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_15 , styles.marginBottom_5]}>{ i18n.t('hwalaImg') } </Text>
                                        </View>
                                        :
                                        null
                                }


                                <Item style={[styles.item , {marginBottom:0}]}>
                                    <Input style={[styles.input  , { borderTopLeftRadius:20 ,borderTopRightRadius:20 ,
                                        borderColor:bankName ? COLORS.mstarda : '#eee', borderWidth:1 , backgroundColor:bankName ? '#fff' : '#eee'}]}
                                           placeholder={ i18n.t('bankName') }
                                           placeholderTextColor={COLORS.midGray}
                                           onChangeText={(bankName) => setBankName(bankName)}
                                           value={bankName}
                                    />
                                </Item>

                                <Item style={[styles.item , {marginBottom:0}]}>
                                    <Input style={[styles.input , {borderTopLeftRadius:20 ,borderTopRightRadius:20 ,
                                        borderColor:accHolderName ? COLORS.mstarda : '#eee', borderWidth:1 , backgroundColor:accHolderName ? '#fff' : '#eee'}]}
                                           placeholder={ i18n.t('accHolderName') }
                                           placeholderTextColor={COLORS.midGray}
                                           onChangeText={(accHolderName) => setAccHolderName(accHolderName)}
                                           value={accHolderName}
                                    />
                                </Item>

                                <Item style={[styles.item , {marginBottom:0}]}>
                                    <Input style={[styles.input , {borderTopLeftRadius:20 ,borderTopRightRadius:20 ,
                                        borderColor:accNum ? COLORS.mstarda : '#eee', borderWidth:1 , backgroundColor:accNum ? '#fff' : '#eee'}]}
                                           placeholder={ i18n.t('accNum') }
                                           placeholderTextColor={COLORS.midGray}
                                           onChangeText={(accNum) => setAccNum(accNum)}
                                           value={accNum}
                                    />
                                </Item>

                                <Item style={[styles.item , {marginBottom:0}]}>
                                    <Input style={[styles.input  , {borderTopLeftRadius:20 ,borderTopRightRadius:20 ,
                                        borderColor:amountToBeCharged ? COLORS.mstarda : '#eee', borderWidth:1 , backgroundColor:amountToBeCharged ? '#fff' : '#eee'}]}
                                           placeholder={ i18n.t('amountToBeCharged') }
                                           placeholderTextColor={COLORS.midGray}
                                           onChangeText={(amountToBeCharged) => setAmountToBeCharged(amountToBeCharged)}
                                           value={amountToBeCharged}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>

                                {renderSubmit()}

                            </Form>
                        </KeyboardAvoidingView>
                    </View>


                </View>

            </Content>
        </Container>
    );
}

export default BankTransfer;


