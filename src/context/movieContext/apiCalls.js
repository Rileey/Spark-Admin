import axios from "axios";
import { createMovieFailure, createMovieStart, createMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./movieActions"
import { deleteMovieSuccess, deleteMovieFailure, deleteMovieStart } from "./movieActions";


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

export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());

    try {
        const res = await axios.post('/movies', movie, {
            headers: {
                token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(createMovieSuccess(res.data))
    } catch (err) {
        dispatch(createMovieFailure());
    }
}


export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete('/movies/' + id, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(deleteMovieSuccess(id))
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
}