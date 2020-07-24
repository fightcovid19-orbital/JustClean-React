import {
    SET_CLEANER,
    SET_CLEANERS,
    LIKE_CLEANER,
    CANCELLIKE_CLEANER,
    UNLIKE_CLEANER,
    CANCELUNLIKE_CLEANER,
    LOADING_LIKE,
    STOP_LOADING_LIKE,
    SET_COMMENTS,
    SET_HISTORIES,
    SET_RESERVATIONS,
    RESERVE,
    CANCEL_RESERVE,
    ACCEPT,
    REJECT,
    DELETE_COMMENT,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_DATA,
    STOP_LOADING_UI,
    LOADING_UI,
    SET_CLEANER_DATA
} from '../types'
import axios from 'axios'
import { record } from './userActions'

// Get all cleaners
export const getCleaners = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/cleaners')
        .then(res => {
            dispatch({
                type: SET_CLEANERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_CLEANERS,
                payload: []
            })
        })
}

// get a cleaner detail for cleanerDialog
export const getCleaner = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/cleaner/${cleanerName}`)
        .then(res => {
            dispatch({
                type: SET_CLEANER,
                payload: res.data.user
            })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err))
}

// get a cleaner's comment for route in cleanerPage
export const getCleanerData = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    axios.get(`/cleaner/${cleanerName}`)
        .then(res => {
            dispatch({
                type: SET_CLEANER_DATA,
                payload: res.data
            })

        })
        .catch(() => {
            dispatch({
                type: SET_CLEANER_DATA,
                payload: null
            });
        });
}

export const setLoadingLikeFalse = () => (dispatch) => {
    dispatch({ type: STOP_LOADING_LIKE })
}

// like a cleaner
export const likeCleaner = (cleanerName, isUnlike) => (dispatch) => {
    dispatch({ type: LOADING_LIKE })
    if (isUnlike) {
        axios.get(`/cancelUnlike/${cleanerName}`)
            .then(res1 => {
                dispatch({
                    type: CANCELUNLIKE_CLEANER,
                    payload: res1.data
                })
                axios.get(`/like/${cleanerName}`)
                    .then(res2 => {
                        dispatch({
                            type: LIKE_CLEANER,
                            payload: res2.data
                        })
                        dispatch(setLoadingLikeFalse())
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    } else {
        axios.get(`/like/${cleanerName}`)
            .then(res => {
                dispatch({
                    type: LIKE_CLEANER,
                    payload: res.data
                })
                dispatch(setLoadingLikeFalse())
            })
            .catch(err => console.log(err))
    }

}

// cancel like a cleaner
export const cancelLikeCleaner = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_LIKE })
    axios.get(`/cancelLike/${cleanerName}`)
        .then(res => {
            dispatch({
                type: CANCELLIKE_CLEANER,
                payload: res.data
            })
            dispatch(setLoadingLikeFalse())
        })
        .catch(err => console.log(err))
}

// unlike a cleaner
export const unlikeCleaner = (cleanerName, isLike) => (dispatch) => {
    dispatch({ type: LOADING_LIKE })
    if (isLike) {
        axios.get(`/cancelLike/${cleanerName}`)
            .then(res1 => {
                dispatch({
                    type: CANCELLIKE_CLEANER,
                    payload: res1.data
                })
                axios.get(`/unlike/${cleanerName}`)
                    .then(res2 => {
                        dispatch({
                            type: UNLIKE_CLEANER,
                            payload: res2.data
                        })
                        dispatch(setLoadingLikeFalse())
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    } else {
        axios.get(`/unlike/${cleanerName}`)
            .then(res => {
                dispatch({
                    type: UNLIKE_CLEANER,
                    payload: res.data
                })
                dispatch(setLoadingLikeFalse())
            })
            .catch(err => console.log(err))
    }
}

// cancel unlike a cleaner
export const cancelUnlikeCleaner = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_LIKE })
    axios.get(`/cancelUnlike/${cleanerName}`)
        .then(res => {
            dispatch({
                type: CANCELUNLIKE_CLEANER,
                payload: res.data
            })
            dispatch(setLoadingLikeFalse())
        })
        .catch(err => console.log(err))
}

// submit a comment
export const submitComment = (cleanerName, commentData) => (dispatch) => {
    axios.post(`/comment/${cleanerName}`, commentData)
        .then(res => {
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// get all the comments for one cleaner
export const getComments = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/comments/${cleanerName}`)
        .then(res => {
            dispatch({
                type: SET_COMMENTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_COMMENTS,
                payload: []
            })
        })
}

// Clear all errors in redux state UI
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

// Get histories for Customers
export const getHistories = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/histories')
        .then(res => {
            dispatch({
                type: SET_HISTORIES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_HISTORIES,
                payload: []
            })
        })
}

// Get reservations for Cleaners
export const getReservations = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/reserves')
        .then(res => {
            dispatch({
                type: SET_RESERVATIONS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_RESERVATIONS,
                payload: []
            })
        })
}

// Handle reservation when customer want to reserve a cleaner
export const reserve = (cleanerName) => (dispatch) => {
    axios.get(`/reserve/${cleanerName}`)
        .then(res => {
            dispatch({
                type: RESERVE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// cancel Reserve
export const cancelReserve = (customerName) => (dispatch) => {
    axios.delete(`/custReserve/${customerName}`)
        .then(res => {
            dispatch({
                type: CANCEL_RESERVE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// Accept a customer's reservation by Cleaner
export const accept = (customerName) => (dispatch) => {
    axios.get(`/history/${customerName}`)
        .then(res => {
            dispatch(record(customerName));
            dispatch(reject(customerName));
            dispatch({
                type: ACCEPT,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// Reject a customer's reservation by Cleaner
export const reject = (customerName) => (dispatch) => {
    axios.delete(`/cleanerReserve/${customerName}`)
        .then(res => {
            dispatch({
                type: REJECT,
                payload: customerName
            })
        })
        .catch(err => console.log(err))
}

export const deleteComment = (commentId) => (dispatch) => {
    axios.delete(`/comment/${commentId}`)
        .then(() => {
            dispatch({
                type: DELETE_COMMENT,
                payload: commentId
            })
        })
        .catch(err => console.log(err));
}

// (Only) customer create chat with a cleaner
export const createChat = (friend) => dispatch => {
    axios.get(`/chat/new/cleaner/${friend}`)
        .then(() => {
            console.log('new chat created!')
        })
        .catch((err) => {
            console.log(err)
        })
}

// Customer send message to a cleaner at the same time update redux 
export const sendMessageToCleaner = (friend, chatText) => (dispatch) => {
    axios.post(`/chat/cleaner/${friend}`, chatText.txt)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
}

// Cleaner send message to a customer at the same time update redux 
export const sendMessageToCustomer = (friend, chatText) => (dispatch) => {
    axios.post(`/chat/customer/${friend}`, chatText.txt)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
}

export const editComment = (commentId, commentBody, cleanerName) => (dispatch) => {
    axios.post(`/comment/edit/${commentId}`, commentBody)
        .then(() => {
            dispatch(getComments(cleanerName));
        })
        .catch(err => console.log(err));
}