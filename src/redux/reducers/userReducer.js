import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_CLEANER,
    CANCELLIKE_CLEANER,
    CANCELUNLIKE_CLEANER,
    UNLIKE_CLEANER,
    LOADING_LIKE,
    STOP_LOADING_LIKE,
    DELETE_CLEANER,
    MARK_NOTIFICATIONS_READ,
    RESERVE,
    CANCEL_RESERVE,
    RECORD,
    DELETE_RECORD,
    MARK_CHAT_NOTIFICATIONS_READ,
    STOP_LOADING_USER
} from '../types';

const initialState = {
    authenticated: false,
    loadingUser: false,
    loadingLike: false,
    credentials: {},
    likes: [],
    unlikes: [],
    notifications: [],
    reserve: {},
    chatNotifications: [],
    records: []
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
        case LOADING_LIKE:
            return {
                ...state,
                loadingLike: true
            };
        case STOP_LOADING_LIKE:
            return {
                ...state,
                loadingLike: false
            }
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
                unlikes: state.unlikes.filter((unlike) => unlike.cleanerName !== action.payload.cleanerName)
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => (not.read = true));
            return {
                ...state
            }
        case MARK_CHAT_NOTIFICATIONS_READ:
            state.chatNotifications.forEach(not => (not.read = true));
            return {
                ...state
            }
        case RESERVE:
            return {
                ...state,
                reserve: action.payload
            }
        case CANCEL_RESERVE:
            return {
                ...state,
                reserve: {}
            }
        case STOP_LOADING_USER:
            return {
                ...state,
                loadingUser: false
            }
        case RECORD:
            return {
                ...state,
                records: [
                    ...state.records,
                    {
                        cleanerName: state.credentials.cleanerName,
                        customerName: action.payload.customerName,
                        customerImage: action.payload.customerImage,
                        customerLocation: action.payload.customerLocation
                    }
                ]
            }
        case DELETE_RECORD:
            return {
                ...state,
                records: state.records.filter(record => (
                    record.customerName !== action.payload.customerName
                    && record.cleanerName !== state.credentials.cleanerName))
            }
        default:
            return state;

    }
}