import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../types';

const initialState = {
    loadingUI: false,
    errors: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_ERRORS:
            return {
                ...state,
                loadingUI: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loadingUI: false,
                errors: null
            };
        case LOADING_UI:
            return {
                ...state,
                loadingUI: true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loadingUI: false
            }
        default:
            return state;
    }
}
