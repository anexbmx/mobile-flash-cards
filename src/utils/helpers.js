import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = "NOTIFICATION:FLASH_CARDS";


export const demoData = {
    react: {
        title: 'React',
        timestamp: Date.now() - (1000 * 60 * 60 * 24) * 2,
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        timestamp: Date.now() - 2000,
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    Angular: {
        title: 'Angular',
        timestamp: Date.now() - (1000 * 60 * 60 * 24) * 3,
        questions: [
            {
                question: 'What is Angular?',
                answer: 'is a framework to build single page application'
            },
            {
                question: 'What is Angular?',
                answer: 'is a framework to build single page application'
            },
            {
                question: 'What is Angular?',
                answer: 'is a framework to build single page application'
            },
        ]
    },

}


export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString(undefined,
        {
            weekday: 'short',
            year: 'numeric',
            day: '2-digit'
        })
}

export const setUpNewDeck = (title) => ({
    [title]: {
        title,
        timestamp: Date.now(),
        questions: [],
    }
})

export const fromatDeck = ({ title, timestamp, questions }, index = "?") => {
    const nbrCard = questions.length;
    return {
        index,
        title,
        date: formatDate(timestamp),
        cardText: nbrCard > 1
            ? questions.length + ' Cards'
            : nbrCard + ' Card',
        nbrCard,

    }
}

export const formatQuiz = ({ title, questions }) => ({
    title,
    nbrCards: questions.length,
    questions
})

export const dataAsJson = (data) => JSON.parse(data)

export const getPercent = (value, total) => {
    return Math.round(((value) / total) * 100) + '%'
}


export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}




function createNotification() {
    return {
        title: '⏰ Quiz Time',
        body: `👋 Don't forget to take a quiz today! 💪"`,
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}


