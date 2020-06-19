import { SET_CLEANER, SET_CLEANERS, LIKE_CLEANER, CANCELLIKE_CLEANER, LOADING_DATA } from '../types'
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
export const likeCleaner = (cleanerId) => (dispatch) => {
    axios.get(`/like/${cleanerId}`)
        .then(res => {
            dispatch(getCustomerData()) // for checking authenticated for likebutton
            dispatch(getCleaners()) // refresh to cleaner's likecount for home.js
            dispatch({
                type: LIKE_CLEANER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// unlike a cleaner
export const cancelLikeCleaner = (cleanerId) => (dispatch) => {
    axios.get(`/cancelLike/${cleanerId}`)
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