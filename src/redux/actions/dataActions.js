import {
    SET_CLEANER, SET_CLEANERS, LIKE_CLEANER, CANCELLIKE_CLEANER, LOADING_DATA, UNLIKE_CLEANER, CANCELUNLIKE_CLEANER,
    SET_COMMENTS, CLEAR_ERRORS, STOP_LOADING_UI, LOADING_UI
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

// get a cleaner detail
export const getCleaner = (cleanerName) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/cleaner/${cleanerName}`)
        .then(res => {
            dispatch({
                type: SET_CLEANER,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err))
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