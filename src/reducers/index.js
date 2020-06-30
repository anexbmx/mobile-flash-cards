import { GET_DECKS, ADD_DECK, DELETE_DECK, ADD_NEW_CARD } from '../actions'
const decks = (state = {}, action) => {
    switch (action.type) {
        case GET_DECKS:

            return {
                ...state,
                ...action.decks
            }

        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }

        case DELETE_DECK:
            const decks = { ...state }
            delete decks[action.id]
            return decks;

        case ADD_NEW_CARD:
            const { idDeck, card} = action;
            const deck = state[idDeck];
            return {
                ...state,
                [idDeck]: {
                    ...deck,
                    questions: [...deck.questions, card]
                }
            };

        default:
            return state;
    }
}

export default decks