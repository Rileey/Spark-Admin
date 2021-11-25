import axios from "axios";
import { deleteMoviesSuccess, deleteMoviesFailure, deleteMoviesStart } from "./movieActions";
import { deleteUsersFailure, deleteUsersStart, deleteUsersSuccess, getUsersFailure, getUsersStart, getUsersSuccess } from "./userActions";


export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());

    try {
        const res = await axios.get('/users', {
            headers: {
                token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        dispatch(getUsersFailure());
    }
}

export const deleteUsers = async (id, dispatch) => {
    dispatch(deleteUsersStart());
    try {
        await axios.delete('/users/' + id, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(deleteUsersSuccess(id))
    } catch (err) {
        dispatch(deleteUsersFailure());
    }
}