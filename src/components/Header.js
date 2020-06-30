import React from 'react'
import { black } from '../utils/colors';
const { Text, View, StyleSheet, Image } = require("react-native")

const Header = () => {

    return (
        <View style={styles.header}>
            <Image style={styles.image} source={require('../assets/cards.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: black,
        height: 160,
        width: '100%',
        borderBottomLeftRadius: 150,
        alignItems: 'center',

    },
    image: {
        height: 90,
        width: 90,
        marginTop: 20
    }
});
export default Header;