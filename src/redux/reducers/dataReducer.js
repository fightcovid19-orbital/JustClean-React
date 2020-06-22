import { SET_CLEANERS, LIKE_CLEANER, CANCELLIKE_CLEANER, LOADING_DATA, SET_COMMENTS } from '../types'

const initialState = {
    cleaners: [],
    cleaner: {},
    comments: [],
    comment: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_CLEANERS:
            return {
                ...state,
                cleaners: action.payload,
                loading: false
            };
        case LIKE_CLEANER:
        case CANCELLIKE_CLEANER:
            let index = state.cleaners.findIndex((cleaner) => cleaner.cleanerName === action.payload.cleanerName);
            state.cleaners[index] = action.payload;
            // if (state.cleaner.cleanerName === action.payload.cleanerName) {
            //     state.cleaner = action.payload;
            // }
            return {
                ...state
            };
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false
            };
        default:
            return state;
    }
}