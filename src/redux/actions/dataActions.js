import { SET_CLEANER, SET_CLEANERS, LIKE_CLEANER, CANCELLIKE_CLEANER, LOADING_DATA, UNLIKE_CLEANER, CANCELUNLIKE_CLEANER, SET_COMMENTS } from '../types'
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

// like a cleaner
export const likeCleaner = (cleanerName) => (dispatch) => {
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