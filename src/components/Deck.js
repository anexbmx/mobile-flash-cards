import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gray, lightGray } from '../utils/colors';
import { demoData, formatDate, fromatDeck } from '../utils/helpers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';
import ShStyles from '../shared/styles'
import { connect } from 'react-redux';

const Deck = ({ deck }) => {
    
    const { title, cardText, date, index } = deck;
    const Navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => Navigation.dispatch(
                CommonActions.navigate("deckDetail", { 
                    id: deck.title,
                    index
                })
            )}
            style={styles.container}>
            <View style={styles.boxIndex}>
                <Text style={styles.index}>{index}</Text>
            </View>
            <View style={styles.content}>
                <View>
                    <Text style={styles.deckName}>{title}</Text>
                    <Text style={ShStyles.secondaryText}>{cardText}</Text>
                </View>
                <View >
                    <Text style={styles.numberCard}>{date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )


}


const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        flexDirection: 'row',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: lightGray,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 2,
    },
    boxIndex: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: lightGray,
        borderRadius: 10,
        marginRight: 16
    },
    index: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    deckName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
        textTransform: 'capitalize'
    },
    numberCard: {
        color: gray,
        marginTop: 5
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

const mapStateToProps = (state, { id, index }) => {
    return ({
        deck: fromatDeck(state[id], index)
    })
}

export default connect(mapStateToProps)(Deck)