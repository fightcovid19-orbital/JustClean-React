import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    DELETE_CLEANER,
    MARK_NOTIFICATIONS_READ
} from '../types';
import axios from 'axios';
import { getCleaners, getHistories } from './dataActions'

export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            if (userData.type === 'customer') {
                dispatch(getCustomerData()); // after customer login, get all cleaners
                dispatch(getCleaners());
                dispatch(getHistories());
            } else {
                dispatch(getCleanerData()) // after cleaner login, get all comments handled by home.js

            }
            dispatch({ type: CLEAR_ERRORS })
            history.push('/'); // redirect to home page
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getCleanerData = () => dispatch => {
    dispatch({ type: LOADING_USER })
    axios.get('/cleaner')  // login and get cleaner data for cleaner user credentials
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};
export const getCustomerData = () => dispatch => {
    dispatch({ type: LOADING_USER })
    axios.get('/customer')  // login and get customer data for customer user credentials
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            if (newUserData.type === 'customer') {
                dispatch(getCustomerData()); // after customer login, get all cleaners
                dispatch(getCleaners())
            } else {
                dispatch(getCleanerData()) // after cleaner login, get all comments handled by home.js
            }
            dispatch({ type: CLEAR_ERRORS })
            history.push('/'); // redirect to home page
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    window.location.href = '/login';
    localStorage.removeItem('FBIdToken');
    localStorage.removeItem('state');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const uploadCustomerImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/customer/image', formData)
        .then(() => {
            dispatch(getCustomerData())
        })
        .catch(err => console.log(err))
};

export const uploadCleanerImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/cleaner/image', formData)
        .then(() => {
            dispatch(getCleanerData())
        })
        .catch(err => console.log(err))
};

// for profile site 
export const editCustomerDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/customer', userDetails)
        .then(() => {
            dispatch(getCustomerData());
        })
        .catch(err => console.log(err));
}

export const editCleanerDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/cleaner', userDetails)
        .then(() => {
            dispatch(getCleanerData());
        })
        .catch(err => console.log(err));
}

export const deleteCleaner = () => dispatch => {
    axios.delete('/deleteCleaner')
        .then(() => {
            dispatch({ type: DELETE_CLEANER })
        })
        .catch(err => console.log(err));
}

export const markNotificationsRead = notificationIds => dispatch => {
    axios.post('/notifications', notificationIds)
        .then(res => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch(err => console.log(err));
}