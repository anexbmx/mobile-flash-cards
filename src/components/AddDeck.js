import React from 'react'
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import { black, white } from '../utils/colors'
import Header from './Header'
import ShStyles from '../shared/styles'
import IconButton from './IconButton'
import { connect } from 'react-redux'
import { addDeck, handleAddDeck } from '../actions'
import { setUpNewDeck } from '../utils/helpers'

class AddDeck extends React.Component {

    state = {
        title: ''
    }
    createDeck = () => {
        const { title } = this.state;
        if (title.length === 0)
            return alert("title of new Deck not provided")

        const { dispatch, navigation } = this.props;
        dispatch(handleAddDeck(setUpNewDeck(title)));
        this.setState({ title: '' })
        navigation.navigate("deckDetail", { 
            id: title,
        });

    }

    onChangeText = (title) => {
        this.setState({ title });
    }

    render() {

        const { title } = this.state;
        return (
            <View style={styles.container}>
                <Header />
                <View style={[ShStyles.shadow, styles.box]}>
                    <Text style={styles.title}>Add Deck</Text>
                    <Text style={[ShStyles.secondaryText, styles.text]}>What is the title of Your New deck</Text>
                    <TextInput onChangeText={this.onChangeText} value={title} style={ShStyles.input} placeholder="name..." />
                    <IconButton onPress={this.createDeck} icon="check-circle" text="Create Deck" />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    box: {
        width: '80%',
        backgroundColor: white,
        borderRadius: 9,
        marginTop: -55,
        padding: 16,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 16,
    },
    text: {
        textAlign: 'center',
        letterSpacing: 3,
        marginBottom: 10,
        textTransform: 'capitalize'
    }

})


export default connect()(AddDeck);