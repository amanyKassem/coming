import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    I18nManager,
    ImageBackground,
    FlatList, ActivityIndicator
} from "react-native";
import {CheckBox, Container, Content, Form, Icon, Input, Item, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getProduct , addToCart} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function ProductDetails({navigation,route}) {

    const pathName = route.params.pathName ? route.params.pathName : '' ;
    const {id , type} = route.params;

    const [ExtraArr, setExtraArr] = useState([]);
    const [AdditoonPrice, setAdditoonPrice] = useState(0)
    const [GetID, setGetID] = useState([]);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(1);

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const product = useSelector(state => state.product.product);
    const productLoader = useSelector(state => state.product.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true);
        dispatch(getProduct(lang , id));
    }

    const increment = () => {
        if (count >= product.quantity) {
            setCount(count);
        }
        else {
            setCount(count + 1);
            setTotal((product.price_discount !=  product.price ?product.price_discount : product.price  + AdditoonPrice) * (count + 1))
        }
    }

    const decrement = () => {
        if (count === 1) {
            setCount(1);
        } else {
            setCount(count - 1);
            setTotal((product.price_discount !=  product.price ?product.price_discount : product.price + AdditoonPrice) * (count - 1))

        }

    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            setExtraArr([]);
            setGetID([]);
            setAdditoonPrice(0);
            setCount(1);
            setTotal(0);
            fetchData();
        });

        return unsubscribe;
    }, [navigation , productLoader, route.params?.id]);

    useEffect(() => {
        setScreenLoader(false)
    }, [product]);



    const toggleChecked = (item) => {

        let newArr = ExtraArr;
        let check = newArr.indexOf(item);

        if (check != -1) {
            newArr.splice(check, 1)
        } else {
            newArr.push(item)
        }


        let Price = newArr.reduce((a, { price }) => a + (price), 0)
        let Id = newArr.map(id => id.id);

        setGetID([...Id])

        setAdditoonPrice(Price)
        setExtraArr([...newArr]);

        setTotal(((product.price_discount !=  product.price ?product.price_discount : product.price ) + Price) * count)

    };

    const AddToCart = (orderTime) => {
        setScreenLoader(true)
        dispatch(addToCart(lang , id , count ,total == 0 ? (product.price_discount !=  product.price ?product.price_discount : product.price ) : total/count , GetID , token , navigation , orderTime)).then(() => setScreenLoader(false))
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

            {
                product ?
                    <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_White]}>
                        <ImageBackground source={{uri:product.image}} resizeMode={'cover'} style={[styles.Width_100 , styles.height_230 , {borderBottomRightRadius:25 , borderBottomLeftRadius:25 , overflow:'hidden'}]}>
                            <View style={[styles.overlay_black , styles.heightFull , styles.Width_100]}>

                                <Header navigation={navigation} title={ i18n.t('productDetails') } />

                            </View>
                        </ImageBackground>

                        <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20 , styles.marginTop_10, {overflow:'hidden'}]}>

                            {
                                pathName === 'specialOrders' ?

                                    <View style={[styles.bg_lightMstarda,styles.paddingHorizontal_15 , styles.marginVertical_10  , styles.height_45 , styles.directionRowSpace]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ]}>{i18n.t('orderNum') }</Text>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ]}>{product.id}</Text>
                                    </View>
                                    :
                                    null
                            }



                            <View style={[styles.directionRowSpace, styles.marginTop_5]}>
                                <Text style={[styles.textBold , styles.text_gray , styles.textSize_16]}>{product.name}</Text>
                                <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_16 ]}>{product.price_discount !=  product.price ?product.price_discount : product.price } { i18n.t('RS') }</Text>
                            </View>

                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 , styles.marginTop_15 , styles.alignStart , styles.writingDir , {lineHeight:24}]}>
                                {product.details} </Text>

                            <View style={[styles.line , styles.marginVertical_20]}/>

                            {
                                pathName === 'specialOrders' ?
                                    <View style={[styles.Width_100]}>
                                        <Text style={[styles.textBold , styles.text_gray , styles.textSize_16 ,styles.marginBottom_15 , styles.alignStart]}>{i18n.t('ingredients') }</Text>

                                        <View style={[styles.bg_light_gray,styles.paddingHorizontal_15 , styles.marginBottom_10  , styles.height_40 , styles.directionRowSpace]}>
                                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ]}>بصل</Text>
                                            <View style={[styles.directionRow]}>
                                                <TouchableOpacity>
                                                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 ]}>{i18n.t('add') }</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{borderLeftWidth:1 , borderColor:'#ddd' , paddingLeft:8 , marginLeft:8}}>
                                                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 ]}>{i18n.t('delete') }</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={[styles.bg_light_gray,styles.paddingHorizontal_15 , styles.marginBottom_10  , styles.height_40 , styles.directionRowSpace]}>
                                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ]}>بصل</Text>
                                            <View style={[styles.directionRow]}>
                                                <TouchableOpacity>
                                                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 ]}>{i18n.t('add') }</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{borderLeftWidth:1 , borderColor:'#ddd' , paddingLeft:8 , marginLeft:8}}>
                                                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 ]}>{i18n.t('delete') }</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                    :
                                    product.extras && (product.extras).length > 0?

                                        <View style={[styles.Width_100]}>
                                        <View style={[styles.directionRow, styles.marginBottom_20]}>
                                            <Text style={[styles.textBold , styles.text_gray , styles.textSize_16 , {marginRight:5}]}>{i18n.t('additions') }</Text>
                                            <Text style={[styles.textBold , styles.text_midGray , styles.textSize_13]}>( {i18n.t('optional') } )</Text>
                                        </View>

                                        <FlatList
                                            data={product.extras}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({ item, index }) =>
                                                (
                                                    <View style={[styles.directionRowSpace , styles.marginBottom_10]}>
                                                        <TouchableOpacity onPress={() => toggleChecked(item)} style={[styles.directionRow]}>
                                                            <CheckBox
                                                                checked={ExtraArr.indexOf(item) !== -1} color={ExtraArr.indexOf(item) !== -1 ? COLORS.mstarda : '#ddd'}
                                                                style={[ styles.checkBox , styles.Radius_3 , { backgroundColor: ExtraArr.indexOf(item) !== -1 ? COLORS.mstarda : '#ddd' }]}
                                                                onPress={() => toggleChecked(item)}
                                                            />

                                                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ]}>{item.name}</Text>
                                                        </TouchableOpacity>
                                                        <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 ]}>{item.price} {i18n.t('RS') } </Text>
                                                    </View>
                                                )}
                                        />

                                        <View style={[styles.line , styles.marginVertical_20]}/>
                                    </View>
                                        :
                                        null
                            }



                            <Text style={[styles.textBold , styles.text_gray , styles.textSize_16 , styles.alignStart , styles.marginBottom_20]}>{i18n.t('selectQuantity') }</Text>

                            <View style={[styles.directionRowCenter , styles.Width_100 , styles.marginBottom_20]}>
                                <TouchableOpacity onPress={() => increment()} style={[styles.icon35 , styles.bg_mstarda , styles.centerContext , styles.Radius_5]}>
                                    <Icon type={'AntDesign'} name={'plus'} style={[styles.textSize_17 , styles.text_White ]} />
                                </TouchableOpacity>
                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_20 , styles.marginHorizontal_35 ]}>{count}</Text>
                                <TouchableOpacity onPress={() => decrement()} style={[styles.icon35 , styles.centerContext  , styles.Radius_5, {backgroundColor:'#ddd'}]}>
                                    <Icon type={'AntDesign'} name={'minus'} style={[styles.textSize_17 , styles.text_gray ]} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.directionRow , styles.centerContext , styles.Width_100 , styles.marginBottom_20]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{i18n.t('total') }</Text>
                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_15 , {marginLeft:10} ]}> {total == 0 ? (product.price_discount !=  product.price ?product.price_discount : product.price) : total} {i18n.t('RS')}</Text>
                            </View>

                            {
                                pathName === 'categoryDetails' ?
                                    <View>
                                        <TouchableOpacity onPress={() => AddToCart('now')} style={[styles.mstrdaBtn , styles.Width_90 , styles.bg_gray , styles.SelfCenter  , styles.marginBottom_10]}>
                                            <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('orderNow') }</Text>
                                        </TouchableOpacity>
                                        {/*<TouchableOpacity onPress={() => navigation.navigate('orderData' , {type})} style={[styles.mstrdaBtn , styles.Width_90 , styles.SelfCenter  , styles.marginBottom_20]}>*/}
                                        {/*    <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('reserveLater') }</Text>*/}
                                        {/*</TouchableOpacity>*/}
                                        <TouchableOpacity onPress={() => AddToCart('later')} style={[styles.mstrdaBtn , styles.Width_90 , styles.SelfCenter  , styles.marginBottom_20]}>
                                            <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('reserveLater') }</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    pathName === 'specialOrders' ?
                                        <TouchableOpacity onPress={() => navigation.navigate('basket')} style={[styles.mstrdaBtn , styles.Width_90 , styles.SelfCenter  , styles.marginBottom_20]}>
                                            <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('reOrder') }</Text>
                                        </TouchableOpacity>
                                        :
                                        null
                            }


                        </View>

                    </Content>
                    :
                null
            }

        </Container>
    );
}

export default ProductDetails;


