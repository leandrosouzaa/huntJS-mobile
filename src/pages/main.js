import React, {Component} from 'react';
import api from '../services/api'

import {View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

export default class Main extends Component {
    static navigationOptions = {
        title: 'JSHunt',
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            textAlignVertical: 'center'
        }
    };

    state = {
        products: [],
        productInfo:{},
        page: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        console.log('carregando pela primeira vez')
        const response = await api.get(`/products?page=${page}`);
        const {docs, ...productInfo} = response.data
        this.setState({products:[...this.state.products, ...docs], productInfo, page})
        console.log(this.state.products)
    };

    loadMore = () => {
        console.log('Carregando mais')
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    renderItem = ({item}) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity 
                style={styles.productButton} 
                onPress={() => {
                    this.props.navigation.navigate('Product', {product: item});
                }}
            >
                <Text style ={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>

        </View>
    )

    render() {
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='#006999'/>
                <FlatList
                contentContainerStyle={styles.list}
                    data = {this.state.products}
                    keyExtractor = {item => item._id}
                    renderItem  = {this.renderItem}
                    onEndReached = {this.loadMore}
                    onEndReachedThreshold = {0.1}
                />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#fafafa',
        flex: 1,
    },
    list : {
        padding:20,
    },
    productContainer: {
        backgroundColor:'#FFF',
        borderWidth:1,
        borderColor:'#DDD',
        borderRadius:5,
        padding:20,
        marginBottom:20,
    },
    productTitle:{
        fontSize:28,
        fontWeight:'bold',
        color:'#333',
    },
    productDescription: { 
        fontSize:16,
        color:'#999',
        marginTop:5,
        lineHeight:24,
    },
    productButton : {
        height:42,
        borderRadius:5,
        borderWidth:2,
        borderColor:'#006999',
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    
    productButtonText : {
        fontSize:16,
        color:'#006999',
        fontWeight:'bold'
    }
});