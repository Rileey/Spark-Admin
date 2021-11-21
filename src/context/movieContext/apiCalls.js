import axios from "axios";
import { getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./movieActions"
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

export const deleteMovies = async (id, dispatch) => {
    dispatch(deleteMoviesStart());
    try {
        await axios.delete('/movies/' + id, {
            headers: {
                token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(deleteMoviesSuccess(id))
    } catch (err) {
        dispatch(deleteMoviesFailure());
    }
}