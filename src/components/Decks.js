import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Deck from './Deck'
import { FlatList } from 'react-native-gesture-handler';
import Header from './Header';
import { connect } from 'react-redux';
import { getDecksAPi } from '../utils/api';
import { handleGetDecks } from '../actions';
import ShStyles from '../shared/styles';

class Decks extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleGetDecks())


    }


    renderDeck = ({ item, index }) => (
        <Deck id={item} index={index + 1} />
    )

    render() {
        const { decks } = this.props;
        const keys = Object.keys(decks);



        return (
            <View style={styles.container}>
                <Header />
                {
                    keys.length === 0
                        ? <View style={styles.boxEmpty}>
                            <Image style={styles.emptyData} source={require('../assets/emptyData.png')} />
                            <Text style={ShStyles.bold}>Data is Empty</Text>
                            <Text> You Can Add new Deck by Clicking on
                                <Text style={ShStyles.bold}> 'Add Deck!'</Text>
                            </Text>
                        </View>
                        : <View style={styles.containerDecks}>
                            <FlatList
                                contentInset={{ bottom: 140 }}
                                data={keys}
                                renderItem={this.renderDeck}
                                keyExtractor={key => key}
                            />
                        </View>
                }

            </View>
        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerDecks: {
        marginTop: -55
    },
    boxEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyData: {
        height: 200,
        width: 300
    },
    
});

const mapStateToProps = (state) => ({
    decks: state
})

export default connect(mapStateToProps)(Decks)

