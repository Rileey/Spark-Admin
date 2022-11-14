import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import "./newList.css";

export default function NewList() {

  const [list, setList] = useState(null)
  const history = useHistory();


  const { dispatch } = useContext(ListContext)
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext)

  useEffect(() => {
    getMovies(dispatchMovie)
  }, [dispatchMovie])

  const handleChange = (e) => {
    const value = e.target.value
    setList({...list, [e.target.name]: value})
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option)=> option.value)
    setList({...list, [e.target.name]: value})
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    createList( list, dispatch)
    history.push('/lists')
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add Movie List</h1>
      <form className="addProductForm">
        <div className="formLeft">
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Popular Movies" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <select name='genre' onChange={handleChange}>
          <option value='Adventure'>Adventure</option>
            <option value='Comedy'>Comedy</option>
            <option value='Crime'>Crime</option>
            <option value='Fantasy'>Fantasy</option>
            <option value='Historical'>Historical</option>
            <option value='Horror'>Horror</option>
            <option value='Romance'>Romance</option>
            <option value='Sci-fi'>Sci-fi</option>
            <option value='Thriller'>Thriller</option>
            <option value='Cartoons'>Cartoons</option>
            <option value='Drama'>Drama</option>
            <option value='Documentary'>Documentary</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <select name='type' onChange={handleChange}>
          <option >Type</option>
            <option value='Movies'>Movies</option>
            <option value='Series'>Series</option>
          </select>
        </div>
        </div>
        <div className="formRight">
        <div className="addProductItem">
          <label>Movies</label>
          <select multiple name='content' onChange={handleSelect} style={{height: '280px'}}>
            {movies.map((movie)=> (
              <option key={movie._id} value={movie._id}>{movie.title}</option>
            ))}
          </select>
        </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
