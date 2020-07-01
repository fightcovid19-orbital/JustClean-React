import {
    SET_CLEANERS,
    LIKE_CLEANER,
    CANCELLIKE_CLEANER,
    LOADING_DATA,
    UNLIKE_CLEANER,
    CANCELUNLIKE_CLEANER,
    SET_COMMENTS,
    SET_CLEANER,
    SET_HISTORIES,
    SET_RESERVATIONS,
    SET_EMPTY_DATA,
} from '../types'

const initialState = {
    cleaners: [],
    cleaner: {},
    comments: [],
    comment: {},
    reservations: [],
    histories: [],
    loadingData: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_EMPTY_DATA:
            return initialState;
        case LOADING_DATA:
            return {
                ...state,
                loadingData: true
            };
        case SET_CLEANERS:
            return {
                ...state,
                cleaners: action.payload,
                loadingData: false
            };
        case SET_CLEANER:
            return {
                ...state,
                cleaner: action.payload
            };
        case LIKE_CLEANER:
        case CANCELLIKE_CLEANER:
            let like_index = state.cleaners.findIndex((cleaner) => cleaner.cleanerName === action.payload.cleanerName);
            state.cleaners[like_index] = action.payload;
            if (state.cleaner.cleanerName === action.payload.cleanerName) {
                state.cleaner = action.payload;
            }
            return {
                ...state,
                loadingData: false
            };
        case UNLIKE_CLEANER:
        case CANCELUNLIKE_CLEANER:
            let unlike_index = state.cleaners.findIndex((cleaner) => cleaner.cleanerName === action.payload.cleanerName);
            state.cleaners[unlike_index] = action.payload;
            if (state.cleaner.cleanerName === action.payload.cleanerName) {
                state.cleaner = action.payload;
            }
            return {
                ...state,
                loadingData: false
            };
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loadingData: false
            };
        case SET_HISTORIES:
            return {
                ...state,
                histories: action.payload,
                loadingData: false
            };
        case SET_RESERVATIONS:
            return {
                ...state,
                reservations: action.payload,
                loadingData: false
            };
        default:
            return state;
    }
}