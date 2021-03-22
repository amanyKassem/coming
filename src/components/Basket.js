import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getCart} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Basket({navigation,route}) {

    const [search, setSearch] = useState('');
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const cart = useSelector(state => state.cart.cart);
    const cartLoader = useSelector(state => state.cart.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getCart(lang))
    }
     useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , cartLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [cart]);

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
        if (cart && (cart).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100 , {height:height-200}]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }

    function Item({ name , image , location , id , index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('basketDetails' , {id})} style={[styles.borderGray,styles.marginBottom_20 , styles.directionRow , styles.Radius_5 , {flex:1 , padding:10}]}>
                <Image source={{uri:image}} style={[styles.icon50 , styles.Radius_7]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_10 , {flex:1}]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{ name }</Text>
                    <View style={[styles.directionRow , styles.marginTop_5]}>
                        <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, {lineHeight:20}]}>{ location }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('basket') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20, {overflow:'hidden'}]}>

                        {
                            cart && (cart).length > 0 ?
                                <View style={[styles.marginTop_20]}>
                                    <FlatList
                                        data={cart}
                                        horizontal={false}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({item, index}) => <Item
                                            id={item.id}
                                            name={item.name}
                                            image={item.avatar}
                                            location={item.address}
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

export default Basket;


