import axios from "axios";
import { createContentsFailure, createContentsStart, createContentsSuccess, deleteContentsFailure, deleteContentsStart, deleteContentsSuccess, getContentsFailure, getContentsStart, getContentsSuccess } from "./contentActions";


export const getContent = async (dispatch) => {
    dispatch(getContentsStart());

    try {
        const res = await axios.get('/content', {
            headers: {
                token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(getContentsSuccess(res.data))
    } catch (err) {
        dispatch(getContentsFailure());
    }
}

export const createContent = async (dispatch) => {
    dispatch(createContentsStart());

    try {
        const res = await axios.get('/content', {
            headers: {
                token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(createContentsSuccess(res.data))
    } catch (err) {
        dispatch(createContentsFailure());
    }
}


export const deleteContent = async (id, dispatch) => {
    dispatch(deleteContentsStart());
    try {
        await axios.delete('/content/' + id, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(deleteContentsSuccess(id))
    } catch (err) {
        dispatch(deleteContentsFailure());
    }
}