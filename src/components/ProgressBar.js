import React from 'react';
import { View, StyleSheet } from 'react-native';
import { green } from '../utils/colors';

export default function ProgressBar ({ width }) {
    return (
        <View style={styles.progress}>
            <View style={[styles.progressBar, { width: width}]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    progress: {
        marginTop: 10,
        borderColor: green,
        borderWidth: 1,
        borderRadius: 4,
        height: 10,
        width: '100%'
    },
    progressBar: {
        backgroundColor: green,
        flex: 1,
        borderRadius: 4,
    }
})
