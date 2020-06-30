import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, View } from 'react-native';
import { green, white, black, blue } from '../utils/colors';
import ShStyles from '../shared/styles'

export default function IconButton({ onPress, icon, text, backgroundColor = black, color = green }) {
    return (
        <TouchableOpacity style={[styles.btn, ShStyles.shadow, { backgroundColor }]} onPress={onPress}>
            <MaterialCommunityIcons style={styles.icon} name={icon} size={24} color={color} />
            <View style={[styles.divider, { backgroundColor: color }]}></View>
            <Text style={[styles.text, { color }]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        padding: 8,
        borderRadius: 9,
        alignItems: 'center',
        marginTop: 10,
        minWidth: 150,
    },

    text: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        fontSize: 16
    },
    divider: {
        height: 20,
        width: 2,
        marginLeft: 10,
        marginRight: 10,
    }
})