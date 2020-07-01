import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_CLEANER,
    CANCELLIKE_CLEANER,
    CANCELUNLIKE_CLEANER,
    UNLIKE_CLEANER,
    DELETE_CLEANER,
    MARK_NOTIFICATIONS_READ,
    RESERVE,
    CANCEL_RESERVE,
    ACCEPT,
    REJECT
} from '../types';

const initialState = {
    authenticated: false,
    loadingUser: false,
    credentials: {},
    likes: [],
    unlikes: [],
    notifications: [],
    reserve: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case DELETE_CLEANER:
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loadingUser: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loadingUser: true
            };
        case LIKE_CLEANER:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.customerName,
                        cleanerName: action.payload.cleanerName
                    }
                ]
            }
        case CANCELLIKE_CLEANER:
            return {
                ...state,
                likes: state.likes.filter((like) => like.cleanerName !== action.payload.cleanerName)
            }
        case UNLIKE_CLEANER:
            return {
                ...state,
                unlikes: [
                    ...state.unlikes,
                    {
                        userHandle: state.credentials.customerName,
                        cleanerName: action.payload.cleanerName
                    }
                ]
            }
        case CANCELUNLIKE_CLEANER:
            return {
                ...state,
                unlikes: state.likes.filter((unlike) => unlike.cleanerName !== action.payload.cleanerName)
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => (not.read = true));
            return {
                ...state
            }
        case ACCEPT:
        case REJECT:
        case RESERVE:
            return {
                ...state
            }
        case CANCEL_RESERVE:
            return {
                ...state,
                reserve: {}
            }
        default:
            return state;

    }
}