import React from 'react'
import { black, green, red } from '../utils/colors'
import { View, Text, StyleSheet, Image } from 'react-native'
import ShStyles from '../shared/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconButton from './IconButton'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { fromatDeck } from '../utils/helpers'
import { handleDeleteDeck } from '../actions'

class DeckDetail extends React.Component {

    componentDidMount() {

    }

    toRoute = (routeName) => {
        const { navigation, deck } = this.props;
        if (routeName === 'quiz' && deck.nbrCard === 0)
            return alert("Sorry you can not take a quiz. because there are no cards in the deck")
        navigation.navigate(routeName, {
            id: deck.title
        })
    }

    delete = () => {
        const { dispatch, goBack, deck } = this.props;
        dispatch(handleDeleteDeck(deck.title));
        goBack();
    }

    shouldComponentUpdate = (nextProps) => nextProps.deck

    render() {
        const { deck, navigation } = this.props;
        const { title, index, cardText, date } = deck;
        navigation.setOptions({ title })

        return (
            <View style={styles.container}>
                <View style={[styles.card, ShStyles.shadow]}>
                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={[styles.boxImage]}>
                            <Image style={styles.image} source={require('../assets/question.png')} />
                        </View>
                        <View style={[{ flex: 1 }]}>
                            <View>
                                <Text style={[ShStyles.secondaryText]}>Deck N° {index}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.deletBtn} onPress={this.delete}>
                                <MaterialCommunityIcons name="delete-forever-outline" size={30} color="white" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View>
                        <Text style={styles.title}>Detail </Text>
                        <Text style={{ marginTop: 5 }}>
                            This Deck contains
                            <Text style={ShStyles.bold}> {cardText} </Text> about
                            <Text style={ShStyles.bold}> "{title}" </Text> created at
                            <Text style={ShStyles.bold}> {date} </Text>.
                             are you ready to take it ?
                        </Text>
                    </View>
                    <View style={{ marginTop: 10, }}>
                        <IconButton onPress={() => this.toRoute('addNewCard')} icon="cards-outline" text="Add Card" />
                        <IconButton onPress={() => this.toRoute('quiz')} icon="play-box-outline" text="Start a Quiz" />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: black
    },
    card: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 16,
        borderRadius: 10,
    },

    title: {
        marginTop: 16,
        fontWeight: 'bold'
    },

    boxImage: {
        backgroundColor: green,
        height: 70,
        width: 70,
        marginRight: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 50,
        height: 50
    },
    deletBtn: {
        backgroundColor: red,
        borderRadius: 5,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state, { route, navigation }) => {
    const { id, index } = route.params;
    const deck = state[id];
    return {
        deck: deck ? fromatDeck(deck, index) : null,
        goBack: () => {
            navigation.goBack();
        }
    }
}

export default connect(mapStateToProps)(DeckDetail);