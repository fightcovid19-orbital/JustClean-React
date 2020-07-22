import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    DELETE_CLEANER,
    MARK_NOTIFICATIONS_READ,
    SET_EMPTY_DATA,
    MARK_CHAT_NOTIFICATIONS_READ,
} from '../types';
import axios from 'axios';
import { getCleaners, getHistories, getReservations, getComments } from './dataActions'

// login a user either customer or cleaner
export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            if (userData.type === 'customer') {
                dispatch(getCustomerData());
                dispatch(getCleaners());
                dispatch(getHistories());
            } else {
                dispatch(getCleanerData());
                dispatch(getReservations());
            }
            dispatch({ type: CLEAR_ERRORS })
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// login and get cleaner data for cleaner user credentials and then get all the comments on this cleaner
export const getCleanerData = () => dispatch => {
    dispatch({ type: LOADING_USER })
    axios.get('/cleaner')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
            dispatch(getComments(res.data.credentials.cleanerName));
        })
        .catch(err => console.log(err));
};

// login and get customer data for customer user credentials
export const getCustomerData = () => dispatch => {
    dispatch({ type: LOADING_USER })
    axios.get('/customer')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

// sign up a user either customer or cleaner
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            if (newUserData.type === 'customer') {
                dispatch(getCustomerData());
                dispatch(getCleaners())
            } else {
                dispatch(getCleanerData())
            }
            dispatch({ type: CLEAR_ERRORS })
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// logout a user 
// initialize redux state 
export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    window.location.href = '/login';
    localStorage.removeItem('FBIdToken');
    localStorage.removeItem('state');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
    dispatch({ type: SET_EMPTY_DATA })
}

// set authorization header using Firebase token after successfully login
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

// upload a customer's profile image 
export const uploadCustomerImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/customer/image', formData)
        .then(() => {
            dispatch(getCustomerData())
        })
        .catch(err => console.log(err))
};

// upload a cleaner's profile image 
export const uploadCleanerImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/cleaner/image', formData)
        .then(() => {
            dispatch(getCleanerData())
        })
        .catch(err => console.log(err))
};

// edit customer user details
export const editCustomerDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/customer', userDetails)
        .then(() => {
            dispatch(getCustomerData());
        })
        .catch(err => console.log(err));
}

// edit cleaner user details
export const editCleanerDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/cleaner', userDetails)
        .then(() => {
            dispatch(getCleanerData());
        })
        .catch(err => console.log(err));
}

// delete cleaner self account
export const deleteCleaner = () => dispatch => {
    axios.delete('/deleteCleaner')
        .then(() => {
            dispatch({ type: DELETE_CLEANER })
        })
        .catch(err => console.log(err));
}

// mark notification read for cleaners profiile 
export const markNotificationsRead = (type, notificationIds) => dispatch => {
    if (type === 'cleaner') {
        axios.post('/cleanerNotifications', notificationIds)
            .then(res => {
                dispatch({
                    type: MARK_NOTIFICATIONS_READ
                })
            })
            .catch(err => console.log(err));
    } else {
        axios.post('/custNotifications', notificationIds)
            .then(res => {
                dispatch({
                    type: MARK_NOTIFICATIONS_READ
                })
            })
            .catch(err => console.log(err));
    }
}

export const markChatNotificationsRead = (type, chatNotificationIds) => dispatch => {
    if (type === 'cleaner') {
        axios.post('/cleanerChatNotifications', chatNotificationIds)
            .then(res => {
                dispatch({
                    type: MARK_CHAT_NOTIFICATIONS_READ
                })
            })
            .catch(err => console.log(err));
    } else {
        axios.post('/custChatNotifications', chatNotificationIds)
            .then(res => {
                dispatch({
                    type: MARK_CHAT_NOTIFICATIONS_READ
                })
            })
            .catch(err => console.log(err));
    }
}