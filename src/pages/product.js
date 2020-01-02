import React, {Component} from 'react';

import { WebView } from 'react-native-webview';
import {View, Text, Web} from 'react-native'

const Product = ({ navigation }) => {
    console.log(navigation);
    return <WebView
    source={{ uri: navigation.state.params.product.url }}
  />
};

Product.navigationOptions = ({navigation}) => ({
    title:navigation.state.params.product.title,
    headerTitleStyle: {
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
});

export default Product;