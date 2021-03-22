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
import {Container, Content, Form, Icon, Input, Item, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getProviderDetails, getProviderProducts, setFavourite} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function CategoryDetails({navigation,route}) {

    const {type , id} = route.params;
    const [activeType, setActiveType] = useState(null);
    const [details, setDetails] = useState('');

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const providerDetails = useSelector(state => state.categories.providerDetails);
    const providerDetailsLoader = useSelector(state => state.categories.loader);
    const providerProducts = useSelector(state => state.providerProducts.providerProducts);
    const providerProductsLoader = useSelector(state => state.providerProducts.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setDetails('');
        setScreenLoader(true);
        dispatch(getProviderDetails(lang , id));
        dispatch(getProviderProducts(lang ,null , null , id));
    }
    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , providerDetailsLoader, route.params?.id]);

    useEffect(() => {
        setScreenLoader(false)
    }, [providerDetails, providerProducts]);


    function onToggleFavorite (id){
        dispatch(setFavourite(lang , id, token)).then(() => dispatch(getProviderDetails(lang, id)))
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

    function Item({ name , desc , image , price , price_discount , id , index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('productDetails' , {pathName:'categoryDetails' , id , type})} style={[styles.bg_light_gray,styles.marginBottom_10 , styles.directionRow , styles.Radius_5 , {flex:1 , padding:10}]}>
                <Image source={{uri:image}} style={[styles.icon70 , styles.Radius_7]} resizeMode={'cover'} />
                <View style={[{marginLeft:15 , flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.marginBottom_5]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.writingDir , {marginRight:5 , flex:1}]}>{ name }</Text>
                        <View style={[styles.directionRow]}>
                            {
                                price_discount != price ?
                                    <Text style={[styles.textRegular , styles.text_mstarda , price_discount == price ? styles.linethrough : '' , styles.textSize_13 , {marginLeft:5}]}>{ price_discount } { i18n.t('RS') }</Text>
                                    :
                                    null
                            }
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13 ,  price_discount != price  ? styles.linethrough : '', {marginLeft:5}]}>{ price } { i18n.t('RS') }</Text>

                        </View>
                    </View>
                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_12 , styles.alignStart , styles.writingDir , {lineHeight:18}]}>{ desc }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function changeMenu(id){
        setActiveType(id);
        setScreenLoader(true);
        dispatch(getProviderProducts(lang ,id , null , providerDetails.id));
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setActiveType(null)

        })
        return unsubscribe
    }, [navigation, route])

    function renderNoData() {
        if (providerProducts && (providerProducts).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.heightFull]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }


    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}

            {
                providerDetails ?
                    <Content contentContainerStyle={[styles.bgFullWidth]} scrollEnabled={false}>
                        <ImageBackground source={{uri:providerDetails.cover}} resizeMode={'cover'} style={[styles.Width_100 ,  activeType != '0'? styles.height_340 : styles.height_300]}>
                            <View style={[styles.overlay_black , styles.heightFull , styles.Width_100]}>

                                <Header navigation={navigation} title={ i18n.t('details') }  onToggleFavorite={() => onToggleFavorite(id)} likeIcon={providerDetails.is_favourite} />

                                <View style={[styles.directionColumnCenter , styles.marginTop_10]}>
                                    <View style={[styles.icon70 , styles.Radius_50 , styles.overlay_white, styles.marginBottom_7 ,{ padding: 5 }]}>
                                        <Image source={{uri:providerDetails.avatar}} style={[styles.Width_100 , styles.heightFull , styles.Radius_50]} resizeMode='cover' />
                                    </View>
                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_14 , styles.textCenter , styles.marginBottom_5]}>{providerDetails.name}</Text>

                                    <View style={[styles.directionRow , styles.marginTop_5]}>
                                        <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_13]}>{providerDetails.address}</Text>
                                    </View>

                                    <View style={[styles.directionRow , styles.marginTop_10]}>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={providerDetails.rate}
                                            fullStarColor={'#fec104'}
                                            emptyStarColor={'#fff'}
                                            starSize={12}
                                            starStyle={{ marginHorizontal: 2}}
                                        />
                                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, {marginLeft:10}]}>{i18n.t('away')} {providerDetails.distance}</Text>
                                    </View>
                                    {
                                        activeType != '0' && token?
                                            <TouchableOpacity onPress={() => setActiveType('0')} style={[styles.mstrdaBtn , styles.Width_50 , styles.marginVertical_20]}>
                                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('addSpecialOrder') }</Text>
                                            </TouchableOpacity>
                                            :
                                            null
                                    }


                                </View>
                            </View>
                        </ImageBackground>

                        <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100, {overflow:'hidden'}]}>
                            <View style={[styles.mainScroll]}>

                                <ScrollView style={[styles.scrollView]} horizontal={true} showsHorizontalScrollIndicator={false}>

                                    <TouchableOpacity onPress={() => changeMenu(null)} style={styles.scrollTouch}>
                                        <Text style={[styles.scrollText, { color: activeType === null ? COLORS.mstarda : COLORS.black }]}>{i18n.t('all')}</Text>
                                        <View style={[styles.triangle, { borderBottomColor: activeType === null ? COLORS.mstarda : 'transparent' }]} />
                                    </TouchableOpacity>

                                    {
                                        providerDetails.menus && ( providerDetails.menus).length > 0?

                                            providerDetails.menus.map((menu, i) => {
                                                return (
                                                    <TouchableOpacity onPress={() => changeMenu(menu.id)} style={styles.scrollTouch}>
                                                        <Text style={[styles.scrollText, { color: activeType === menu.id ? COLORS.mstarda : COLORS.black }]}>{menu.name}</Text>
                                                        <View style={[styles.triangle, { borderBottomColor: activeType === menu.id ? COLORS.mstarda : 'transparent' }]} />
                                                    </TouchableOpacity>
                                                )
                                            })
                                            :
                                           null
                                    }

                                </ScrollView>
                            </View>

                            {
                                activeType != '0'?
                                    <View style={[styles.marginTop_10 , styles.paddingHorizontal_20 , {height:IS_IPHONE_X ? height - 470 :  height - 400}]}>
                                        {
                                            providerProducts && (providerProducts).length > 0?
                                                <FlatList
                                                    data={providerProducts}
                                                    horizontal={false}
                                                    showsVerticalScrollIndicator={false}
                                                    renderItem={({ item , index}) => <Item
                                                        id={item.id}
                                                        name={item.name}
                                                        desc={item.details}
                                                        image={item.image}
                                                        price={item.price}
                                                        price_discount={item.price_discount}
                                                        index={index}
                                                    />}
                                                    keyExtractor={item => item.id}
                                                />
                                                :
                                                renderNoData()
                                        }

                                    </View>
                                    :
                                    <View style={[styles.marginTop_10 , styles.paddingHorizontal_20]}>
                                        <Label style={[styles.label , styles.text_black]}>{ i18n.t('specialOrderDet') }</Label>
                                        <Textarea
                                            style={[styles.input , styles.height_120 , styles.paddingVertical_10 , styles.bg_light_gray ,
                                                {borderTopRightRadius :10 , borderTopLeftRadius :10 , borderRadius :10  , lineHeight:22}]}
                                            onChangeText={(details) => setDetails(details)}
                                            value={details}
                                        />

                                        {
                                            details ?
                                                <TouchableOpacity onPress={() => navigation.navigate('orderData' , {type , details , provider_id : id})} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginVertical_20]}>
                                                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('confirm') }</Text>
                                                </TouchableOpacity>
                                                :
                                                <View style={[styles.mstrdaBtn , styles.Width_100 , styles.marginVertical_20, {
                                                    backgroundColor:'#ddd'
                                                }]}>
                                                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('confirm') }</Text>
                                                </View>
                                        }


                                    </View>
                            }


                        </View>

                    </Content>
                    :
                    null
            }

        </Container>
    );
}

export default CategoryDetails;


