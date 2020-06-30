import { saveDeckTitleAPI, getDecksAPi, removeDeckAPI, addCardToDeck } from "../utils/api";

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';

export const getDecks = (decks) => ({
    type: GET_DECKS,
    decks
})

export const addDeck = (deck) => ({
    type: ADD_DECK,
    deck
})

export const deleteDeck = (id) => ({
    type: DELETE_DECK,
    id
})

export const addNewCard = (idDeck, card) => ({
    type: ADD_NEW_CARD,
    idDeck,
    card
})

export const handleAddDeck = (deck) => (dispatch) => {
    dispatch(addDeck(deck));
    saveDeckTitleAPI(deck);
}

export const handleGetDecks = () => (dispatch) => {
    getDecksAPi()
        .then((decks) => {
            dispatch(getDecks(decks))
        })
       
}

export const handleDeleteDeck = (id) => (dispatch) => {
    dispatch(deleteDeck(id));
    removeDeckAPI(id)   
}

export const hanldeAddNewCard = (title, card) => dispatch => {
    dispatch(addNewCard(title, card));
    addCardToDeck(title, card);
}