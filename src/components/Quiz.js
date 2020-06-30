import React from 'react'
import ShStyles from '../shared/styles'
import { black, white, gray, greenFlat, red } from '../utils/colors'
import { View, Text, StyleSheet } from 'react-native'
import ProgressBar from './ProgressBar'
import IconButton from './IconButton'
import { connect } from 'react-redux'
import { getPercent, formatQuiz, clearLocalNotification, setLocalNotification } from '../utils/helpers'


class Quiz extends React.Component {
    state = {
        showAnswer: false,
        nbrCorrectAnswer: 0,
        score: 0,
        currentCard: 0,
        isComplte: false,
    }


    toggleAnswer = () => {
        this.setState((prev) => ({
            showAnswer: !prev.showAnswer
        }))
    }



    setAnswer = (value) => {
        let { currentCard, nbrCorrectAnswer } = this.state;
        let { deck } = this.props;
        let { nbrCards } = deck;

        currentCard += 1;
        nbrCorrectAnswer = value ? nbrCorrectAnswer + 1 : nbrCorrectAnswer;

        if (currentCard >= nbrCards) {
            this.setState({
                isComplte: true,
                nbrCorrectAnswer: nbrCorrectAnswer,
                score: getPercent(nbrCorrectAnswer, nbrCards)
            })

            return clearLocalNotification()
                .then(setLocalNotification)
        }

        this.setState({
            ...this.state,
            currentCard,
            nbrCorrectAnswer
        })



    }

    restartQuiz = () => {
        this.setState({
            showAnswer: false,
            nbrCorrectAnswer: 0,
            score: 0,
            currentCard: 0,
            isComplte: false
        })
    }

    goBack = () => this.props.goBack();

    render() {
        const { showAnswer, currentCard, isComplte, nbrCorrectAnswer, score } = this.state;
        const { deck } = this.props;
        const { questions, nbrCards } = deck;
        const card = questions[currentCard]


        if (isComplte) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Quiz Complete</Text>
                    <Text style={styles.result}>you got {nbrCorrectAnswer} out of {nbrCards} correct</Text>
                    <ProgressBar width={getPercent(nbrCorrectAnswer, nbrCards)} />
                    <Text style={styles.textScore}>Your Score</Text>
                    <Text style={styles.valueScore}>{score}</Text>
                    <View>
                        <IconButton onPress={() => { this.restartQuiz() }}
                            icon="repeat"
                            text="Restart Quiz"
                            backgroundColor={white}
                            color={greenFlat} />
                        <IconButton onPress={() => { this.goBack() }}
                            icon="keyboard-backspace"
                            text="Back to Deck"
                            backgroundColor={greenFlat}
                            color={white} />
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>

                <Text style={styles.title}>Question {currentCard + 1}
                    <Text style={styles.textSecondary}> / {nbrCards}</Text>
                </Text>
                <Text style={styles.nonAnswerd}>{nbrCards - (currentCard + 1)} Question Remaining</Text>
                <ProgressBar width={getPercent(currentCard + 1, nbrCards)} />
                <View style={[ShStyles.shadow, styles.question]}>
                    <Text style={styles.questionText}>{card.question}</Text>

                    {
                        showAnswer && <View style={styles.answer}>
                            <Text style={styles.answerText}>{card.answer}</Text>
                        </View>
                    }
                    <IconButton onPress={this.toggleAnswer}
                        icon={showAnswer ? 'eye-off-outline' : 'eye-outline'}
                        text={showAnswer ? 'Hide Answer' : 'Show Answer'} />
                </View>
                <View style={styles.groupBtn}>
                    <IconButton onPress={() => { this.setAnswer(true) }}
                        icon="check-bold"
                        text="Correct"
                        backgroundColor={greenFlat}
                        color={white} />
                    <IconButton onPress={() => { this.setAnswer(false) }}
                        backgroundColor={red}
                        icon="close"
                        color={white}
                        text="InCorrect" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        padding: 16
    },
    title: {
        fontWeight: 'bold',
        color: white,
        fontSize: 30
    },
    textSecondary: {
        fontWeight: 'normal',
        fontSize: 24,
        color: gray
    },
    question: {
        marginTop: 30,
        backgroundColor: white,
        borderRadius: 8,
        padding: 16
    },
    questionText: {
        fontWeight: 'bold',
        color: black,
        fontSize: 25
    },
    answer: {
        backgroundColor: greenFlat,
        padding: 16,
        borderRadius: 8,
        color: white,
        marginTop: 20
    },
    answerText: {
        color: white,
        fontSize: 20,
        textAlign: 'center'
    },
    groupBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    textScore: {
        color: white,
        textAlign: 'center',
        marginTop: 30,
        fontSize: 25,
        fontWeight: 'bold'
    },
    valueScore: {
        color: greenFlat,
        textAlign: 'center',
        marginTop: 30,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30
    },
    result: {
        textAlign: 'center',
        color: gray,
        marginTop: 30
    },
    nonAnswerd: {
        color: white,
        textAlign: 'right',
        fontWeight: "bold"
    }
})

const mapStateToProps = (state, { route, navigation }) => ({
    deck: formatQuiz(state[route.params.id]),
    goBack: () => navigation.goBack()
})
export default connect(mapStateToProps)(Quiz);