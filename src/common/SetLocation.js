import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, I18nManager, ScrollView} from "react-native";
import {Container, Content, Icon, Input, Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header';
import COLORS from "../consts/colors";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios'
import  Modal  from "react-native-modal";
import {addPlace, editPlace} from '../actions';

const height            = Dimensions.get('window').height;
const isIOS             = Platform.OS === 'ios';
const latitudeDelta     = 0.922;
const longitudeDelta    = 0.521;

function SetLocation({navigation,route}) {
    const { edit } = route.params
    const {name, address, id } = route.params ?? null
    const [initMap, setInitMap]	            = useState(true);
    const lang                              = useSelector(state => state.lang.lang);
    const token                             = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    let mapRef 								= useRef(null);
    const [userLocation, setUserLocation]   = useState([{
        latitude: 0,
        longitude: 0
    }]);
    const [search, setSearch]   			= useState('');
    const [searchResult, setSearchResult]   = useState([]);
    const [selectedLocation, setLocation]   = useState(null);
    const [searchHeight, setSearchHeight]   = useState(70);
    const [locationName, setLocationName]   = useState('');
    const [showModal, setShowModal]         = useState(false);
    const dispatch                          = useDispatch();

    const fetchData = async () => {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            alert('Permission to access location was denied');
            setUserLocation({latitude:'24.774265', longitude:'46.738586'});
            setInitMap(false)
        }else{
            if (edit){
                const location = { latitude:route.params.latitude, longitude:route.params.longitude };
                setUserLocation(location);
                setLocationName(name)
                setSearch(address)
                mapRef.current.animateToRegion(
                    {
                        latitude:route.params.latitude,
                        longitude: route.params.longitude,
                        latitudeDelta: 0.422,
                        longitudeDelta: 0.121,
                    },
                    350
                );
            }else{
                const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
                setUserLocation({ latitude, longitude });

                setLocationName('')
                setSearch('')
                mapRef.current.animateToRegion(
                    {
                        latitude,
                        longitude ,
                        latitudeDelta: 0.422,
                        longitudeDelta: 0.121,
                    },
                    350);
            }
            setInitMap(false)
        }
    };

    useEffect(() => {
        fetchData()
    }, [route.params , route.params?.latitude]);


    function toggleModal () {
        setShowModal(!showModal);
    }


    async function _handleMapRegionChange(e){

        // searchRef.current.blur()

        let formattedItem = {
            latitude: e.latitude,
            longitude: e.longitude
        };

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += e.latitude + ',' + e.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        try {
            const { data } = await axios.get(getCity);
            formattedItem  = {
                latitude:   e.latitude,
                longitude:  e.longitude
            };

            setSearch(data.results[0].formatted_address)

        } catch (e) { console.log(e); }

        setLocation(formattedItem)
        setUserLocation(formattedItem)
        console.log(formattedItem , userLocation)
    }

    function setSelectedLocation(item) {
        const { geometry: { location } } = item;

        const formattedItem = {
            latitude	: 	location.lat,
            longitude	: 	location.lng
        };

        setSearchResult([]);
        setSearchHeight(60);
        setLocation(formattedItem);
        setUserLocation(formattedItem)
        mapRef.current.animateToRegion(
            {
                latitude: formattedItem.latitude,
                longitude: formattedItem.longitude,
                latitudeDelta: 0.422,
                longitudeDelta: 0.121,
            },
            350
        );
    }

    async function onSearch() {
        let endPoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
        endPoint    += search;
        endPoint    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' + lang;

        try {
            const { data } = await axios.get(endPoint);
            setSearchResult(data.results);
            setSearchHeight(270);

        } catch (e) {
            console.log(e);
        }
    }

    function saveLocation(){
        toggleModal()

        if (edit)
            dispatch(editPlace(lang, id, userLocation.latitude, userLocation.longitude,  search, locationName, token, navigation))
        else
            dispatch(addPlace(lang, userLocation.latitude, userLocation.longitude,  search, locationName, token, navigation))
    }

    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>
                <Header navigation={navigation} title={ i18n.t('home') } fromLoc={true}/>

                <View style={[styles.mapInputContainer]}>
                    <Icon type='Entypo' name='location-pin' style={{ color: COLORS.gray, fontSize: 20 }}/>
                    <Input style={[styles.mapInput]} placeholder={i18n.t('chooseLocation')} value={search} onChangeText={(search) => setSearch(search)} onSubmitEditing={() => onSearch()} />
                </View>

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100 , styles.marginTop_40 , {paddingBottom:35 , overflow:'hidden'}]}>

                    <View>

                        {
                            searchResult && searchResult.length > 0 ?
                                <View style={{ alignSelf: 'center', width: '86%', maxHeight: 200, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, overflow: 'hidden', position: 'absolute', zIndex: 2, top: 30, left: 30, minHeight: 60 }}>
                                    <TouchableOpacity style={{ position: 'absolute', zIndex: 3, right: -1, top: -1.5 }} onPress={() => setSearchResult([])}>
                                        <Icon type={'AntDesign'} name={'closecircle'} style={{ color: COLORS.blue }} />
                                    </TouchableOpacity>
                                    <View style={{ alignSelf: 'center', width: '100%', height: 220, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20, backgroundColor: '#fff', borderRadius: 10}}>
                                        <ScrollView style={{ zIndex: 99999999 }}>
                                            {
                                                searchResult.map((item, i) => (

                                                    <TouchableOpacity key={i} onPress={() => setSelectedLocation(item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', marginHorizontal: 10, width: '95%', height: 50, alignItems: 'center', alignSelf: 'center', overflow: 'hidden', zIndex: 9999 }}>
                                                        <Icon type={'Entypo'} name={'location'} style={{ marginHorizontal: 10, color: '#000', fontSize: 16 }}/>
                                                        <Text style={[ styles.text_gray, styles.textBold, styles._alignText, ]}>{ (item.formatted_address).substr(0, 40) + '...' }</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }

                                        </ScrollView>
                                    </View>
                                </View>
                                :
                                null
                        }

                        {
                            !initMap && (userLocation.latitude !== '' || null) ?
                                <MapView
                                    ref={mapRef}
                                    onRegionChangeComplete={(e) =>  _handleMapRegionChange(e)}
                                    style={{ width: '100%', height: '100%', zIndex: 0 }}
                                    initialRegion={{
                                        latitude:  userLocation.latitude,
                                        longitude: userLocation.longitude,
                                        latitudeDelta: 0.422,
                                        longitudeDelta: 0.121,
                                    }}
                                >
                                </MapView>
                                :
                                null
                        }

                        <View style={{ left: '50%', marginLeft: -24, marginTop: -48, position: 'absolute', top: '50%', zIndex: 9999999, width: 25, height: 25 }}>
                            <Image style={{width: 35, height: 35}} resizeMode={'contain'} source={require('../../assets/images/blue_circle.png')} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => toggleModal()} style={[styles.mstrdaBtn , styles.Width_90 , styles.marginBottom_10 , styles.marginTop_55, { position: 'absolute', zIndex: 10, alignSelf: 'center', bottom: 100 }]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('newLoc') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
            <Modal
                onBackdropPress                 ={toggleModal}
                onBackButtonPress               = {toggleModal}
                isVisible                       = {showModal}
                style                           = {styles.bgModel}
                avoidKeyboard                    = {true}
            >

                <View style={[styles.bg_White, styles.overHidden, styles.Width_100, {borderTopStartRadius:5 , borderTopEndRadius:5}]}>

                    <View style={[styles.bg_gray , styles.Width_100 , styles.paddingVertical_15 , styles.paddingHorizontal_20]}>
                        <Text style={[styles.textBold , styles.text_White , styles.textSize_15 , styles.alignStart]}>{ i18n.t('locationName') }</Text>
                    </View>

                    <View style={[styles.paddingHorizontal_20 , styles.paddingVertical_20]}>
                        <Item style={{ width: '100%', height: 60, borderBottomWidth: 0, alignItems: 'center', justifyContent:'center', flexDirection:'column' }}>
                            <Input style={[styles.input]} value={locationName} onChangeText={(locationName) => setLocationName(locationName)} />
                        </Item>

                        <TouchableOpacity onPress={() => saveLocation()} style={[styles.mstrdaBtn , styles.Width_90 , styles.marginBottom_10 , styles.marginTop_55, { alignSelf: 'center' }]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('save') }</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </Container>
    );
}

export default SetLocation;


