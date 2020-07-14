import {
    SET_CLEANER,
    SET_CLEANERS,
    LIKE_CLEANER,
    CANCELLIKE_CLEANER,
    UNLIKE_CLEANER,
    CANCELUNLIKE_CLEANER,
    SET_COMMENTS,
    SUBMIT_COMMENT,
    SET_HISTORIES,
    SET_RESERVATIONS,
    RESERVE,
    CANCEL_RESERVE,
    ACCEPT,
    REJECT,
    SET_RECORDS,
    RECORD,
    DELETE_RECORD,
    DELETE_COMMENT,
    //
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_DATA,
    STOP_LOADING_UI,
    LOADING_UI,
    SET_CHAT_MESSAGES,
    CLEAR_CHATS, 
    SEND_MESSAGE
} from '../types'
import { getCustomerData } from './userActions'
import axios from 'axios'

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
                type: SET_COMMENTS,
                payload: res.data.comments
            });
        })
        .catch(() => {
            dispatch({
                type: SET_COMMENTS,
                payload: null
            });
        });
}

// like a cleaner
export const likeCleaner = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/like/${cleanerName}`)
        .then(res => {
            dispatch(getCustomerData()) // to refresh 
            dispatch(getCleaners())
            dispatch({
                type: LIKE_CLEANER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// cancel like a cleaner
export const cancelLikeCleaner = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/cancelLike/${cleanerName}`)
        .then(res => {
            dispatch(getCustomerData())
            dispatch(getCleaners())
            dispatch({
                type: CANCELLIKE_CLEANER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// unlike a cleaner
export const unlikeCleaner = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/unlike/${cleanerName}`)
        .then(res => {
            dispatch(getCustomerData())
            dispatch(getCleaners())
            dispatch({
                type: UNLIKE_CLEANER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// cancel unlike a cleaner
export const cancelUnlikeCleaner = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/cancelUnlike/${cleanerName}`)
        .then(res => {
            dispatch(getCustomerData())
            dispatch(getCleaners())
            dispatch({
                type: CANCELUNLIKE_CLEANER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// submit a comment
export const submitComment = (cleanerName, commentData) => (dispatch) => {
    axios.post(`/comment/${cleanerName}`, commentData)
        .then(res => {
            // dispatch({
            //     type: SUBMIT_COMMENT,
            //     payload: res.data // when submit a comment, get a comment back
            // })
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

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

// Get histories
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

// Get reservations
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

// reserve
export const reserve = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/reserve/${cleanerName}`)
        .then(res => {
            dispatch(getCustomerData()) // to refresh 
            dispatch(getCleaners())
            dispatch({
                type: RESERVE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// cancel Reserve
export const cancelReserve = (customerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.delete(`/custReserve/${customerName}`)
        .then(res => {
            dispatch(getCustomerData())
            dispatch(getCleaners())
            dispatch({
                type: CANCEL_RESERVE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// Accept Reserve
export const accept = (customerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/history/${customerName}`)
        .then(res => {
            dispatch(getReservations())
            dispatch({
                type: ACCEPT,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// reject
export const reject = (customerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.delete(`/cleanerReserve/${customerName}`)
        .then(res => {
            dispatch(getReservations())
            dispatch({
                type: REJECT,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// Get records
export const getRecords = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/records')
        .then(res => {
            dispatch({
                type: SET_RECORDS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_RECORDS,
                payload: []
            })
        })
}

// record
export const record = (customerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/record/${customerName}`)
        .then(res => {
            dispatch(getRecords())
            dispatch(getCleanerData())
            dispatch({
                type: RECORD,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// delete record
export const deleteRecord = (recordId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.delete(`/record/${recordId}`)
        .then(res => {
            dispatch(getRecords())
            dispatch(getCleanerData())
            dispatch({
                type: DELETE_RECORD,
                payload: res.data
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

export const createChat = (friend) => dispatch => {
    axios.get(`/chat/new/cleaner/${friend}`)
        .then(() => {
            console.log('new chat created!')
            dispatch({
                type: SET_CHAT_MESSAGES,
                payload: []
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: SET_CHAT_MESSAGES,
                payload: []
            })
        })
}

export const getChats = (friend) => (dispatch) => {
    axios.get(`/chat/refresh/cleaner/${friend}`) // no realtime update
        .then(res => {
            if (!res.data) {
                dispatch(createChat(friend));
            } else {
                dispatch({
                    type: SET_CHAT_MESSAGES,
                    payload: res.data.messages
                })
            }
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_CHAT_MESSAGES,
                payload: []
            })
        })
}

export const clearChats = () => (dispatch) => {
    dispatch({ type: CLEAR_CHATS })
}

export const sendMessage = (friend, chatText) => (dispatch) => {
    axios.post(`/chat/cleaner/${friend}`, chatText.txt)
        .then(() => {
            dispatch({
                type: SEND_MESSAGE,
                payload: chatText
            })
        }) // refresh chatView?? 
        .catch(err => console.log(err));
}