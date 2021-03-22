import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getProviders} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";
import { useIsFocused } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.922;
const longitudeDelta = 0.521;

function Category({navigation,route}) {

    const [search, setSearch] = useState('');
    const {title , type , category_id} = route.params;

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const providers = useSelector(state => state.categories.providers);
    const providersLoader = useSelector(state => state.categories.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const [mapRegion, setMapRegion] = useState({
        latitude: '',
        longitude: '',
        latitudeDelta,
        longitudeDelta
    });
    let mapRef = useRef(null);
    const isFocused = useIsFocused();

    const dispatch = useDispatch();

    const fetchData = async () => {
        setScreenLoader(true);
        dispatch(getProviders(lang , category_id, false , null , null , null)).then(() => setScreenLoader(false));
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        } else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            userLocation = { latitude, longitude, latitudeDelta, longitudeDelta };
            setMapRegion(userLocation);
            isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;

        }
    }

    useEffect(() => {

        if (isFocused) {
            fetchData()
        }
    }, [isFocused, route.params?.category_id])

    const onSearchFilter = (keyword) => {
        setScreenLoader(true);
        setSearch(keyword);
        if (keyword) {
            dispatch(getProviders(lang , category_id, false , null , null , keyword)).then(() => setScreenLoader(false));
        }
        dispatch(getProviders(lang , category_id, false , null , null , null)).then(() => setScreenLoader(false));
    }

    const onNearProvider = () => {
        setScreenLoader(true);
        dispatch(getProviders(lang , category_id, false , mapRegion.latitude, mapRegion.longitude , null)).then(() => setScreenLoader(false));
    }

    const onFarProvider = () => {
        setScreenLoader(true);
        dispatch(getProviders(lang , category_id, false , null , null , null)).then(() => setScreenLoader(false));
    }

    const onRateProvider = () => {
        setScreenLoader(true);
        dispatch(getProviders(lang , category_id, true , null , null , null)).then(() => setScreenLoader(false));
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

    function Item({ name , image , location , rate , id , index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('categoryDetails', {id , type})} style={[styles.borderGray,styles.marginBottom_20 , styles.directionRow , styles.Radius_5 , {flex:1 , padding:10}]}>
                <Image source={{uri:image}} style={[styles.icon50 , styles.Radius_7]} resizeMode={'cover'} />
                <View style={[{marginLeft:15 , flex:1}]}>
                    <View style={styles.directionRowSpace}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12]}>{ name.substr(0,20) }</Text>
                        <View style={[styles.directionRow]}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={rate}
                                fullStarColor={'#fec104'}
                                starSize={10}
                                starStyle={{ marginHorizontal: 2 }}
                            />
                        </View>
                    </View>
                    <View style={[styles.directionRow , styles.marginTop_5]}>
                        <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_13 , styles.text_mstarda , {marginRight:5}]} />
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_12, {lineHeight:20}]}>{ location }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    function renderNoData() {
        if (providers && (providers).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, {height:height-200}]}>
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
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ title } filteration={true} onNearProvider={onNearProvider} onFarProvider={onFarProvider} onRateProvider={onRateProvider} />

                <View style={[styles.Width_90,styles.SelfCenter , styles.marginBottom_20 , styles.marginTop_15 , {zIndex:-1}]}>
                    <Input style={[styles.inputSearch , styles.Width_100 , {flex:0}]}
                           placeholder={i18n.t('search')}
                           placeholderTextColor={'#fff'}
                           onChangeText={(search) => onSearchFilter(search)}
                           value={search}
                    />

                    <Image source={require("../../assets/images/search.png")} style={[styles.icon17, {position:'absolute' , right:15 , top:13}]} resizeMode={'cover'} />

                </View>

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20, {overflow:'hidden' , zIndex:-1}]}>

                    {
                        providers && (providers).length > 0?
                            <View style={[styles.marginTop_20]}>
                                <FlatList
                                    data={providers}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        id={item.id}
                                        name={item.name}
                                        image={item.avatar}
                                        location={item.address}
                                        rate={item.rate}
                                        index={index}
                                    />}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                            :
                            renderNoData()
                    }



                </View>

            </Content>
        </Container>
    );
}

export default Category;


