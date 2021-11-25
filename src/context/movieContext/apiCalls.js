import axios from "axios";
import { createMoviesFailure, createMoviesStart, createMoviesSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./movieActions"
import { deleteMoviesSuccess, deleteMoviesFailure, deleteMoviesStart } from "./movieActions";


export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());

    try {
        const res = await axios.get('/movies', {
            headers: {
                token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(getMoviesSuccess(res.data))
    } catch (err) {
        dispatch(getMoviesFailure());
    }
}

export const createMovies = async (dispatch) => {
    dispatch(createMoviesStart());

    try {
        const res = await axios.get('/movies', {
            headers: {
                token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(createMoviesSuccess(res.data))
    } catch (err) {
        dispatch(createMoviesFailure());
    }
}


export const deleteMovies = async (id, dispatch) => {
    dispatch(deleteMoviesStart());
    try {
        await axios.delete('/movies/' + id, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(deleteMoviesSuccess(id))
    } catch (err) {
        dispatch(deleteMoviesFailure());
    }
}