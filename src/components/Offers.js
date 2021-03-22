import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Swiper from 'react-native-swiper';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";
import  Modal  from "react-native-modal";
import {useIsFocused} from "@react-navigation/native";
import {getOffers , getOfferProvider} from "../actions";
import Footer from "../common/Footer";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Offers({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const offers = useSelector(state => state.offers.offers);
    const offerProvider = useSelector(state => state.offers.offerProvider);
    const [screenLoader , setScreenLoader ] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getOffers(lang)).then(() => setScreenLoader(false))
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused])

    // function ItemOrder({ name , image , location , id , type , rate, index }) {
    //     return (
    //         <TouchableOpacity onPress={() => {navigation.navigate('categoryDetails', {id , type}) ; setShowModal(false)}} style={[styles.borderGray,styles.marginBottom_20 , styles.directionRow , styles.Radius_5 , {flex:1 , padding:10}]}>
    //             <Image source={{uri:image}} style={[styles.icon50 , styles.Radius_7]} resizeMode={'cover'} />
    //             <View style={[{marginLeft:15 , flex:1}]}>
    //                 <View style={styles.directionRowSpace}>
    //                     <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12]}>{ name.substr(0,20) }</Text>
    //                     <View style={[styles.directionRow]}>
    //                         <StarRating
    //                             disabled={false}
    //                             maxStars={5}
    //                             rating={rate}
    //                             fullStarColor={'#fec104'}
    //                             starSize={10}
    //                             starStyle={{ marginHorizontal: 2 }}
    //                         />
    //                     </View>
    //                 </View>
    //                 <View style={[styles.directionRow , styles.marginTop_5]}>
    //                     <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_13 , styles.text_mstarda , {marginRight:5}]} />
    //                     <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_12, {lineHeight:20}]}>{ location }</Text>
    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //     );
    // }


    function Item({ image , id , type, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('categoryDetails', {id , type})} style={[styles.Width_100 , styles.height_150 , styles.marginBottom_15]}>
                <Image source={{uri:image}} style={styles.swiperImg} resizeMode={'cover'}/>
            </TouchableOpacity>
        );
    }

    function toggleModal (id) {
        dispatch(getOfferProvider(lang , id)).then(() =>  setShowModal(true))
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

    function renderNoData() {
        if (offers && (offers).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100 , {height:height-200}]}>
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

                <Header navigation={navigation} title={ i18n.t('offers') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20, {overflow:'hidden'}]}>

                    <View style={[styles.marginTop_20]}>

                        {
                            offers && (offers).length > 0 ?
                                <FlatList
                                    data={offers}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        id={item.id}
                                        image={item.image}
                                        type={item.type}
                                        index={index}
                                    />}
                                    keyExtractor={item => item.id}
                                />
                                :
                                renderNoData()
                        }

                    </View>


                    {/*<Modal*/}
                    {/*    onBackdropPress                 ={() => setShowModal(false)}*/}
                    {/*    onBackButtonPress               = {() => setShowModal(false)}*/}
                    {/*    isVisible                       = {showModal}*/}
                    {/*    style                           = {styles.bgModel}*/}
                    {/*    avoidKeyboard                    = {true}*/}
                    {/*>*/}

                    {/*    <View style={[styles.bg_White, styles.overHidden, styles.Width_100, styles.flexCenter , {borderTopStartRadius:5 , borderTopEndRadius:5}]}>*/}

                    {/*        <View style={[styles.bg_gray , styles.paddingHorizontal_15 , styles.Width_100 , styles.paddingVertical_15 , styles.directionRowSpace]}>*/}
                    {/*            <Text style={[styles.textBold , styles.text_White , styles.textSize_15]}>{ i18n.t('declaredFamilies') }</Text>*/}
                    {/*            <TouchableOpacity onPress={() => setShowModal(false)}>*/}
                    {/*                <Icon type={'AntDesign'} name={'close'} style={[styles.textSize_20 , styles.text_White ]} />*/}
                    {/*            </TouchableOpacity>*/}
                    {/*        </View>*/}

                    {/*       <View style={[styles.Width_100 , styles.paddingHorizontal_15 , styles.marginTop_20]}>*/}

                    {/*           {*/}
                    {/*               offerProvider?*/}
                    {/*                   <FlatList*/}
                    {/*                       data={offerProvider}*/}
                    {/*                       horizontal={false}*/}
                    {/*                       showsVerticalScrollIndicator={false}*/}
                    {/*                       renderItem={({ item , index}) => <ItemOrder*/}
                    {/*                           id={item.id}*/}
                    {/*                           name={item.name}*/}
                    {/*                           image={item.avatar}*/}
                    {/*                           location={item.address}*/}
                    {/*                           type={item.type}*/}
                    {/*                           rate={item.rate}*/}
                    {/*                           index={index}*/}
                    {/*                       />}*/}
                    {/*                       keyExtractor={item => item.id}*/}
                    {/*                   />*/}
                    {/*                   :*/}
                    {/*                   null*/}
                    {/*           }*/}


                    {/*       </View>*/}

                    {/*    </View>*/}

                    {/*</Modal>*/}

                </View>

            </Content>
            <Footer navigation={navigation} activeTab={'offers'}/>
        </Container>
    );
}

export default Offers;


