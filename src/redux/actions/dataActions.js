import {
    SET_CLEANER,
    SET_CLEANERS,
    LIKE_CLEANER,
    CANCELLIKE_CLEANER,
    UNLIKE_CLEANER,
    CANCELUNLIKE_CLEANER,
    SET_COMMENTS,
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
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_DATA,
    STOP_LOADING_UI,
    LOADING_UI,
    SET_CHAT_MESSAGES,
    CLEAR_CHATS,
    SEND_MESSAGE,
    SET_COMMENT,
    SET_CLEANER_DATA
} from '../types'
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

// like a cleaner
export const likeCleaner = (cleanerName) => (dispatch) => {
    axios.get(`/like/${cleanerName}`)
        .then(res => {
            dispatch({
                type: LIKE_CLEANER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// cancel like a cleaner
export const cancelLikeCleaner = (cleanerName) => (dispatch) => {
    axios.get(`/cancelLike/${cleanerName}`)
        .then(res => {
            dispatch({
                type: CANCELLIKE_CLEANER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// unlike a cleaner
export const unlikeCleaner = (cleanerName) => (dispatch) => {
    axios.get(`/unlike/${cleanerName}`)
        .then(res => {
            dispatch({
                type: UNLIKE_CLEANER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// cancel unlike a cleaner
export const cancelUnlikeCleaner = (cleanerName) => (dispatch) => {
    axios.get(`/cancelUnlike/${cleanerName}`)
        .then(res => {
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

// Get all records for Cleaner
export const getRecords = () => (dispatch) => {
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
    axios.get(`/record/${customerName}`)
        .then(res => {
            dispatch({
                type: RECORD,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// delete record by Cleaner
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

// (Only) customer create chat with a cleaner
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

// Get the chat of the customer with a cleaner
export const getChatsWithCleaner = (friend) => (dispatch) => {
    axios.get(`/chat/refresh/cleaner/${friend}`) // no realtime update
        .then(res => {
            if (!res.data) {
                dispatch(createChat(friend)); // only customer create chat
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

// Get the chat of the cleaner with a customer
export const getChatsWithCustomer = (friend) => (dispatch) => {
    axios.get(`/chat/refresh/customer/${friend}`) // no realtime update
        .then(res => {
            dispatch({
                type: SET_CHAT_MESSAGES,
                payload: res.data.messages
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_CHAT_MESSAGES,
                payload: []
            })
        })
}

// Clear all the chatMessages in redux 
export const clearChats = () => (dispatch) => {
    dispatch({ type: CLEAR_CHATS })
}

// Customer send message to a cleaner at the same time update redux 
export const sendMessageToCleaner = (friend, chatText) => (dispatch) => {
    axios.post(`/chat/cleaner/${friend}`, chatText.txt)
        .then(() => {
            dispatch({
                type: SEND_MESSAGE,
                payload: chatText
            })
        })
        .catch(err => console.log(err));
}

// Cleaner send message to a customer at the same time update redux 
export const sendMessageToCustomer = (friend, chatText) => (dispatch) => {
    axios.post(`/chat/customer/${friend}`, chatText.txt)
        .then(() => {
            dispatch({
                type: SEND_MESSAGE,
                payload: chatText
            })
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

export const getComment = (commentId) => (dispatch) => {
    axios.get(`/comment/${commentId}`)
        .then(res => {
            dispatch({
                type: SET_COMMENT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}