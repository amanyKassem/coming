import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, ActivityIndicator, Dimensions, FlatList, I18nManager} from "react-native";
import {Container, Content, Icon, Accordion} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import COLORS from "../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {getQuestions} from '../actions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function FAQ({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const questions = useSelector(state => state.questions.questions)
    const loader = useSelector(state => state.questions.loader)

    const dispatch = useDispatch();

    function _renderHeader(item, expanded) {
        return (
            <View style={[
                styles.directionRowSpace , styles.marginBottom_10 , styles.paddingHorizontal_20 ,
                styles.paddingVertical_10 , styles.bg_light_gray
            ]}>
                <Text style={[styles.textRegular , styles.textSize_14]}>
                    {" "}{item.question}
                </Text>
                {expanded
                    ? <Icon style={[styles.textSize_13 , styles.text_mstarda]} name="caretup"  type={'AntDesign'} />
                    : <Icon style={[styles.textSize_13 , styles.text_midGray]} name="caretdown"  type={'AntDesign'} />}
            </View>
        );
    }
    function _renderContent(item) {
        return (
            <Text
                style={[styles.marginBottom_15 , styles.textRegular , styles.alignStart , styles.text_midGray]}
            >
                {item.answer}
            </Text>
        );
    }

    function fetchData(){
        dispatch(getQuestions(lang))
    }


    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , loader]);

    function renderLoader(){
        if (loader === false){
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

                <Header navigation={navigation} title={ i18n.t('faq') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20, {overflow:'hidden'}]}>

                    {
                        questions ?
                            <Accordion
                                dataArray={questions}
                                animation={true}
                                expanded={true}
                                renderHeader={_renderHeader}
                                renderContent={_renderContent}
                                style={{borderWidth:0 , width:'100%' , marginTop:25}}
                            />
                            :
                            null
                    }


                </View>

            </Content>
        </Container>
    );
}

export default FAQ;


