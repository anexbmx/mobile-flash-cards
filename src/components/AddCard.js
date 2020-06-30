import React from 'react'
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import { black, white, green } from '../utils/colors'
import Header from './Header'
import ShStyles from '../shared/styles'
import IconButton from './IconButton'
import { addNewCard, hanldeAddNewCard } from '../actions'
import { connect } from 'react-redux'

class AddCard extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    createCard = () => {
        const { dispatch, idDeck, goBack } = this.props;
        const { answer, question } = this.state;

        if (answer.length === 0 || question.length === 0)
            return alert("please! provide all the required info!")

        dispatch(hanldeAddNewCard(idDeck, this.state));
        this.setState({ question: '', answer: '' })
        goBack();
    }

    onChangeText = (key, text) => {
        this.setState({ [key]: text })
    }

    render() {
        const { question, answer } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <Header />
                        <View style={[ShStyles.shadow, styles.box]}>
                            <Text style={styles.title}>Add New Card</Text>
                            <Text style={[ShStyles.secondaryText, styles.text]}>What is the answer of this Question</Text>
                            <TextInput value={question} style={ShStyles.input}
                                placeholder="Question"

                                onChangeText={(text) => this.onChangeText('question', text)} />
                            <TextInput value={answer} style={ShStyles.input}
                                placeholder="Answer"
                                onChangeText={(text) => this.onChangeText('answer', text)} />
                            <IconButton onPress={this.createCard} icon="check-circle" text="Save" />
                        </View>
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        alignItems: 'center',
        justifyContent: 'flex-end',
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

const mapStateToProps = (state, { route, navigation }) => ({
    idDeck: route.params.id,
    goBack: () => navigation.goBack()
})
export default connect(mapStateToProps)(AddCard);