import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Switch, ScrollView, Dimensions } from "react-native";
import { Container, Content, Form, Input, } from 'native-base'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import MapView from 'react-native-maps';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import { useDispatch, useSelector } from "react-redux";
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";

const latitudeDelta = 0.922;
const longitudeDelta = 0.521;
const isIOS      = Platform.OS === 'ios';
const { width }  = Dimensions.get('window')
const { height } = Dimensions.get('window')

function GetLocation({ navigation, route }) {
    // const token = useSelector(state => state.Auth.user ?state.Auth.user.data.token : null)
    let pathName = route.params ? route.params.pathName : null;

    let mapRef                      = useRef(null);
    const [city, setCity]           = useState('');
    const [mapRegion, setMapRegion] = useState({
        latitude: '',
        longitude: '',
        latitudeDelta,
        longitudeDelta
    });

    const [initMap, setInitMap] = useState(true);
    const [showAddress, setShowAddress] = useState(false);

    const fetchData = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        } else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});

            if (route.params && route.params.latitude){
                userLocation = { latitude: route.params.latitude, longitude:route.params.longitude , latitudeDelta , longitudeDelta};
            } else {
                userLocation = { latitude, longitude , latitudeDelta , longitudeDelta};
            }

            setInitMap(false);
            setMapRegion(userLocation);
            isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;
        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += userLocation.latitude + ',' + userLocation.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        console.log("getCity  ", getCity)
        // ReactotronConfig.log(getCity);
        try {
            const { data } = await axios.get(getCity);
            setCity(data.results[0].formatted_address)
            // console.log("city  " , data.results[0].formatted_address)
            // console.log("city  " , city)
        } catch (e) {
            console.log(e);
        }
    };
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData();
    }, [route.params]);



    const _handleMapRegionChange = async (mapCoordinate) => {
        setShowAddress(true)
        setMapRegion({ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude, latitudeDelta, longitudeDelta });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapCoordinate.latitude + ',' + mapCoordinate.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        console.log('locations data', getCity);

        try {
            const { data } = await axios.get(getCity);
            setCity(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
    };

    function getLoc() {
        console.log("mapRegion button", mapRegion);
        console.log("city3 ", city);

        navigation.navigate(pathName, { cityName: city, mapRegion, pathName: 'getLoc' })


    }

    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ pathName === 'orderDetails' ? i18n.t('seeLocation') : i18n.t('selectUrLoc')} />

                <View style={{ flex: 1 , height : height-80, width: '100%'}}>
                    {
                        !initMap && mapRegion.latitude != null ? (
                            <MapView
                                ref={mapRef}
                                style={{ width: '100%', height: '100%', flex: 1 }}
                                initialRegion={mapRegion}>
                                <MapView.Marker
                                    draggable={pathName !==  'orderDetails'}
                                    coordinate={mapRegion}
                                    onDragEnd={(e) => _handleMapRegionChange(e.nativeEvent.coordinate)}
                                >
                                    <Image source={require('../../assets/images/blue_circle.png')} resizeMode={'contain'} style={{ width: 35, height: 35 }} />
                                </MapView.Marker>
                            </MapView>
                        ) : (<View />)
                    }

                    {
                        pathName !== 'orderDetails'?

                            <View style={[{ position: 'absolute', bottom: 70, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }]}>

                                <TouchableOpacity onPress={() => getLoc()} style={[styles.mstrdaBtn , styles.SelfCenter , styles.Width_80 ]}>
                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('select') }</Text>
                                </TouchableOpacity>

                            </View>

                            :
                            null

                    }


                </View>
            </Content>
        </Container>
    );
}

export default GetLocation;


