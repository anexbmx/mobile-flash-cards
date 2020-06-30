import { AsyncStorage } from "react-native"
import { dataAsJson } from "./helpers"

const FLASH_CARD_STORAGE_KEY = 'FlashCard:mobile'

export const getDecksAPi =  () => AsyncStorage
    .getItem(FLASH_CARD_STORAGE_KEY)
    .then(dataAsJson)

export const getDeckAPI = (id) => AsyncStorage
    .getItem(FLASH_CARD_STORAGE_KEY)
    .then((data) => dataAsJson(data)[id])


export const saveDeckTitleAPI = (deck) => {
    AsyncStorage
    .mergeItem(FLASH_CARD_STORAGE_KEY,
        JSON.stringify( deck ))
}

export const addCardToDeck = (title, card) => AsyncStorage
    .getItem(FLASH_CARD_STORAGE_KEY)
    .then((result) => {
        const data = dataAsJson(result);
        const deck = data[title];
        
        deck.questions = [...deck.questions, card]
        AsyncStorage
            .setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(data))
    })

export const removeDeckAPI = (key) => AsyncStorage
    .getItem(FLASH_CARD_STORAGE_KEY)
    .then((result) => {
        const data = dataAsJson(result);
        delete data[key];
        AsyncStorage
            .setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(data))
    })

