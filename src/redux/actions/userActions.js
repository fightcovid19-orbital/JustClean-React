import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getCustomerData()); // to get only customer data: lack for getting cleaner data for cleaner app interface
            dispatch({ type: CLEAR_ERRORS })
            history.push('/'); // redirect to home page
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        })
};

export const getCustomerData = () => dispatch => {
    axios.get('/customers')  // login and get customer data
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

export const signupUser = (newUserData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getCustomerData()); // to get only customer data: lack for getting cleaner data for cleaner app interface
            dispatch({ type: CLEAR_ERRORS })
            history.push('/'); // redirect to home page
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        })
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}